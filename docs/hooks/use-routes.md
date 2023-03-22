# `useRoutes`

类型声明

```tsx
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```

 `useRoutes`钩子是功能上等同于 [`<Routes>`](https://reactrouter.com/en/main/components/routes)的钩子，但它使用 JavaScript 对象而不是 [`<Route>元素`](https://reactrouter.com/en/main/components/route)来定义您的路由。这些对象具有与普通的 `<Route>` 元素相同的属性，但它们不需要 JSX。

`useRoutes` 的返回值可以是一个有效的 React 元素，您可以使用它来渲染路由树，或者如果没有匹配到任何内容，则为 `null` 。

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