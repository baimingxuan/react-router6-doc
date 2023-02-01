# `useLoaderData`

这个钩子提供从你的路由加载器返回的值。

```javascript
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

function loader() {
  return fetchFakeAlbums();
}

export function Albums() {
  const albums = useLoaderData();
  // ...
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: loader,
    element: <Albums />,
  },
]);

ReactDOM.createRoot(el).render(
  <RouterProvider router={router} />
);
```

调用路由[操作](https://reactrouter.com/en/main/components/route#action)后，数据将自动重新验证并返回加载程序的最新结果。

请注意，`useLoaderData` *这不会启动 fetch*。它只是读取 React Router 内部管理的获取结果，因此您无需担心它在出于路由之外的原因重新渲染时重新获取。

这也意味着返回的数据在渲染之间是稳定的，所以你可以安全地将它传递给 React hooks 中的依赖数组，比如`useEffect`. 它仅在操作或某些导航后再次调用加载程序时发生变化。在这些情况下，身份将发生变化（即使值没有变化）。

您可以在任何组件或任何自定义挂钩中使用此挂钩，而不仅仅是 Route 元素。它将根据上下文从最近的路线返回数据。

要从页面上的任何活动路线获取数据，请参阅[`useRouteLoaderData`](https://reactrouter.com/en/main/hooks/use-route-loader-data)。