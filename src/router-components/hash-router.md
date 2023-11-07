# `<HashRouter>`

类型声明

```ts
declare function HashRouter(
  props: HashRouterProps
): React.ReactElement;

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  future?: FutureConfig;
  window?: Window;
}
```

`<HashRouter>` 用于`Web`浏览器，当 URL 因某些原因不应（或不能）发送到服务器时。这种情况可能发生在某些共享主机环境中，在这种环境中，您无法完全控制服务器。在这种情况下， `<HashRouter>` 可以将当前位置存储在当前 URL 的 `hash` 部分，因此永远不会发送到服务器。

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

> IMPORTANT
>
> 我们强烈建议您不要使用 `HashRouter` ，除非万不得已。

## `basename`

配置您的应用程序，使其在 URL 中的特定基名下运行：

```jsx
function App() {
  return (
    <HashRouter basename="/app">
      <Routes>
        <Route path="/" /> {/* 👈 Renders at /#/app/ */}
      </Routes>
    </HashRouter>
  );
}
```

## `future`

一组可选的[Future Flags](../guides/api-development-strategy) 。我们建议您尽早选择使用新发布的future flags，以方便您最终迁移到 v7 版本。

```jsx
function App() {
  return (
    <HashRouter future={{ v7_startTransition: true }}>
      <Routes>{/*...*/}</Routes>
    </HashRouter>
  );
}
```

## `window`

`HashRouter` 默认情况下使用当前[文档的`defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但也可用于跟踪另一个窗口的 URL 变化，例如在`<iframe>`中。