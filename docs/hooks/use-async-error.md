# `useAsyncError`

从最近的 [ `<Await>`][await] 组件返回拒绝值。

```javascript
import { useAsyncError, Await } from "react-router-dom";

function ErrorElement() {
  const error = useAsyncError();
  return (
    <p>Uh Oh, something went wrong! {error.message}</p>
  );
}

<Await
  resolve={promiseThatRejects}
  errorElement={<ErrorElement />}
/>;
```

有关更多信息，请参阅[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)和[``文档](https://reactrouter.com/en/main/components/await)。