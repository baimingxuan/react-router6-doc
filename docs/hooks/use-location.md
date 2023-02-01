# `useLocation`

类型声明

```javascript
declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}
```

这个钩子返回当前[`location`](https://reactrouter.com/en/main/utils/location)对象。如果您想在当前位置更改时执行一些副作用，这将很有用。

```javascript
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