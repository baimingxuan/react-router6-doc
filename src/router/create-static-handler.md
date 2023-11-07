# `createStaticHandler`

`createStaticHandler` 用于在服务器（即 [Node](https://nodejs.org/) 或其他 Javascript 运行时）上执行数据获取和提交，然后通过`<StaticRouterProvider>`在服务器端渲染应用程序。有关更全面的概述，请参阅[服务器端渲染](../guides/ssr)指南。

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
declare function createStaticHandler(
  routes: RouteObject[],
  opts?: {
    basename?: string;
  }
): StaticHandler;

interface StaticHandler {
  dataRoutes: AgnosticDataRouteObject[];
  query(
    request: Request,
    opts?: {
      requestContext?: unknown;
    }
  ): Promise<StaticHandlerContext | Response>;
  queryRoute(
    request: Request,
    opts?: {
      routeId?: string;
      requestContext?: unknown;
    }
  ): Promise<any>;
}
```

## `routes`/`basename`

这些信息与 `routes` / `basename` 传递给[`createBrowserRouter`](../routers/create-browser-router) 的一样。

## `handler.query(request, opts)`

`handler.query()` 方法接收 Fetch 请求，执行路由匹配，并根据请求执行所有相关的路由 `action/loader `方法。返回的 `context` 值包含为请求渲染 HTML 文档所需的全部信息（路由级 `actionData` , `loaderData` , `errors` 等）。如果任何匹配的路由返回或抛出重定向响应，那么 `query()` 将以 Fetch `Response` 的形式返回该重定向。

### `opts.requestContext`

如果需要将服务器上的信息传递到 Remix 的 `actions/loaders` 中，可以使用 `opts.requestContext` 进行传递，这些信息将显示在`actions/loaders`的上下文参数中。

```jsx
const routes = [{
  path: '/',
  loader({ request, context }) {
    // Access `context.dataFormExpressMiddleware` here
  },
}];

export async function render(req: express.Request) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(request);
  let staticHandlerContext = await query(remixRequest, {
    // Pass data from the express layer to the remix layer here
    requestContext: {
      dataFromExpressMiddleware: req.something
    }
 });
 ...
}
```

## `handler.queryRoute(request, opts)`

`handler.queryRoute` 是一个更有针对性的版本，它查询单一路由，并根据请求运行其`loader`或 `action`操作。默认情况下，它会根据请求 URL 匹配目标路由。返回值是从`loader`或 `action`返回的值，通常是一个 `Response` 对象。

### `opts.routeId`

如果需要调用与 URL 并不完全对应的特定路由`action/loader`（例如父路由加载器），可以指定 `routeId` ：

```jsx
staticHandler.queryRoute(new Request("/parent/child"), {
  routeId: "parent",
});
```

### `opts.requestContext`

如果需要将服务器上的信息传递到 Remix 的`actions/loaders`中，可使用 `opts.requestContext` 进行操作，信息将以上下文参数的形式显示在`actions/loaders`中。请参阅上文 `query()` 部分的示例。

**另请参见:**

- [`createStaticRouter`](../routers/create-static-router)
- [`<StaticRouterProvider>`](../routers/static-router-provider)