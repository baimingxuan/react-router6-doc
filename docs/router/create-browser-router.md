# `createBrowserRouter`

这是所有 React Router Web 项目的推荐路由。它使用[DOM History API](https://developer.mozilla.org/en-US/docs/Web/API/History)来更新 URL 和管理历史堆栈。

它还启用 v6.4 数据 API，如 [loaders](https://reactrouter.com/en/main/route/loader)、[actions](https://reactrouter.com/en/main/route/action)、[fetchers](https://reactrouter.com/en/main/hooks/use-fetcher)等。

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

## 类型声明

```javascript
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter;
```

## `routes`

一个[`Route`](https://reactrouter.com/en/main/components/route)对象数组上具有嵌套路由的`children`属性。

```javascript
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "events/:id",
        element: <Event />,
        loader: eventLoader,
      },
    ],
  },
]);
```

## `basename`

应用程序的基名，用于无法部署到域的根目录，而是部署到子目录的情况。

```javascript
createBrowserRouter(routes, {
  basename: "/app",
});
```

当链接到根路径时，尾部的斜杠将被遵守：

```javascript
createBrowserRouter(routes, {
  basename: "/app",
});
<Link to="/" />; // results in <a href="/app" />

createBrowserRouter(routes, {
  basename: "/app/",
});
<Link to="/" />; // results in <a href="/app/" />
```

## `window`

对于浏览器`devtool`插件或测试使用不同的窗口等环境比全局的`window`更有效。