# `useRouteError`

在 [`errorElement`](https://baimingxuan.github.io/react-router6-doc/route/error-element) 中，该钩子会返回在操作、加载器或渲染过程中抛出的任何响应。请注意，抛出的响应有特殊处理方式，更多信息请参阅 [`isRouteErrorResponse`](https://baimingxuan.github.io/react-router6-doc/utils/is-route-error-response)。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router)。

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