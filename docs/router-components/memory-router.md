# `<MemoryRouter>`

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

`<MemoryRouter>`在内部将其位置存储在一个数组中。与`<BrowserHistory>`和`<HashHistory>`不同，它不依赖于外部源，就像浏览器中的历史堆栈。这使得它非常适合需要完全控制历史堆栈的场景，例如测试。

- `<MemoryRouter initialEntries>`默认为`["/"]`（在根`/`URL 中的单入口）
- `<MemoryRouter initialIndex>`默认为`initialEntries`最后一个索引

> **提示：**
>
> 大部分React Router 的测试都是使用 `<MemoryRouter>`作为真实来源编写的，因此您只需 [浏览我们的测试用例](https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__)就可以看到一些很好的使用它的例子。

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