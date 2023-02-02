#  延迟数据指南

## 问题

想象一个场景，其中一个路由的加载器需要检索一些数据，但由于某种原因而速度很慢。例如，假设您要向用户显示正在运送到他们家中的包裹的位置：

```javascript
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

我们假设这`getPackageLocation`很慢。这将导致初始页面加载时间和转换到该路由的时间与最慢的数据位一样长。您可以做一些事情来优化它并改善用户体验：

- 加快缓慢的事情（？）。
- 并行化数据加载`Promise.all`（在我们的示例中没有任何并行化，但在其他情况下它可能会有所帮助）。
- 添加一个全局过渡微调器（对用户体验有所帮助）。
- 添加一个本地化的框架 UI（对 UX 有一点帮助）。

如果这些方法效果不佳，那么您可能会被迫将缓慢的数据移出`loader`组件获取（并在加载时显示框架回退 UI）。在这种情况下，您将在挂载时呈现回退 UI 并触发数据提取。多亏了[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher). 从用户体验的角度来看，这改善了客户端转换和初始页面加载的加载体验。所以它似乎确实解决了问题。

但在大多数情况下（尤其是在代码拆分路由组件时），它仍然不是最佳选择，原因有二：

1. 客户端获取将您的数据请求放在瀑布上：文档 -> JavaScript -> 延迟加载路由 -> 数据获取
2. 您的代码无法在组件获取和路由获取之间轻松切换（稍后会详细介绍）。

## 解决方案

React Router 利用 React 18 的 Suspense 来使用[`defer`Response](https://reactrouter.com/en/main/utils/defer)实用程序和[``](https://reactrouter.com/en/main/components/await)组件/[`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value)挂钩获取数据。通过使用这些 API，您可以解决这两个问题：

1. 您的数据不再位于瀑布上：文档 -> JavaScript -> 延迟加载路由和数据（并行）
2. 您可以轻松地在呈现回退和等待数据之间切换

让我们深入了解如何实现这一点。

### 使用`defer`

首先`<Await />`为您的慢速数据请求添加您宁愿呈现后备 UI 的地方。让我们为上面的例子这样做：

```javascript
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

或者，您可以使用 useAsyncValue 钩子函数：

如果你不喜欢带回渲染道具，你可以使用一个钩子，但你必须把东西分解成另一个组件：

```javascript
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

因此，我们不会在触发获取请求之前等待组件，而是在用户开始转换到新路由时立即开始对慢速数据的请求。这可以显着加快较慢网络的用户体验。

此外，React Router 为此公开的 API 非常符合人体工程学。`await`您可以根据是否包含关键字来在是否要推迟某件事之间进行字面上的切换：

```javascript
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});
```

因此，您可以对延迟进行 A/B 测试，甚至可以根据请求的用户或数据来确定是否延迟：

```javascript
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

这`shouldDeferPackageLocation`可以用来检查发出请求的用户、包位置数据是否在缓存中、A/B 测试的状态，或者您想要的任何其他内容。这个好甜🍭

## 常问问题

### 为什么不默认推迟一切？

React Router defer API 是 React Router 提供的另一个杠杆，它为您提供了一种在权衡之间进行选择的好方法。您想让页面呈现得更快吗？推迟的东西。您想要更低的 CLS（内容布局偏移）吗？不要拖延事情。您想要更快的渲染速度，但还想要更低的 CLS？推迟那些缓慢和不重要的事情。

这都是权衡，API 设计的巧妙之处在于它非常适合您进行简单的实验，以了解哪些权衡可以为您的现实世界关键指标带来更好的结果。

### 什么时候`<Suspense/>`回退渲染？

该`<Await />`组件只会在组件`<Suspense>`的初始渲染时将承诺抛出边界，`<Await />`并带有未解决的承诺。如果道具改变，它不会重新渲染后备。实际上，这意味着当用户提交表单并且加载程序数据重新验证时，您*将不会呈现回退。*当用户导航到具有不同参数的相同路线时，您*将*得到一个回退渲染（在我们上面的示例的上下文中，如果用户从左侧的包列表中选择以在右侧找到它们的位置）。

起初这可能感觉违反直觉，但请继续关注我们，我们确实考虑周全，并且以这种方式工作很重要。让我们想象一个没有延迟 API 的世界。对于那些场景，您可能想要为表单提交/重新验证实现乐观的 UI。

当您决定要尝试权衡取舍时`defer`，我们不希望您必须更改或删除这些优化，因为我们希望您能够轻松地在延迟某些数据和不延迟数据之间切换。因此，我们确保您现有的乐观状态以同样的方式运作。如果我们不这样做，那么您可能会体验到我们所说的“爆米花 UI”，其中数据提交会触发回退加载状态，而不是您努力打造的乐观 UI。

所以请记住这一点：**Deferred 仅 100% 是关于路由及其参数的初始负载。**