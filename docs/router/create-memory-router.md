# `createMemoryRouter`

不使用浏览器的历史记录，内存路由在内存中管理自己的历史记录堆栈。它主要用于测试和组件开发工具，如 Storybook，但也可用于在任何非浏览器环境中运行 React Router。

```jsx
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

```jsx
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

历史堆栈中的初始条目。这使您可以在历史堆栈中启动测试（或应用程序），并已经有多个位置（用于测试后退导航等）。

```jsx
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```

## `initialIndex`

要渲染的历史堆栈中的初始索引。这使您可以从特定条目开始测试。默认为`initialEntries`中的最后一个条目。

```jsx
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // start at "/events/123"
});
```

## 其他道具

对于所有其他属性，请参阅[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)