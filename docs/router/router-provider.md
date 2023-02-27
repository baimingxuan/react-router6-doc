# `<RouterProvider>`

所有路由对象都会传递给这个组件，以渲染您的应用程序并启用其余的 API。

```javascript
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

如果您不是服务端渲染您的应用程序，`DataBrowserRouter`将在加载时启动所有匹配的路由加载器。在此期间，您可以提供`fallbackElement`给用户一些应用程序正在工作的指示。使静态托管 TTFB 计数！

```javascript
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
```