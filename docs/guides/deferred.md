#  延迟数据指南

## 问题

想象一种情况，其中一个路由的加载器需要检索某些数据，由于某种原因，这些数据非常缓慢。例如，假设您正在向用户显示正在送到他们家的包裹的位置：

```jsx
import { json, useLoaderData } from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocation = await getPackageLocation(
    params.packageId
  );

  return json({ packageLocation });
}

function PackageRoute() {
  const data = useLoaderData();
  const { packageLocation } = data;

  return (
    <main>
      <h1>Let's locate your package</h1>
      <p>
        Your package is at {packageLocation.latitude} lat
        and {packageLocation.longitude} long.
      </p>
    </main>
  );
}
```

我们假设 `getPackageLocation` 很慢。这将导致初始页面加载时间和转换到该路由所需的时间与最慢的数据位一样长。有一些事情可以做来优化这一点并改善用户体验：

- 加快缓慢的事情（😅）。
- 使用 `Promise.all` 并行加载数据（在我们的示例中没有要并行化的内容，但在其他情况下可能会有所帮助）。
- 添加全局转换旋转器（有助于改善用户体验）。
- 添加本地化骨架 UI（有助于改善用户体验）。

如果这些方法不起作用，那么您可能会感到被迫将慢速数据从 `loader` 移出，转而使用组件获取（并在加载时显示骨架回退 UI）。在这种情况下，您将在挂载时呈现回退 UI 并启动数据获取。从 DX 的角度来看，由于[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)，这实际上并不那么可怕。从 UX 的角度来看，这将改善客户端转换以及初始页面加载的加载体验。因此，它似乎解决了问题。

但在大多数情况下仍然不太理想（特别是如果您正在对路由组件进行代码拆分），原因有两个：

1. 客户端获取将您的数据请求放在瀑布流上：文档 -> JavaScript -> 懒加载路由 -> 数据获取。
2. 您的代码不能轻松地在组件获取和路由获取之间切换（稍后会详细介绍）。

## 解决方案

eact Router 利用 React 18 的 Suspense 通过[`defer`响应实用工具和[`<Await>`](https://reactrouter.com/en/main/components/await)组件/[`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value)钩子进行数据获取。通过使用这些 API，您可以解决以下两个问题：

1. 您的数据不再在瀑布流上：文档 -> JavaScript -> 惰性加载路由和数据（并行）
2. 您可以轻松地在回退渲染和等待数据之间切换

让我们深入了解如何实现这一点。

### 使用`defer`

首先，在需要慢速数据请求的地方添加 `<Await />` ，以便在渲染回退 UI 时使用。让我们对上面的示例进行操作：

```jsx
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );

  return defer({
    packageLocation: packageLocationPromise,
  });
}

export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(packageLocation) => (
            <p>
              Your package is at {packageLocation.latitude}{" "}
              lat and {packageLocation.longitude} long.
            </p>
          )}
        </Await>
      </React.Suspense>
    </main>
  );
}
```

或者，您可以使用 `useAsyncValue` 钩子：

如果你不喜欢使用 render 属性，你可以使用一个 Hook，但你需要将代码分离到另一个组件中：

```jsx
export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          <PackageLocation />
        </Await>
      </React.Suspense>
    </main>
  );
}

function PackageLocation() {
  const packageLocation = useAsyncValue();
  return (
    <p>
      Your package is at {packageLocation.latitude} lat and{" "}
      {packageLocation.longitude} long.
    </p>
  );
}
```

## 评估解决方案

因此，我们不必等待组件，就可以触发获取请求，而是在用户开始转换到新路由时立即开始获取慢速数据的请求。这可以显著加快较慢网络下的用户体验。

此外，React Router公开的API非常人性化。您可以根据是否包含 `await` 关键字来切换某些内容是否将被延迟。

```jsx
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});
```

因此，您可以进行A/B测试推迟，甚至可以根据请求的用户或数据来确定是否推迟：

```jsx
async function loader({ request, params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );
  const shouldDefer = shouldDeferPackageLocation(
    request,
    params.packageId
  );

  return defer({
    packageLocation: shouldDefer
      ? packageLocationPromise
      : await packageLocationPromise,
  });
}
```

那 `shouldDeferPackageLocation` 可以被实现来检查发出请求的用户，无论包位置数据是否在缓存中，A/B测试的状态或其他任何你想要的内容。这非常棒 🍭

## 常问问题

### 为什么不默认推迟一切？

React Router的defer API是React Router提供的另一个杠杆，可以为您提供一种很好的选择权衡的方式。您想让页面更快地呈现吗？推迟一些东西。您想要更低的CLS（内容布局移位）吗？不要推迟东西。您想要更快的呈现，但也想要更低的CLS吗？只推迟缓慢和不重要的东西。

这都是权衡取舍的问题，而 API 设计的好处在于它非常适合您进行简单的实验，以查看哪些权衡会为您的现实世界关键指标带来更好的结果。

### 当`<Suspense/>`回退渲染？

`<Await />` 组件仅在 `<Await />` 组件的初始渲染中抛出未解决的 Promise 到 `<Suspense>` 边界。如果 props 发生更改，它不会重新渲染回退。实际上，这意味着当用户提交表单并重新验证加载程序数据时，您将不会获得回退呈现。当用户使用不同的参数导航到相同的路由时，将呈现回退（在上面的示例中，如果用户从左侧的包列表中选择以在右侧找到其位置）。

这可能一开始会感觉违反直觉，但请跟随我们，我们真的经过深思熟虑，这样做很重要。让我们想象一下没有延迟 API 的世界。对于这些情况，您可能需要为表单提交/重新验证实现乐观 UI。

当您决定尝试 `defer` 的权衡时，我们不希望您必须更改或删除这些优化，因为我们希望您能够轻松地在推迟一些数据和不推迟数据之间切换。因此，我们确保您现有的乐观状态以相同的方式工作。如果我们不这样做，那么您可能会遇到我们所谓的“爆米花 UI”，其中数据提交会触发回退加载状态，而不是您努力工作的乐观 UI。

所以请记住：**Deferred 只与路由的初始加载及其参数有关。**

### 为什么加载器返回的响应对象不再起作用了？

当你使用 `defer` 时，你告诉 React Router 立即加载页面，而不是延迟数据。页面在 `Response` 对象返回之前已经加载，因此响应不会像使用 `return fetch(url)` 一样自动处理。

因此，您需要处理自己的 `Response` 处理，并使用数据解决延迟的 Promise，而不是 `Response` 实例。

```jsx
async function loader({ request, params }) {
  return defer({
    // Broken! Resolves with a Response
    // broken: fetch(url),

    // Fixed! Resolves with the response data
    data: fetch(url).then((res) => res.json()),
  });
}
```

或者考虑这样一种情况，我们的延迟数据可能会返回一个重定向 。您可以检测重定向并将状态代码和位置作为数据发送回来，然后您可以通过 和 在组件中执行客户端重定向。

```jsx
async function loader({ request, params }) {
  let data = fetch(url).then((res) => {
    if (res.status == 301) {
      return {
        isRedirect: true,
        status: res.status,
        location: res.headers.get("Location"),
      };
    }
    return res.json();
  });

  return defer({ data });
}
```