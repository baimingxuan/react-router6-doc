# `useRouteError`

在 [`errorElement`](https://reactrouter.com/en/main/route/error-element) 内部，此钩子返回在操作、加载器或渲染期间抛出的任何内容。请注意，抛出的响应有特殊处理方式，请参见 [`isRouteErrorResponse`](https://reactrouter.com/en/main/utils/is-route-error-response) 了解更多信息。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

```jsx
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