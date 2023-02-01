# `useNavigate`

通常[`redirect`](https://reactrouter.com/en/main/fetch/redirect)在加载器和动作中使用比这个钩子更好

该`useNavigate`挂钩返回一个函数，让您以编程方式导航，例如在效果中：

```javascript
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

```javascript
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

该`navigate`函数有两个签名：

- 使用可选的第二个参数传递一个`To`值（与 相同类型）或`<Link to>``{ replace, state }`
- 在历史堆栈中传递你想要去的增量。例如，`navigate(-1)`相当于按下后退按钮。