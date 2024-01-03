# `useBlocker`

类型声明

```ts
declare function useBlocker(
  shouldBlock: boolean | BlockerFunction
): Blocker;

type BlockerFunction = (args: {
  currentLocation: Location;
  nextLocation: Location;
  historyAction: HistoryAction;
}) => boolean;

type Blocker =
  | {
      state: "unblocked";
      reset: undefined;
      proceed: undefined;
      location: undefined;
    }
  | {
      state: "blocked";
      reset(): void;
      proceed(): void;
      location: Location;
    }
  | {
      state: "proceeding";
      reset: undefined;
      proceed: undefined;
      location: Location;
    };

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

通过 `useBlocker` 钩子，您可以阻止用户从当前位置导航，并为他们提供自定义用户界面，让他们确认导航。

> NOTE
>
> 这仅适用于 React Router 应用程序中的客户端导航，不会阻止文档请求。要阻止文档导航，您需要添加自己的 [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) 事件处理程序。

> IMPORTANT
>
> 阻止用户导航是一种反模式，因此请仔细考虑此钩子的任何用法，并尽量少用。在防止用户从填写了一半的表单中移开的事实用例中，您可以考虑将未保存的状态持久化到 `sessionStorage` 中，并在用户返回时自动重新填写，而不是阻止用户移开表单。

```jsx
function ImportantForm() {
  let [value, setValue] = React.useState("");

  // Block navigating elsewhere when data has been entered into the input
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      value !== "" &&
      currentLocation.pathname !== nextLocation.pathname
  );

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

      {blocker.state === "blocked" ? (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={() => blocker.proceed()}>
            Proceed
          </button>
          <button onClick={() => blocker.reset()}>
            Cancel
          </button>
        </div>
      ) : null}
    </Form>
  );
}
```

有关更完整的示例，请参阅代码库中的 [示例](https://github.com/remix-run/react-router/tree/main/examples/navigation-blocking)。

## 属性

### `state`

拦截器的当前状态

- `unblocked` - 拦截器处于闲置状态，没有阻止任何导航
- `blocked` - 拦截器阻止了导航
- `proceeding` - 拦截器从被拦截的导航中通过

### `location`

当处于 `blocked` 状态时，这表示我们阻止导航的位置。当处于 `proceeding` 状态时，这是 `blocker.proceed()` 调用后导航到的位置。

## 方法

### `proceed()`

当处于 `blocked` 状态时，您可以调用 `blocker.proceed()` 前往被封锁的地点。

### `reset()`

当处于 `blocked` 状态时，可以调用 `blocker.reset()` 将拦截器返回到 `unblocked` 状态，并将用户留在当前位置。