## `lazy`

为了使你的应用程序包小并支持你的路由的代码分割，每个路由都可以提供一个异步函数，该函数解析你的路由定义中不匹配路由的部分 ( `loader` 、 `action` 、 `Component` / `element` 、 `ErrorBoundary` / `errorElement` 等)。

懒加载路由在初始加载时以及导航或获取器调用的 `loading` 或 `submitting` 阶段中解析。您无法懒惰地定义路由匹配属性 ( `path` , `index` , `children` , `caseSensitive` )，因为我们只有在匹配已知路由后才执行您的懒加载路由函数。

仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。

每个 `lazy` 函数通常会返回一个动态导入的结果。

```jsx
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
```

然后在你的懒加载路由模块中，导出你想要为路由定义的属性：

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

## 静态定义属性

路由上静态定义的任何属性都不能被 `lazy` 函数覆盖，如果您尝试覆盖它们，将会收到控制台警告。

此外，作为一种优化，如果您静态定义了 `loader` / `action` ，那么它将与 `lazy` 函数并行调用。如果您有一些不介意在关键捆绑包上的轻量级加载程序，并且希望在组件下载的同时启动它们的数据获取，则这非常有用。这与 Remix 处理获取的方式非常接近，因为每个路由都是它自己的 API 路由。

```jsx
let route = {
  path: "projects",
  loader: ({ request }) => fetchDataForUrl(request.url),
  lazy: () => import("./projects"),
};
```

这也允许您进行更细粒度的代码拆分。例如，您可以将 `loader` 和 `Component` 拆分为不同的文件以进行并行下载：

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

虽然 `lazy` 通常可以与每个路由的异步 `import()` 一对一使用，但您可以自由地实现更高级的 `lazy` 函数，并只需要返回要添加到该路由的属性。这开启了一些有趣的可能性。

例如，如果您想避免为嵌套路由加载多个块，您可以将它们全部存储在同一个文件中，并将它们返回给各个路由。现代捆绑器将为不同的 `import()` 调用依附于相同的 Promise。

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