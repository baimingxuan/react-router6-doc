# `createHashRouter`

如果您无法将Web服务器配置为将所有规则定向到React Router应用程序，则此路由非常有用。它将使用URL的哈希（#）部分来管理“应用程序URL”，而不是使用普通URL。

> 不建议使用哈希 URL。
>

除此之外，它在功能上与[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)一致。

```javascript
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