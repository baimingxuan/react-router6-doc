# `useRouteError`

在 内部[`errorElement`](https://reactrouter.com/en/main/route/error-element)，此挂钩返回在操作、加载程序或渲染期间抛出的任何内容。请注意，抛出的响应有特殊处理，[`isRouteErrorResponse`](https://reactrouter.com/en/main/utils/is-route-error-response)有关详细信息，请参阅 。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // unexpected errors in loaders/actions
    something.that.breaks();
  }}
  action={() => {
    // stuff you throw on purpose in loaders/actions
    throw new Response("Bad Request", { status: 400 });
  }}
  element={
    // and errors thrown while rendering
    <div>{breaks.while.rendering}</div>
  }
/>;
```