`<MemoryRouter>`

类型声明

```javascript
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

A`<MemoryRouter>`在内部将其位置存储在一个数组中。与`<BrowserHistory>`and不同`<HashHistory>`，它不依赖于外部源，例如浏览器中的历史堆栈。这使得它非常适合需要完全控制历史堆栈的场景，例如测试。

- `<MemoryRouter initialEntries>`默认为`["/"]`（根`/`URL 中的单个条目）
- `<MemoryRouter initialIndex>`默认为最后一个索引`initialEntries`

> **提示：**
>
> React Router 的大部分测试都是使用 a`<MemoryRouter>`作为真实来源编写的，因此您只需 [浏览我们的测试](https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__)就可以看到一些很好的使用它的例子。

```javascript
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