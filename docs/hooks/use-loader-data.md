# `useLoaderData`

这个钩子提供了从您的路由加载器返回的值。

```jsx
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

路由后的[操作](https://reactrouter.com/en/main/components/route#action)将自动重新验证数据并返回您的加载器的最新结果。

请注意， `useLoaderData` *不会触发获取操作*。它只是读取 React Router 在内部管理的获取结果，因此您不必担心它在路由之外的重新渲染时重新获取。

这也意味着返回的数据在重新渲染之间是稳定的，因此您可以安全地将其传递给 React hooks 中的依赖项数组，例如 `useEffect` 。它仅在操作或某些导航后再次调用加载器时更改。在这些情况下，标识将更改（即使值不变）。

您可以在任何组件或任何自定义 hook 中使用此 hook，而不仅仅是 Route 元素。它将返回上下文中最近路由的数据。

要从页面上的任何活动路由获取数据，请参见[`useRouteLoaderData`](https://reactrouter.com/en/main/hooks/use-route-loader-data)。