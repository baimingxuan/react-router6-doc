# `<RouterProvider>`

所有路由器对象都传递给此组件以呈现您的应用程序并启用其余 API。

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

如果您不是服务器渲染您的应用程序，`DataBrowserRouter`将在安装时启动所有匹配的路由加载器。在此期间，您可以提供一个`fallbackElement`给用户一些表明该应用程序正在运行的指示。使静态托管 TTFB 计数！

```javascript
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
```