# `<StaticRouterProvider>`

`<StaticRouterProvider>` 接受来自 [`createStaticRouter()`](../router/create-static-router) 的 `router` 和来自 [`createStaticHandler()`](../router/create-static-handler) 的 `context` ，并在服务器（即 [Node](https://nodejs.org/) 或其他 Javascript 运行时）上渲染您的应用程序。有关更全面的概述，请参阅[服务器端渲染](../guides/ssr)指南。

```jsx
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import Root, {
  loader as rootLoader,
  ErrorBoundary as RootBoundary,
} from "./root";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    Component: Root,
    ErrorBoundary: RootBoundary,
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );
}
```

## 类型声明

```ts
declare function StaticRouterProvider(props: {
  context: StaticHandlerContext;
  router: Router;
  hydrate?: boolean;
  nonce?: string;
}: JSX.Element;
```

## `context`

这是 `createStaticHandler().query()` 调用返回的 `context` ，其中包含请求的所有获取数据。

## `router`

这是通过 `createStaticRouter`创建的`router`。

## `hydrate`

默认情况下， `<StaticRouterProvider>` 会将所需的水合数据串联到 `window.__staticRouterHydrationData` 的 `<script>` 标签中，该标签将被 `createBrowserRouter()` 读取并自动水合。

如果希望手动进行更高级的水合，可以通过 `hydrate={false}` 来禁用自动水合。在客户端，您可以将自己的 `hydrationData` 发送至 `createBrowserRouter` 。

## `nonce`

在利用自动水合时，您可以提供一个 `nonce` 值，将其呈现在 `<script>` 标签上，并与[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_inline_script)一起使用。

**另请参见:**

- [`createStaticHandler`](../router/create-static-handler)
- [`createStaticRouter`](../router/create-static-router)
- [`createBrowserRouter`](../router/create-browser-router)