# `useFormAction`

类型声明

```tsx
declare function useFormAction(
  action?: string,
  { relative }: { relative?: RelativeRoutingType } = {}
): string;
```

此钩子在 [`<Form>`](https://reactrouter.com/en/main/components/form) 中内部使用，以自动解析默认和相对操作到当前上下文中的当前路由。虽然不常见，但您可以直接使用它来计算正确的操作，以更改按钮的 `<Form>` 的操作，例如计算 `<button formAction>` 的正确操作。（是的，HTML按钮可以更改其表单的操作！）

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

它还可以自动解决[`submit`](https://reactrouter.com/en/main/hooks/use-submit)用[`fetcher.submit`](https://reactrouter.com/en/main/hooks/use-fetcher#fetchersubmit)的操作。

```jsx
let submit = useSubmit();
let action = useFormAction();
submit(formData, { action });
```