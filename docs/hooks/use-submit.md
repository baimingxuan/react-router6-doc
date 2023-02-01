# `useSubmit`

命令式版本`<Form>`让您（程序员）代替用户提交表单。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

例如，每次表单内的值发生变化时提交表单：

```javascript
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

如果您想在一段时间不活动后自动将某人从您的网站注销，这也很有用。在这种情况下，我们将不活动定义为用户在 5 分钟后没有导航到任何其他页面。

```javascript
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

提交的第一个参数接受许多不同的值。

您可以提交任何表单或表单输入元素：

```javascript
// input element events
<input onChange={(event) => submit(event.currentTarget)} />;

// React refs
let ref = useRef();
<button ref={ref} />;
submit(ref.current);
```

您可以提交`FormData`：

```javascript
let formData = new FormData();
formData.append("cheese", "gouda");
submit(formData);
```

## 提交选项

第二个参数是一组直接映射到表单提交属性的选项：

```javascript
submit(null, {
  action: "/logout",
  method: "post",
});

// same as
<Form action="/logout" method="post" />;
```