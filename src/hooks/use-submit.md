# `useSubmit`

`<Form>` 的命令式版本，让程序员代替用户提交表单。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅[选择路由](../routers/picking-a-router)。

例如，每当表单内的值发生变化时就提交表单：

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

如果您想让某人在一段时间不活动后自动退出网站，这也很有用。在本例中，我们将 "不活动 "定义为用户在 5 分钟后没有浏览任何其他页面。

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

提交的第一个参数可接受多种不同的值。

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

或者您也可以提交 `URLSearchParams` ：

```jsx
let searchParams = new URLSearchParams();
searchParams.append("cheese", "gouda");
submit(searchParams);
```

或 `URLSearchParams` 构造函数接受的任何内容：

```jsx
submit("cheese=gouda&toasted=yes");
submit([
  ["cheese", "gouda"],
  ["toasted", "yes"],
]);
```

如果以 POST 方式提交 JSON 对象，默认行为是将数据编码为 `FormData` ：

```jsx
submit(
  { key: "value" },
  {
    method: "post",
    encType: "application/x-www-form-urlencoded",
  }
);
// will serialize into request.formData() in your action
// and will show up on useNavigation().formData during the navigation
```

或者您可以选择使用 JSON 编码：

```jsx
submit(
  { key: "value" },
  { method: "post", encType: "application/json" }
);
// will serialize into request.json() in your action
// and will show up on useNavigation().json during the navigation

submit('{"key":"value"}', {
  method: "post",
  encType: "application/json",
});
// will encode into request.json() in your action
// and will show up on useNavigation().json during the navigation
```

或纯文本：

```jsx
submit("value", { method: "post", encType: "text/plain" });
// will serialize into request.text() in your action
// and will show up on useNavigation().text during the navigation
```

## 提交选项

第二个参数是一组直接映射（大部分）表单提交属性的选项：

```jsx
submit(null, {
  method: "post",
  action: "/logout",
});

// same as
<Form action="/logout" method="post" />;
```

> NOTE
>
> 请参阅 `useResolvedPath` 文档中的 [Splat Paths](../hooks/use-resolved-path#splat-paths) 部分，了解 `future.v7_relativeSplatPath` 未来标志在 `splat` 路由中相对 `useSubmit()` `action` 的行为。

由于提交的是导航，因此选项还可能包含 [`Form`](../components/form) 中与导航相关的其他属性，如：

- `fetcherKey`
- `navigate`
- `preventScrollReset`
- `relative`
- `replace`
- `state`
- `unstable_viewTransition`

### `options.unstable_flushSync`

`unstable_flushSync` 选项会告诉 React Router DOM 将此提交的初始状态更新封装在 `ReactDOM.flushSync` 调用中，而不是默认的 [`ReactDOM.flushSync`](https://react.dev/reference/react-dom/flushSync)  中。这样就可以在更新刷新到 DOM 后立即执行同步 DOM 操作。

> IMPORTANT
>
> 请注意，该应用程序接口标记为不稳定状态，在未发布重大版本之前可能会出现破坏性更新。