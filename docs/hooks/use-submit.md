# `useSubmit`

让您作为程序员提交表单而不是用户的 `<Form>` 命令式版本。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

例如，每次表单内的值发生变化时提交表单：

```jsx
import { useSubmit, Form } from "react-router-dom";

function SearchField() {
  let submit = useSubmit();
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget);
      }}
    >
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </Form>
  );
}
```

如果您希望在一段时间的不活动后自动注销某人的网站，则这也可能很有用。 在这种情况下，我们将不活动定义为用户在5分钟内没有导航到任何其他页面。

```jsx
import { useSubmit, useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdminPage() {
  useSessionTimeout();
  return <div>{/* ... */}</div>;
}

function useSessionTimeout() {
  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, 5 * 60_000);

    return () => clearTimeout(timer);
  }, [submit, location]);
}
```

## 提交目标

submit的第一个参数接受许多不同的值。

您可以提交任何表单或表单输入元素：

```jsx
// input element events
<input onChange={(event) => submit(event.currentTarget)} />;

// React refs
let ref = useRef();
<button ref={ref} />;
submit(ref.current);
```

您可以提交 `FormData` ：

```jsx
let formData = new FormData();
formData.append("cheese", "gouda");
submit(formData);
```

## 提交选项

第二个参数是一组选项，直接映射到表单提交属性：

```jsx
submit(null, {
  action: "/logout",
  method: "post",
});

// same as
<Form action="/logout" method="post" />;
```