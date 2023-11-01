# `useRoutes`

类型声明

```tsx
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```

 `useRoutes`钩子的功能上等同于 [`<Routes>`](https://reactrouter.com/en/main/components/routes)，但它使用 JavaScript 对象而不是 [`<Route>元素 `](https://reactrouter.com/en/main/components/route)元素来定义路由。这些对象具有与普通 `<Route>` 元素相同的属性，但不需要 JSX。

`useRoutes` 的返回值要么是一个有效的 React 元素，可以用来呈现路由树；要么是 `null` （如果没有匹配的元素）。

```jsx
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