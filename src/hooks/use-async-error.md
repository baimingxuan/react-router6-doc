# `useAsyncError`

从最近的 `<Await>` [await] 组件返回拒绝值。

```jsx
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

更多信息，请参阅[延迟数据指南](../guides/deferred)和[`<Await>`](../components/await)文档。