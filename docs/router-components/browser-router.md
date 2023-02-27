# `<BrowserRouter>`

类型声明

```javascript
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

`<BrowserRouter>`使用干净的 URL 将当前位置存储在浏览器的地址栏中，并使用浏览器的内置历史堆栈进行导航。

`<BrowserRouter window>`默认使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但它也可用于跟踪对另一个窗口 URL 的更改，在`<iframe>`中，例如 。

```javascript
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