# `unstable_usePrompt`

类型声明

```ts
declare function unstable_usePrompt({
  when,
  message,
}: {
  when: boolean | BlockerFunction;
  message: string;
}) {

type BlockerFunction = (args: {
  currentLocation: Location;
  nextLocation: Location;
  historyAction: HistoryAction;
}) => boolean;

interface Location<State = any> extends Path {
  state: State;
  key: string;
}

interface Path {
  pathname: string;
  search: string;
  hash: string;
}

enum HistoryAction {
  Pop = "POP",
  Push = "PUSH",
  Replace = "REPLACE",
}
```

`unstable_usePrompt` 钩子允许您在导航离开当前位置前通过 [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) 提示用户进行确认。

> NOTE
>
> 这仅适用于 React Router 应用程序中的客户端导航，不会阻止文档请求。要阻止文档导航，您需要添加自己的 [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) 事件处理程序。

> IMPORTANT
>
> 阻止用户导航是一种反模式，因此请仔细考虑此钩子的任何用法，并尽量少用。在防止用户从填写了一半的表单中移开的事实用例中，您可以考虑将未保存的状态持久化到 `sessionStorage` 中，并在用户返回时自动重新填写，而不是阻止用户移开表单。

> IMPORTANT
>
> 我们不打算从该钩子中移除 `unstable_` 前缀，因为在打开提示时，不同浏览器的行为是不确定的，因此 React Router 无法保证在所有情况下都能正确操作。为了避免这种非确定性，我们建议使用 `useBlocker`，这样您也可以控制确认的用户体验。

```jsx
function ImportantForm() {
  let [value, setValue] = React.useState("");

  // Block navigating elsewhere when data has been entered into the input
  unstable_usePrompt({
    message: "Are you sure?",
    when: ({ currentLocation, nextLocation }) =>
      value !== "" &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <Form method="post">
      <label>
        Enter some important data:
        <input
          name="data"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </Form>
  );
}
```