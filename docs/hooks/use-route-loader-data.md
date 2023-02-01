# `useRouteLoaderData`

此挂钩使任何当前呈现的路线上的数据在树中的任何位置都可用。这对于需要来自更上层路由的数据的树深处的组件，以及需要树中更深处的子路由数据的父路由很有用。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
import { useRouteLoaderData } from "react-router-dom";

function SomeComp() {
  const user = useRouteLoaderData("root");
  // ...
}
```

React Router 使用确定性的、自动生成的路由 ID 在内部存储数据，但您可以提供自己的路由 ID 以使此挂钩更易于使用。考虑一个带有定义 id 的路由的路由器：

```javascript
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

```javascript
const user = useRouteLoaderData("root");
```

唯一可用的数据是当前呈现的路线。如果您从当前未呈现的路由请求数据，钩子将返回`undefined`。