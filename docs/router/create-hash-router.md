# `createHashRouter`

如果您无法配置 Web 服务器将所有流量定向到 React Router 应用程序，那么这个路由就非常有用。它不使用普通 URL，而是使用 URL 的哈希 (#) 部分来管理 "应用程序 URL"。

> 不建议使用哈希 URL。
>

除此之外，它在功能上与[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)相同。

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```