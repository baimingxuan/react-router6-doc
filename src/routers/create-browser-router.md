# `createBrowserRouter`

这是所有 React Router Web 项目推荐使用的路由。它使用 [DOM 历史记录 API](https://developer.mozilla.org/en-US/docs/Web/API/History) 来更新 URL 和管理历史堆栈。

它还支持 v6.4 数据 API，如 [loaders](../route/loader)、[actions](../route/action)、[fetchers](../hooks/use-fetcher) 等。

> 由于在数据 API 的设计中解耦了获取和呈现，因此您应该在 React 树之外创建路由，并使用静态定义的路由集。有关此设计的更多信息，请参阅 [Remixing React Router](https://remix.run/blog/remixing-react-router) 博文和 [When to Fetch](https://www.youtube.com/watch?v=95B8mnhzoCM) 会议演讲。

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

```ts
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    future?: FutureConfig;
    hydrationData?: HydrationState;
    window?: Window;
  }
): RemixRouter;
```

## `routes`

[`Route`](../components/route) 对象的数组，在 `children` 属性上有嵌套路由。

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

应用程序的基名，用于无法部署到域根目录而只能部署到子目录的情况。

```jsx
createBrowserRouter(routes, {
  basename: "/app",
});
```

当链接到根目录时，尾部的斜线将得到尊重：

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

## `future`

为路由器启用的一组可选的 [Future Flags](../guides/api-development-strategy)。我们建议您尽早选择使用新发布的 future flags，以方便您最终迁移到 v7 版本。

```jsx
const router = createBrowserRouter(routes, {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
});
```

目前可用的`future flags`如下：

| Flag                     | 描述                                                     |
| ------------------------ | -------------------------------------------------------- |
| `v7_fetcherPersist`      | 延迟活动的`fetcher`清理，直到它们返回到 `idle` 状态      |
| `v7_normalizeFormMethod` | 将 `useNavigation().formMethod` 规范化为大写的 HTTP 方法 |
| `v7_prependBasename`     | 将路由的基名添加到`navigate/fetch`路径的前面             |

## `window`

对于浏览器 devtool 插件或测试等环境来说，使用与全局 `window` 不同的窗口非常有用。