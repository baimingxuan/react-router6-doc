



# `useParams`

类型声明

```tsx
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

“ `useParams` ” 钩子返回一个键/值对对象，其中包含当前 URL 中由 “ `<Route path>` ” 匹配的动态参数。子路由继承其父路由的所有参数。

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