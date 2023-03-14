# `<HashRouter>`

类型声明

```tsx
declare function HashRouter(
  props: HashRouterProps
): React.ReactElement;

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

`<HashRouter>` 用于在某些情况下不应（或无法）将URL发送到服务器时在Web浏览器中使用。这可能会在某些共享托管方案中发生，您无法完全控制服务器。在这些情况下， `<HashRouter>` 使得可以将当前位置存储在当前URL的 `hash` 部分中，因此它永远不会被发送到服务器。

`<HashRouter window>`默认使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但也可以用于跟踪另一个窗口的URL更改，例如在 `<iframe>` 中。

```jsx
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

> 我们强烈建议您除非绝对必须，否则不要使用 `HashRouter` 。