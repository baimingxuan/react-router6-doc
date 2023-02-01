# `useFormAction`

类型声明

```javascript
declare function useFormAction(
  action?: string,
  { relative }: { relative?: RelativeRoutingType } = {}
): string;
```

此挂钩在内部[``](https://reactrouter.com/en/main/components/form)用于自动将默认和相关操作解析为上下文中的当前路由。虽然不常见，但您可以直接使用它来执行诸如计算 a 的正确操作`<button formAction>`以更改按钮的操作之类的操作`<Form>`。（是的，HTML 按钮可以更改其表单的操作！）

```javascript
import { useFormAction } from "react-router-dom";

function DeleteButton() {
  return (
    <button
      formAction={useFormAction("destroy")}
      formMethod="post"
    >
      Delete
    </button>
  );
}
```

它对于自动解析 和 的操作也很有[`submit`](https://reactrouter.com/en/main/hooks/use-submit)用[`fetcher.submit`](https://reactrouter.com/en/main/hooks/use-fetcher#fetchersubmit)。

```javascript
let submit = useSubmit();
let action = useFormAction();
submit(formData, { action });
```