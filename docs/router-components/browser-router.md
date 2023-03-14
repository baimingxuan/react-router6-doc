# `<BrowserRouter>`

类型声明

```tsx
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

`<BrowserRouter>`使用干净的URL存储浏览器地址栏中的当前位置，并使用浏览器内置的历史记录堆栈进行导航。

`<BrowserRouter window>`默认使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但也可以用于跟踪另一个窗口的URL更改，例如在 `<iframe>` 中。

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