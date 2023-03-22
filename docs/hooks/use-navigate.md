# `useNavigate`

> 通常在加载器和操作中使用[`redirect`](https://reactrouter.com/en/main/fetch/redirect)要比使用此钩子更好。
>

`useNavigate` 钩子返回一个函数，让您可以以编程方式导航，例如在 effect 中：

```jsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

## 类型声明

```tsx
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}
```

`navigate` 函数有两个签名：

- 要么传递一个 `To` 值（与 `<Link to>` 相同的类型），带有可选的第二个 `{ replace, state }` 参数，要么
- 传递您想要在历史堆栈中前进的增量。例如， `navigate(-1)` 等同于点击后退按钮。