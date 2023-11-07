# `<BrowserRouter>`

类型声明

```tsx
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  future?: FutureConfig;
  window?: Window;
}
```

`<BrowserRouter>` 使用简洁的 URL 将当前位置存储在浏览器地址栏中，并使用浏览器内置的历史堆栈进行导航。

```jsx
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* The rest of your app goes here */}
  </BrowserRouter>
);
```

## `basename`

配置您的应用程序，使其在 URL 中的特定基名下运行：

```jsx
function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
}
```

## `future`

一组可选的 [Future Flags](https://baimingxuan.github.io/react-router6-doc/guides/api-development-strategy) 。我们建议您尽早选择使用新发布的`future flags`，以方便您最终迁移到 v7 版本。

```jsx
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>{/*...*/}</Routes>
    </BrowserRouter>
  );
}
```

## `window`

`BrowserRouter` 默认情况下使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView) ，但也可用于跟踪另一个窗口的 URL 变化，例如在`<iframe>`中。 