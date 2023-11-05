# `createStaticRouter`

`createStaticRouter` 用于在服务器（即 [Node](https://nodejs.org/) 或其他 Javascript 运行时）上利用[数据路由](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router)进行渲染。有关更全面的概述，请参阅[服务器端渲染](https://baimingxuan.github.io/react-router6-doc/guides/ssr)指南。

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
  context: StaticHandlerContext
): Router;
```

**另请参见:**

- [`createStaticHandler`](https://baimingxuan.github.io/react-router6-doc/routers/create-static-handler)
- [`<StaticRouterProvider>`](https://baimingxuan.github.io/react-router6-doc/routers/static-router-provider)