# `useLoaderData`

此钩子提供路由`loader`返回的值。

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

调用路由[操作](https://baimingxuan.github.io/react-router6-doc/components/route#action)后，数据将自动重新验证，并返回加载器的最新结果。

请注意， `useLoaderData` *不会触发获取操作*。它只是读取 React Router 在内部管理的获取结果，因此您不必担心它在路由之外的重新渲染时重新获取。

这也意味着返回的数据在两次渲染之间是稳定的，因此您可以安全地将其传递给 React 钩子中的依赖关系数组，如 `useEffect` 。只有在操作或某些导航后再次调用`loader`时，数据才会发生变化。在这种情况下，标识会发生变化（即使值不会发生变化）。

您可以在任何组件或任何自定义钩子中使用此钩子，而不仅仅是 Route 元素。它会根据上下文从最近的路由返回数据。

要从页面上的任何活动路由获取数据，请参阅[`useRouteLoaderData`](https://baimingxuan.github.io/react-router6-doc/hooks/use-route-loader-data)。