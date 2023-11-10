# `isRouteErrorResponse`

如果[路由错误](../hooks/use-route-error)是*路由错误响应*，则返回 `true` 。

```jsx
import { isRouteErrorResponse } from "react-router-dom";

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

当响应从`action`或`loader`抛出时，它将被解包为 `ErrorResponse` ，这样您的组件就不必处理解包的复杂性（这需要 React 状态和效果来处理从 `res.json()` 返回的`promise`）。

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

> NOTE
>
> 如果用户访问的路由与应用程序中的任何路由都不匹配，React 路由器本身就会发出 404 响应。