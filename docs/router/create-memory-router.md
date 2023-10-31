# `createMemoryRouter`

内存路由不使用浏览器的历史记录，而是在内存中管理自己的历史堆栈。它主要适用于 Storybook 等测试和组件开发工具，但也可用于在任何非浏览器环境中运行 React Router。

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

```ts
function createMemoryRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    future?: FutureConfig;
    hydrationData?: HydrationState;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
  }
): RemixRouter;
```

## `initialEntries`

历史堆栈中的初始条目。这样，您就可以在历史堆栈中已有多个位置的情况下启动测试（或应用程序）（用于测试返回导航等）。

```jsx
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```

## `initialIndex`

历史堆栈中要呈现的初始索引。这样就可以从特定条目开始测试。默认为 `initialEntries` 中的最后一个条目。

```jsx
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // start at "/events/123"
});
```

## 其他属性

对于所有的其他属性，请参阅[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)