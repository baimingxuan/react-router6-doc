# `useRoutes`

类型声明

```javascript
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```

钩子在`useRoutes`功能上等同于[``](https://reactrouter.com/en/main/components/routes)，但它使用 JavaScript 对象而不是``元素来定义您的路由。[``这些对象具有与普通元素](https://reactrouter.com/en/main/components/route)相同的属性，但它们不需要 JSX。

的返回值`useRoutes`是可用于呈现路由树的有效 React 元素，或者`null`没有匹配项。

```javascript
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```