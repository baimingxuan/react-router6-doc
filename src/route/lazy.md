# `lazy`

为了保持应用程序捆绑包的小巧并支持路由的代码拆分，每个路由都可以提供一个异步函数，用于解析路由定义中与路由不匹配的部分（ `loader` , `action` , `Component` / `element` , `ErrorBoundary` / `errorElement` 等）。

`lazy`路由会在初始加载以及导航或 fetcher 调用的 `loading` 或 `submitting` 阶段进行解析。您不能懒惰地定义路由匹配属性（ `path` , `index` , `children` , `caseSensitive` ），因为我们只会在匹配已知路由后才执行您的`lazy`路由函数。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](../router/picking-a-router)。

每个 `lazy` 函数通常会返回一个动态导入的结果。

```jsx
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
```

然后在`lazy`路由模块中，导出你想为路由定义的属性（ `loader` , `Component` , `ErrorBoundary` ）：

```jsx
export async function loader({ request }) {
  let data = await fetchData(request);
  return json(data);
}

export function Component() {
  let data = useLoaderData();

  return (
    <>
      <h1>You made it!</h1>
      <p>{data}</p>
    </>
  );
}

// If you want to customize the component display name in React dev tools:
Component.displayName = "SampleLazyRoute";

export function ErrorBoundary() {
  let error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{error.message || error}</h1>
  );
}

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = "SampleErrorBoundary";
```

> NOTE
>
> 请注意，在这个懒加载的文件中没有输出 `default` 。这是因为 `default` 不是路由对象上的有效键。这些文件通常只能导出路由对象上定义的键，如 `loader`、`action`、`Component`、`ErrorBoundary` 等。除非你手动从 `lazy` 返回一个对象，否则所有导出都将直接扩散到路由对象上。

## 静态定义属性

`lazy` 函数不能覆盖路由上静态定义的任何属性，如果试图覆盖这些属性，会收到控制台警告。

此外，作为一项优化，如果您静态定义了 `loader` / `action` ，那么它将与 `lazy` 函数并行调用。如果您有一些细长的`loader`，而您又不在意关键捆绑包，并希望在下载组件的同时启动它们的数据获取，那么这将非常有用。这与 Remix 处理获取数据的方式很接近，因为每个路由都是自己的 API 路由。

```jsx
let route = {
  path: "projects",
  loader: ({ request }) => fetchDataForUrl(request.url),
  lazy: () => import("./projects"),
};
```

这样还可以进行更细粒度的代码分割。例如，您可以将 `loader` 和 `Component` 分成不同的文件，以便并行下载：

```jsx
let route = {
  path: "projects",
  async loader({ request, params }) {
    let { loader } = await import("./projects-loader");
    return loader({ request, params });
  },
  lazy: () => import("./projects-component"),
};
```

## 单个文件中的多个路由

虽然 `lazy` 通常可以与每个路由的异步 `import()` 1:1 使用，但您可以自由地实现更高级的 `lazy` 函数，只需返回您希望添加到该路由的属性即可。这将带来一些有趣的可能性。

例如，如果想避免为嵌套路由加载多个大块，可以将它们存储在同一个文件中，然后返回给各个路由。现代捆绑程序会为不同的 `import()` 调用锁定相同的 Promise。

```jsx
// Assume pages/Dashboard.jsx has all of our loaders/components for multiple
// dashboard routes
let dashboardRoute = {
  path: "dashboard",
  async lazy() {
    let { Layout } = await import("./pages/Dashboard");
    return { Component: Layout };
  },
  children: [
    {
      index: true,
      async lazy() {
        let { Index } = await import("./pages/Dashboard");
        return { Component: Index };
      },
    },
    {
      path: "messages",
      async lazy() {
        let { messagesLoader, Messages } = await import(
          "./pages/Dashboard"
        );
        return {
          loader: messagesLoader,
          Component: Messages,
        };
      },
    },
  ],
};
```