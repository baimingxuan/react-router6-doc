



# `useParams`

类型声明

```javascript
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

该`useParams`挂钩从当前 URL 返回一个由`<Route path>`. 子路由继承父路由的所有参数。

```javascript
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