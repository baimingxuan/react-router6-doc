# `useRevalidator`

这个钩子允许您出于任何原因重新验证数据。React Router 在调用操作后自动重新验证数据，但您可能希望出于其他原因重新验证，例如当焦点返回到窗口时。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

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

再次强调，React Router 在绝大多数情况下已经自动重新验证页面数据，因此很少需要使用此功能。如果您发现自己在响应用户交互时使用此功能来进行常规 CRUD 操作，则可能没有充分利用其他自动执行此操作的 API，例如 [`<Form>`](https://reactrouter.com/en/main/components/form) 、 [`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit) 或 [`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher) 。

## `revalidator.state`

告诉您重新验证的状态，可以是 `"idle"` 或 `"loading"` 。

这对于创建加载指示器和旋转器非常有用，以让用户知道应用正在思考中。

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

## 笔记

虽然您可以同时呈现多个 `useRevalidator` ，但在其下方是一个单例。这意味着当调用一个 `revalidator.revalidate()` 时，所有实例都会进入 `"loading"` 状态（或者更确切地说，它们都会更新以报告单例状态）。

当在重新验证已经在进行中时调用 `revalidate()` 时，竞争条件会自动处理。

如果在重新验证正在进行时发生导航，则重新验证将被取消，并为下一页从所有加载器请求新数据。