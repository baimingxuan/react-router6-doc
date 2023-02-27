# `<HashRouter>`

类型声明

```javascript
declare function HashRouter(
  props: HashRouterProps
): React.ReactElement;

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

`<HashRouter>`用于在 Web 浏览器中使用，当 URL 由于某种原因不应（或无法）发送到服务器时。这可能发生在您无法完全控制服务器的某些共享托管场景中。在这些情况下，`<HashRouter>`可以将当前位置存储在当前 URL 的`hash`部分中，因此它永远不会发送到服务器。

`<HashRouter window>`默认使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但它也可用于跟踪对另一个窗口 URL 的更改，在`<iframe>`中，例如。

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    {/* The rest of your app goes here */}
  </HashRouter>,
  root
);
```

> `HashRouter`除非绝对必要，否则我们强烈建议您不要使用。