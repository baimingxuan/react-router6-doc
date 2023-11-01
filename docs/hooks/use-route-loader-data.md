# `useRouteLoaderData`

这个钩子可以让当前呈现的路由数据在树中的任何位置都可用。这对于树中较深位置的组件需要更远位置路由的数据，以及父路由需要树中较深位置子路由的数据时非常有用。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](https://reactrouter.com/en/main/routers/picking-a-router)。

```jsx
import { useRouteLoaderData } from "react-router-dom";

function SomeComp() {
  const user = useRouteLoaderData("root");
  // ...
}
```

React 路由器使用确定的、自动生成的路由 id 在内部存储数据，但您也可以提供自己的路由 id，让此钩子更易于使用。考虑一个定义了 id 的路由器：

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

现在，用户可以在应用程序的任何其他地方使用。

```jsx
const user = useRouteLoaderData("root");
```

唯一可用的数据是当前已呈现的路由。如果您要求从当前未呈现的路由中获取数据，钩子将返回 `undefined` 。