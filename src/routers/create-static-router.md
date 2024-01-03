# `createStaticRouter`

`createStaticRouter` 用于在服务器（即 [Node](https://nodejs.org/) 或其他 Javascript 运行时）上利用[数据路由](../routers/picking-a-router)进行渲染。有关更全面的概述，请参阅[服务器端渲染](../guides/ssr)指南。

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
declare function createStaticRouter(
  routes: RouteObject[],
  context: StaticHandlerContext,
  opts: {
    future?: {
      v7_partialHydration?: boolean;
    };
  }
): Router;
```

## `opts.future`

为该静态路由器启用的一组可选[未来标志](../guides/api-development-strategy)。我们建议您尽早选择使用新发布的未来标志，以方便最终迁移到 v7。

```jsx
const router = createBrowserRouter(routes, {
  future: {
    // Opt-into partial hydration
    v7_partialHydration: true,
  },
});
```

目前可用的未来标志如下:

| Flag                                                         | 说明                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| [`v7_partialHydration`](../routers/create-browser-router#partial-hydration-data) | 支持服务器渲染应用程序的部分水合功能 |

**另请参见:**

- [`createStaticHandler`](../routers/create-static-handler)
- [`<StaticRouterProvider>`](../routers/static-router-provider)