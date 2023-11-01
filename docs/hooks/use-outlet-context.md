# `useOutletContext`

类型声明

```ts
declare function useOutletContext<
  Context = unknown
>(): Context;
```

父路由通常会管理状态或其他你希望与子路由共享的值。您可以根据需要创建自己的[上下文提供程序](https://reactjs.org/docs/context.html)，但这种情况非常常见， `<Outlet />` ：

```jsx
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
```

```jsx
import { useOutletContext } from "react-router-dom";

function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

如果您使用的是 `TypeScript`，我们建议父组件为访问上下文值提供一个自定义钩子。这将使用户更容易获得漂亮的类型、操作并知道谁在使用上下文值。下面是一个更现实的例子：

`src/routes/dashboard.tsx`

```tsx
import * as React from "react";
import type { User } from "./types";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { user: User | null };

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ user } satisfies ContextType} />
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
```

`src/routes/dashboard/messages.tsx`

```tsx
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