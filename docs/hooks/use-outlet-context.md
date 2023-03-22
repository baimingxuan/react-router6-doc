# `useOutletContext`

类型声明

```tsx
declare function useOutletContext<
  Context = unknown
>(): Context;
```

通常，父级路由会管理状态或其他您希望与子路由共享的值。如果您愿意，可以创建自己的[上下文提供程序](https://reactjs.org/docs/context.html)，但这是一个常见的情况，已经内置在 `<Outlet />` 中：

```jsx
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

如果您正在使用TypeScript，我们建议父组件提供一个自定义钩子来访问上下文值。这使得消费者更容易获得良好的类型定义，控制消费者，并知道谁在使用上下文值。以下是一个更现实的例子：

`src/routes/dashboard.tsx`

```jsx
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
```

`src/routes/dashboard/messages.tsx`

```jsx
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