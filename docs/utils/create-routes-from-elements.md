# `createRoutesFromElements`

`createRoutesFromElements``<Route>`是一个从元素创建路由对象的助手。如果您更喜欢将路由创建为 JSX 而不是对象，这将很有用。

```javascript
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

它还在内部用于[``](https://reactrouter.com/en/main/components/routes)从其[``](https://reactrouter.com/en/main/components/route)子项生成路由对象。

## 类型声明

```javascript
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