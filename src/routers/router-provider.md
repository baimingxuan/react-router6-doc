# `<RouterProvider>`

所有[数据路由](../routers/picking-a-router)对象都将传递给该组件，以渲染应用程序并启用其他数据 API。

> 由于在数据 API 的设计中解耦了获取和呈现，因此您应该在 React 树之外创建路由，并使用静态定义的路由集。有关此设计的更多信息，请参阅 [Remixing React Router](https://remix.run/blog/remixing-react-router) 博文和 [When to Fetch](https://www.youtube.com/watch?v=95B8mnhzoCM) 会议演讲。

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

如果您没有在服务器上渲染应用程序， `createBrowserRouter` 将在挂载时启动所有匹配的路由加载器。在此期间，您可以提供 `fallbackElement` ，向用户表明应用程序正在运行。将静态托管 TTFB 计算在内！

```jsx
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
```

## `future`

一组可选的 [Future Flags](../guides/api-development-strategy)。我们建议您尽早选择使用新发布的 future flags，以方便您最终迁移到 v7版本。

```jsx
function App() {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  );
}
```