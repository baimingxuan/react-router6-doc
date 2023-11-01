



# `useParams`

类型声明

```ts
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

`useParams` 钩子会返回一个由 `<Route path>` 匹配的当前 URL 动态参数的键/值对组成的对象。子路由继承父路由的所有参数。

```jsx
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```