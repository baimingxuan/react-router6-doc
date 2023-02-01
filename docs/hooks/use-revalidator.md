# `useRevalidator`

此挂钩允许您出于任何原因重新验证数据。React Router 在调用操作后自动重新验证数据，但您可能出于其他原因想要重新验证，例如当焦点返回到窗口时。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
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

同样，在绝大多数情况下，React Router 已经自动重新验证页面上的数据，因此很少需要这样做。如果您发现自己使用它对您的数据进行正常的 CRUD 操作以响应用户交互，您可能没有利用其他 API，例如[``](https://reactrouter.com/en/main/components/form)、[`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)或[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)自动执行此操作的 API。

## `revalidator.state`

告诉您重新验证所处的状态，或者`"idle"`或`"loading"`。

这对于创建加载指示器和微调器以让用户知道应用程序正在思考非常有用。

## `revalidator.revalidate()`

这会启动重新验证。

```javascript
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

虽然您可以同时渲染多次出现的`useRevalidator`，但在它下面是一个单例。这意味着当一个`revalidator.revalidate()`被调用时，所有实例一起进入`"loading"`状态（或者更确切地说，它们都更新以报告单例状态）。

`revalidate()`当重新验证已经在进行中时，调用时会自动处理竞争条件。

如果在重新验证过程中发生导航，则重新验证将被取消，并且将从所有加载器请求下一页的新数据。