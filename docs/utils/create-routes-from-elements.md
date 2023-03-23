# `createRoutesFromElements`

`createRoutesFromElements` 是一个帮助程序，它可以从 `<Route>` 元素创建路由对象。如果您更喜欢使用 JSX 而不是对象来创建路由，则它非常有用。

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

它也被 [`<Routes>`](https://reactrouter.com/en/main/components/routes) 内部使用，从其 [`<Route>`](https://reactrouter.com/en/main/components/route) 子元素生成路由对象。

## 类型声明

```tsx
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