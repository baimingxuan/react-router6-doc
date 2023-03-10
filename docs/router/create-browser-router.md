# `createBrowserRouter`

这是所有 React Router Web项目的推荐路由。它使用[DOM 历史记录 API](https://developer.mozilla.org/en-US/docs/Web/API/History)来更新 URL 并管理历史记录堆栈。

它还可以启用v6.4数据API，如 [loaders](https://reactrouter.com/en/main/route/loader)、[actions](https://reactrouter.com/en/main/route/action)、[fetchers](https://reactrouter.com/en/main/hooks/use-fetcher) 等。

```jsx
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

```jsx
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter;
```

## `routes`

一个包含[`Route`](https://reactrouter.com/en/main/components/route)对象的数组，其中包含 `children` 属性上的嵌套路由。

```jsx
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

应用程序的基本名称，用于无法部署到域的根目录而是子目录的情况。

```jsx
createBrowserRouter(routes, {
  basename: "/app",
});
```

当链接到根路径时，将遵守尾部的斜杠：

```jsx
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

对于像浏览器开发工具插件或测试这样的环境，使用不同于全局 `window` 的窗口很有用。