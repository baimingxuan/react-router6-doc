# `useOutletContext`

类型声明

```javascript
declare function useOutletContext<
  Context = unknown
>(): Context;
```

通常，父路由管理状态或您希望与子路由共享的其他值。如果你愿意，你可以创建自己的[上下文提供者](https://reactjs.org/docs/context.html)，但这是一种常见的情况，它是内置的`<Outlet />`：

```javascript
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
import { useOutletContext } from "react-router-dom";

function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

如果您使用的是 TypeScript，我们建议父组件提供一个自定义挂钩来访问上下文值。这使消费者更容易获得良好的类型、控制消费者并了解谁在使用上下文值。这是一个更现实的例子：

```javascript
import * as React from "react";
import type { User } from "./types";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { user: User | null };

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ user }} />
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
import { useUser } from "../dashboard";

export default function DashboardMessages() {
  const { user } = useUser();
  return (
    <div>
      <h2>Messages</h2>
      <p>Hello, {user.name}!</p>
    </div>
  );
}
```