# `useLocation`

类型声明

```tsx
declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}
```

这个钩子返回当前的[`location`](https://reactrouter.com/en/main/utils/location)对象。如果您想在当前位置更改时执行一些副作用，这可能会很有用。

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