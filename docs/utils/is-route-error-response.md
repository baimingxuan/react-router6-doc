# `isRouteErrorResponse`

如果[路由错误](https://reactrouter.com/en/main/hooks/use-route-error)是*路由错误响应*，则返回 `true` 。

```jsx
mport { isRouteErrorResponse } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
}
```

当从操作或加载程序中抛出响应时，它将被解包成 `ErrorResponse` ，以便您的组件不必处理解包的复杂性（这需要使用 React 状态和效果来处理从 `res.json()` 返回的 Promise）。

```jsx
import { json } from "react-router-dom";

<Route
  errorElement={<ErrorBoundary />}
  action={() => {
    throw json(
      { message: "email is required" },
      { status: 400 }
    );
  }}
/>;

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.status; // 400
    error.data; // { "message: "email is required" }
  }
}
```

> 如果用户访问的路由与应用程序中的任何路由都不匹配，则 React Router 本身将抛出 404 响应。