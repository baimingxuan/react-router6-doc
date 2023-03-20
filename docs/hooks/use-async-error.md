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

请查看[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)和[`<Await>`](https://reactrouter.com/en/main/components/await)文档以获取更多信息。