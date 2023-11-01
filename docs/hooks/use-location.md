# `useLocation`

类型声明

```ts
declare function useLocation(): Location;

interface Location<State = any> extends Path {
  state: State;
  key: string;
}

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

此钩子返回当前[`location`](https://reactrouter.com/en/main/utils/location)对象。如果您想在当前位置发生变化时执行某些副作用，这将非常有用。

```jsx
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

##  属性

### `location.hash`

当前 URL 的哈希值。

### `location.key`

该位置的唯一密钥。

### `location.pathname`

当前 URL 的路径。

### `location.search`

当前 URL 的查询字符串。

### `location.state`

[`<Link state>`](https://reactrouter.com/en/main/components/link#state) 或 [`navigate`](https://reactrouter.com/en/main/hooks/use-navigate) 创建的位置的状态值。