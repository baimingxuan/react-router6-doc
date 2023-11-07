# `useRevalidator`

此钩子允许您以任何理由重新验证数据。React Router 会在调用操作后自动重新验证数据，但您也可能出于其他原因（如焦点返回窗口时）需要重新验证数据。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router)。

```jsx
import { useRevalidator } from "react-router-dom";

function WindowFocusRevalidator() {
  let revalidator = useRevalidator();

  useFakeWindowFocus(() => {
    revalidator.revalidate();
  });

  return (
    <div hidden={revalidator.state === "idle"}>
      Revalidating...
    </div>
  );
}
```

同样，React Router 已经在绝大多数情况下自动重新验证了页面上的数据，因此很少需要这样做。如果您发现自己使用此功能对数据进行正常的 CRUD 操作，以响应用户交互，那么您可能没有利用其他 API（如  [`<Form>`](https://baimingxuan.github.io/react-router6-doc/components/form) 、 [`useSubmit`](https://baimingxuan.github.io/react-router6-doc/hooks/use-submit) 或 [`useFetcher`](https://baimingxuan.github.io/react-router6-doc/hooks/use-fetcher) ）来自动执行此操作。

## `revalidator.state`

告诉您重新验证所处的状态，是 `"idle"` 还是 `"loading"` 。

这对创建加载指示器和旋转器非常有用，可以让用户知道应用程序正在思考。

## `revalidator.revalidate()`

这将启动重新验证。

```jsx
function useLivePageData() {
  let revalidator = useRevalidator();
  let interval = useInterval(5000);

  useEffect(() => {
    if (revalidator.state === "idle") {
      revalidator.revalidate();
    }
  }, [interval]);
}
```

## 说明

虽然您可以同时呈现多个 `useRevalidator` ，但它的底层是一个单例。这意味着当调用一个 `revalidator.revalidate()` 时，所有实例都会一起进入 `"loading"` 状态（或者说，它们都会更新以报告单例状态）。

当重新验证正在进行时，调用 `revalidate()` 会自动处理竞争条件。

如果在重新验证过程中发生导航，重新验证将被取消，并要求所有加载器为下一页提供新数据。