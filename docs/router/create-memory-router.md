# `createMemoryRouter`

内存路由在内存中管理自己的历史堆栈，而不是使用浏览器的历史记录。它主要用于测试和组件开发工具，如 Storybook，但也可以用于在任何非浏览器环境中运行React Router。

```javascript
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import * as React from "react";
import {
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarEvent from "./routes/event";

test("event route", async () => {
  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/events/:id",
      element: <CalendarEvent />,
      loader: () => FAKE_EVENT,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(
    FAKE_EVENT.name
  );
});
```

## 类型声明

```javascript
function createMemoryRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    window?: Window;
  }
): RemixRouter;
```

## `initialEntries`

历史堆栈中的初始条目。这允许您启用具有历史堆栈中已存在的多个位置的测试（或应用程序）（用于测试后退导航等）

```javascript
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```

## `initialIndex`

要渲染的历史堆栈中的初始索引。这允许您在特定条目处开始测试。它默认为`initialEntries`中的最后一个条目。

```javascript
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // start at "/events/123"
});
```

## 其他道具

对于所有其他属性，请参阅[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)