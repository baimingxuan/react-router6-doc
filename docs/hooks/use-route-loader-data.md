# `useRouteLoaderData`

这个钩子使得当前渲染路由的数据在树的任何地方都可用。这对于树中深层组件需要来自更远路由的数据以及父路由需要更深层次子路由的数据非常有用。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

```jsx
import { useRouteLoaderData } from "react-router-dom";

function SomeComp() {
  const user = useRouteLoaderData("root");
  // ...
}
```

React Router 内部使用确定性的自动生成路由 ID 存储数据，但您可以提供自己的路由 ID，以使此钩子更易于使用。考虑一个具有定义 ID 的路由的路由器：

```jsx
createBrowserRouter([
  {
    path: "/",
    loader: () => fetchUser(),
    element: <Root />,
    id: "root",
    children: [
      {
        path: "jobs/:jobId",
        loader: loadJob,
        element: <JobListing />,
      },
    ],
  },
]);
```

现在用户可以在应用程序的任何其他地方使用。

```jsx
const user = useRouteLoaderData("root");
```

唯一可用的数据是当前呈现的路由。如果您请求当前未呈现的路由的数据，则该钩子将返回 `undefined` 。