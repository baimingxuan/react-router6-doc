#  延迟数据指南

## 问题

想象一下这样一种场景：您的某个路径`loader`需要检索一些数据，而由于某种原因，检索速度相当慢。例如，您要向用户显示一个包裹的位置，该包裹正被送往用户家中：

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

我们假设 `getPackageLocation` 速度较慢。这将导致初始页面加载时间和路径转换时间与最慢的数据一样长。有几种方法可以优化这种情况并改善用户体验：

- 让缓慢的事情加速（😅）。
- 使用 `Promise.all` 实现数据加载的并行化（在我们的示例中没有什么需要并行化的，但在其他情况下可能会有点帮助）。
- 添加全局过渡旋转器（对用户体验有一定帮助）。
- 添加本地化的骨架用户界面（对用户体验有一定帮助）。

如果这些方法效果不佳，那么您可能不得不将慢速数据从 `loader` 移到组件获取中（并在加载时显示骨架回退 UI）。在这种情况下，您需要在挂载时渲染后备 UI，然后启动数据获取。从 DX 的角度来看，这其实并不可怕，这要归功于[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)。从用户体验的角度来看，这改善了客户端转换和初始页面加载的加载体验。因此，这似乎确实解决了问题。

但由于以下两个原因，在大多数情况下（尤其是在对路由组件进行代码拆分的情况下），它仍然不是最佳选择：

1. 客户端获取将数据请求置于瀑布式流程中：文档 -> JavaScript -> 懒加载路由 -> 数据获取
2. 您的代码无法在组件获取和路由获取之间轻松切换（稍后将详细介绍）。

## 解决方案

React Router 使用 [`defer`响应](https://reactrouter.com/en/main/utils/defer) 实用程序和 [`<Await />`](https://reactrouter.com/en/main/components/await) 组件/[ `useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value) 钩子，并利用 React 18 的 Suspense 来获取数据。通过使用这些 API，您可以解决这两个问题：

1. 您的数据不再是瀑布式的：文档 -> JavaScript -> 懒加载路径和数据（并行）。
2. 您的代码可以在渲染回退和等待数据之间轻松切换

让我们深入了解一下如何做到这一点。

### 使用`defer`

首先，为您的慢速数据请求添加 `<Await />` ，在这种情况下，您更希望呈现一个回调 UI。让我们在上面的示例中这样做：

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

或者，也可以使用 `useAsyncValue` 钩子：

如果你不喜欢使用 render 属性，你可以使用一个 Hook，但你必须把代码拆分成另一个组件：

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

因此，我们不会在触发获取请求前等待组件，而是在用户开始转换到新路由时，立即启动对慢速数据的请求。这可以大大加快较慢网络的用户体验。

此外，React Router 为此提供的 API 非常人性化。您可以根据是否包含 `await` 关键字，在是否延迟之间进行切换：

```jsx
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});
```

因此，您可以进行 A/B 延迟测试，甚至可以根据用户或请求的数据来决定是否延迟：

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

`shouldDeferPackageLocation` 可以用来检查提出请求的用户、软件包位置数据是否在缓存中、A/B 测试的状态或其他任何你想要的信息。这真是太贴心了 🍭

## 常问问题

### 为什么不默认推迟一切？

eact Router defer API 是 React Router 提供的另一个工具，它为您提供了一种在权衡之间做出选择的好方法。你想让页面渲染得更快吗？那就延迟吧。你想要更低的 CLS（内容布局偏移）？不要延迟。你想要更快的渲染速度，但也想要更低的 CLS？那就只延迟那些慢且不重要的内容。

这都是权衡的结果，而 API 设计的精妙之处在于，它非常适合你进行简单的实验，看看哪种权衡方式能为你的真实世界关键指标带来更好的结果。

### `<Suspense/>`回退何时渲染？

`<Await />` 组件只会在初始呈现 `<Await />` 组件时，在 `<Suspense>` 边界上抛出`promise`，且`promise`未确定。如果属性发生变化，它不会重新渲染回调。实际上，这意味着当用户提交表单并重新验证`loader`数据时，不会呈现回调。当用户使用不同的参数导航到相同的路径时（在上述示例中，如果用户从左侧的套餐列表中选择在右侧找到自己的位置），就会呈现回调。

一开始，我们可能会觉得这与直觉相悖，但请别急，我们已经仔细考虑过这个问题，而且这种工作方式非常重要。让我们想象一下没有延迟 API 的世界。在这种情况下，您可能需要为表单提交/重新验证实现优化用户界面。

当您决定尝试 `defer` 的权衡时，我们不希望您必须更改或移除这些优化，因为我们希望您能在推迟和不推迟某些数据之间轻松切换。因此，我们确保您现有的乐观状态以同样的方式运行。如果我们不这样做，您可能会体验到我们所说的 "Popcorn UI"，即提交数据会触发回调加载状态，而不是您辛苦开发的优化的用户界面。

因此，请记住这一点：**延迟 100% 只涉及路由及其参数的初始加载**。

### 为什么加载器返回的响应对象不再起作用了？

当您使用 `defer` 时，您是在告诉 React Router 立即加载页面，而不使用延迟数据。在返回 `Response` 对象之前，页面已经加载完毕，因此响应的自动处理方式与使用 `return fetch(url)` 时不同。

因此，您需要处理自己的 `Response` 进程，并使用数据而不是 `Response` 实例来解决您的延迟 Promise 问题。

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

或者考虑一下我们的延迟数据会返回重定向 `Response` 的情况。您可以检测重定向并将状态代码和位置作为数据发送回来，然后您可以通过 `useEffect` 和 `useNavigate` 在组件中执行客户端重定向。

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