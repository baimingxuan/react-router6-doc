# `<MemoryRouter>`

类型声明

```ts
declare function MemoryRouter(
  props: MemoryRouterProps
): React.ReactElement;

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
  future?: FutureConfig;
}
```

`<MemoryRouter>` 将其位置存储在内部数组中。与 `<BrowserHistory>` 和 `<HashHistory>` 不同，它不与外部源绑定，如浏览器中的历史堆栈。因此，它非常适合需要完全控制历史堆栈的情况，如测试。

- `<MemoryRouter initialEntries>`默认为`["/"]`（在根`/`URL 中的单个条目）
- `<MemoryRouter initialIndex>`默认为`initialEntries`的最后一个索引

> **提示：**
>
> React Router 的大多数测试都是使用 `<MemoryRouter>` 作为真实数据源编写的，因此您只需[浏览我们的测试](https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__)，就能看到一些使用它的精彩示例。

```jsx
import * as React from "react";
import { create } from "react-test-renderer";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

describe("My app", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/users/mjackson"]}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
```

## `basename`

配置您的应用程序，使其在 URL 中的特定基名下运行：

```jsx
function App() {
  return (
    <MemoryRouter basename="/app">
      <Routes>
        <Route path="/" /> {/* 👈 Renders at /app/ */}
      </Routes>
    </MemoryRouter>
  );
}
```

## `future`

一组可选的[Future Flags](../guides/api-development-strategy) 。我们建议您尽早选择使用新发布的`future flags`，以方便您最终迁移到 v7 版本。

```jsx
function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true }}>
      <Routes>{/*...*/}</Routes>
    </MemoryRouter>
  );
}
```