# `<MemoryRouter>`

类型声明

```tsx
declare function MemoryRouter(
  props: MemoryRouterProps
): React.ReactElement;

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
}
```

`<MemoryRouter>`在内部使用数组存储其位置。与 `<BrowserHistory>` 和 `<HashHistory>` 不同，它不与外部源（如浏览器中的历史堆栈）绑定。这使得它非常适合需要完全控制历史堆栈的场景，例如测试。

- `<MemoryRouter initialEntries>`默认为`["/"]`（在根`/`URL 中的单个条目）
- `<MemoryRouter initialIndex>`默认为`initialEntries`的最后一个索引

> **提示：**
>
> React Router 的大多数测试都是使用 `<MemoryRouter>` 作为真实数据源编写的，因此您可以通过 [浏览我们的测试](https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__)来看到一些很好的使用示例。

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