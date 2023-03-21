# `useFetcher`

在 HTML/HTTP 中，数据的变化和加载是通过导航进行建模的： `<a href>` 和 `<form action>` 。两者都会在浏览器中导致导航。React Router 的等效方式是 [`<Link>`](https://reactrouter.com/en/main/components/link) 和 [`<Form>`](https://reactrouter.com/en/main/components/form) 。

但有时您想在导航之外调用 [`loader`](https://reactrouter.com/en/main/route/loader) ，或者调用 [`action`](https://reactrouter.com/en/main/route/action) （并获取页面上的数据以重新验证），而不更改URL。或者您需要同时进行多个突变。

许多与服务器的交互不是导航事件。这个钩子让你在不导航的情况下将你的 UI 插入到你的操作和加载器中。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

这在你需要时非常有用：

- 获取与 UI 路由（弹出窗口、动态表单等）无关的数据。
- 提交数据到操作而不导航（共享组件，如新闻通讯订阅）。
- 在列表中处理多个并发提交（典型的“待办事项应用”列表，您可以单击多个按钮，所有按钮应同时处于待处理状态）。
- 无限滚动容器
- 和更多！

如果您正在构建高度交互式的“类似应用”的用户界面，您将经常 `useFetcher` 。

```jsx
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  // call submit or load in a useEffect
  React.useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // build your UI with these properties
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // render a form that doesn't cause navigation
  return <fetcher.Form />;
}
```

获取器具有许多内置行为：

- 自动处理在获取过程中被中断的取消操作。
- 当使用POST、PUT、PATCH、DELETE提交时，首先调用该操作。
  - 操作完成后，页面上的数据将重新验证，以捕获可能发生的任何变化，自动将您的用户界面与服务器状态保持同步。
- 当多个获取器同时运行时，它将会...
  - 提交最新可用的数据，因为它们每个都到达。
  - 确保没有陈旧的数据覆盖更新的数据，无论响应的顺序如何。
- 通过渲染最近的 `errorElement` （就像从 `<Link>` 或 `<Form>` 进行正常导航一样），处理未捕获的错误。
- 如果您的操作/加载程序返回重定向（就像从 `<Link>` 或 `<Form>` 进行正常导航一样），将重定向应用程序。

## `fetcher.state`

您可以使用 `fetcher.state` 了解获取器的状态。它将是以下之一：

- **idle** - 没有任何内容被获取。
- **submitting**- 由于使用POST、PUT、PATCH或DELETE提交获取器提交而调用路由操作
- **loading** - 获取器正在调用加载程序（从 `fetcher.load` ）或在单独提交或 `useRevalidator` 调用后重新验证

## `fetcher.Form`

就像 `<Form>` 一样，只是它不会导致导航。（您会在JSX中使用点...我们希望！）

```jsx
function SomeComponent() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/some/route">
      <input type="text" />
    </fetcher.Form>
  );
}
```

## `fetcher.load()`

从路由加载程序加载数据。

```jsx
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/some/route");
    }
  }, [fetcher]);

  return <div>{fetcher.data || "Loading..."}</div>;
}
```

尽管URL可能匹配多个嵌套路由，但 `fetcher.load()` 调用仅在叶匹配（或[索引路由](https://reactrouter.com/en/main/guides/index-search-param)的父级）上调用加载程序。

如果您发现自己在单击处理程序中调用此函数，您可以使用 `<fetcher.Form>` 来简化代码。

> 页面上任何活动的 `fetcher.load` 调用都将作为重新验证的一部分重新执行（在导航提交、另一个获取器提交或 `useRevalidator()` 调用后）。
>

## `fetcher.submit()`

`<fetcher.Form>` 的命令版本。如果用户交互应该启动获取，则应使用 `<fetcher.Form>` 。但是，如果您，程序员正在启动获取（而不是响应用户单击按钮等），则使用此函数。

例如，您可能希望在一定的空闲时间后注销用户：

```jsx
import { useFetcher } from "react-router-dom";
import { useFakeUserIsIdle } from "./fake/hooks";

export function useIdleLogout() {
  const fetcher = useFetcher();
  const userIsIdle = useFakeUserIsIdle();

  useEffect(() => {
    if (userIsIdle) {
      fetcher.submit(
        { idle: true },
        { method: "post", action: "/logout" }
      );
    }
  }, [userIsIdle]);
}
```

如果要提交到索引路由，请使用[`?index`参数](https://reactrouter.com/en/main/guides/index-search-param)。

如果您发现自己在单击处理程序中调用此函数，您可以使用 `<fetcher.Form>` 来简化代码。

## `fetcher.data`

从加载器或操作返回的数据存储在此处。一旦设置了数据，即使重新加载和重新提交，它也会在获取器上持久存在。

```jsx
function ProductDetails({ product }) {
  const fetcher = useFetcher();

  return (
    <details
      onToggle={(event) => {
        if (
          event.currentTarget.open &&
          fetcher.state === "idle" &&
          !fetcher.data
        ) {
          fetcher.load(`/product/${product.id}/details`);
        }
      }}
    >
      <summary>{product.name}</summary>
      {fetcher.data ? (
        <div>{fetcher.data}</div>
      ) : (
        <div>Loading product details...</div>
      )}
    </details>
  );
}
```

## `fetcher.formData`

使用 `<fetcher.Form>` 或 `fetcher.submit()` 时，表单数据可用于构建乐观的UI。

```jsx
function TaskCheckbox({ task }) {
  let fetcher = useFetcher();

  // while data is in flight, use that to immediately render
  // the state you expect the task to be in when the form
  // submission completes, instead of waiting for the
  // network to respond. When the network responds, the
  // formData will no longer be available and the UI will
  // use the value in `task.status` from the revalidation
  let status =
    fetcher.formData?.get("status") || task.status;

  let isComplete = status === "complete";

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="status"
        value={isComplete ? "incomplete" : "complete"}
      >
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </fetcher.Form>
  );
}
```

## `fetcher.formAction`

告诉您表单提交的操作URL。

```jsx
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
```

## `fetcher.formMethod`

告诉您提交表单的方法：get、post、put、patch或delete。

```jsx
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
```