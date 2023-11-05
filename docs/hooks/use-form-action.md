# `useFormAction`

类型声明

```ts
declare function useFormAction(
  action?: string,
  { relative }: { relative?: RelativeRoutingType } = {}
): string;
```

[`<Form>`](https://baimingxuan.github.io/react-router6-doc/components/form) 内部使用该钩子自动根据上下文解析当前路由的默认操作和相对操作。虽然并不常见，但您可以直接使用它来做一些事情，例如计算 `<button formAction>` 的正确操作，以更改按钮 `<Form>` 的操作（是的，HTML 按钮可以更改其表单的操作！）。

```jsx
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

它还可用于自动解决[`submit`](https://baimingxuan.github.io/react-router6-doc/hooks/use-submit)和[`fetcher.submit`](https://baimingxuan.github.io/react-router6-doc/hooks/use-fetcher#fetchersubmit)的操作。

```jsx
let submit = useSubmit();
let action = useFormAction();
submit(formData, { action });
```