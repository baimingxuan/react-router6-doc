# `createRoutesFromElements`

`createRoutesFromElements` 是一个从`<Route>`元素创建路由对象的辅助工具。如果您更喜欢以 JSX 而不是对象的形式创建路由，那么它将非常有用。

```jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

// Instead of this:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
```

[`<Routes>`](https://baimingxuan.github.io/react-router6-doc/components/routes) 内部也使用它来从 [`<Route>`](https://baimingxuan.github.io/react-router6-doc/components/route) 子路由生成路由对象。

## 类型声明

```ts
declare function createRoutesFromElements(
  children: React.ReactNode
): RouteObject[];

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
```