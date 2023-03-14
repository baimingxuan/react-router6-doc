# `<NativeRouter>`

类型声明

```tsx
declare function NativeRouter(
  props: NativeRouterProps
): React.ReactElement;

interface NativeRouterProps extends MemoryRouterProps {}
```

`<NativeRouter>`是在[React Native](https://reactnative.dev/)应用中运行 React Router 的推荐接口。

- `<NativeRouter initialEntries>`默认为`["/"]`（在根`/`URL 中的单个条目）
- `<NativeRouter initialIndex>`默认为`initialEntries`最后一个索引

```jsx
import * as React from "react";
import { NativeRouter } from "react-router-native";

function App() {
  return (
    <NativeRouter>
      {/* The rest of your app goes here */}
    </NativeRouter>
  );
}
```

