# `<RouterProvider>`

所有路由对象都会传递到此组件以呈现您的应用程序并启用其余的 API。

```jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<BigSpinner />}
  />
);
```

## `fallbackElement`

如果您没有对您的应用进行服务器渲染， `DataBrowserRouter` 将在挂载时启动所有匹配的路由加载器。在此期间，您可以提供一个 `fallbackElement` 来向用户提供一些指示，表明应用正在工作。让静态托管的 TTFB 有所作为！

```jsx
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
```