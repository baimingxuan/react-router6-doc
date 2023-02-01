# `useFetcher`

在 HTML/HTTP 中，数据突变和加载是通过导航建模的：`<a href>`和`<form action>`。两者都会导致浏览器中的导航。React Router 等价物是[``](https://reactrouter.com/en/main/components/link)和[``](https://reactrouter.com/en/main/components/form)。

但有时您想[`loader`](https://reactrouter.com/en/main/route/loader)在导航之外调用一个，或者[`action`](https://reactrouter.com/en/main/route/action)在不更改 URL 的情况下调用一个（并获取页面上的数据以重新验证）。或者您需要同时进行多个突变。

许多与服务器的交互不是导航事件。这个钩子可以让你在不导航的情况下将你的 UI 插入到你的操作和加载器中。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

当您需要：

- 获取与 UI 路由无关的数据（弹出窗口、动态表单等）
- 无需导航即可将数据提交给操作（共享组件，如时事通讯注册）
- 处理列表中的多个并发提交（典型的“待办事项应用程序”列表，您可以在其中单击多个按钮并且所有按钮都应同时挂起）
- 无限滚动容器
- 和更多！

如果你正在构建一个高度交互的、“类似应用程序”的用户界面，你会`useFetcher`经常这样做。

```javascript
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

Fetcher 有很多内置行为：

- 自动处理提取中断时的取消
- 使用POST、PUT、PATCH、DELETE提交时，先调用action
  - 操作完成后，页面上的数据将重新验证以捕获可能发生的任何变化，自动使您的 UI 与服务器状态保持同步
- 当多个 fetcher 同时运行时，它将
  - 在他们各自登陆时提交最新的可用数据
  - 确保没有陈旧的负载覆盖更新的数据，无论响应返回哪个顺序
- 通过呈现最近的`errorElement`（就像来自`<Link>`或的正常导航一样`<Form>`）处理未捕获的错误
- 如果您的操作/加载器被调用返回重定向（就像来自`<Link>`或的正常导航一样`<Form>`） ，将重定向应用程序

## `fetcher.state`

您可以使用 了解获取器的状态`fetcher.state`。它将是以下之一：

- **idle** - 什么都没有被获取。
- **提交**- 由于使用 POST、PUT、PATCH 或 DELETE 的提取器提交，正在调用路由操作
- **loading** - fetcher 正在调用加载器（来自 a `fetcher.load`）或在单独提交或`useRevalidator`调用后重新验证

## `fetcher.Form`

就像`<Form>`它不会引起导航一样。（你会克服 JSX 中的问题……我们希望！）

```javascript
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

从路由加载器加载数据。

```javascript
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

尽管 URL 可能匹配多个嵌套路由，但`fetcher.load()`调用只会在叶匹配项（或[索引路由](https://reactrouter.com/en/main/guides/index-search-param)的父级）上调用加载程序。

如果您发现自己在点击处理程序中调用此函数，您可能可以通过使用`<fetcher.Form>`来简化您的代码。

页面上任何`fetcher.load`激活的调用都将作为重新验证的一部分重新执行（在导航提交、另一个提取器提交或`useRevalidator()`调用之后）

## `fetcher.submit()`

的命令式版本`<fetcher.Form>`。如果用户交互应启动提取，则应使用`<fetcher.Form>`. 但是如果你，程序员正在启动获取（而不是响应用户点击按钮等），那么使用这个函数。

例如，您可能希望在一定空闲时间后注销用户：

```javascript
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

如果要提交到索引路由，请使用[`?index`param](https://reactrouter.com/en/main/guides/index-search-param)。

如果您发现自己在点击处理程序中调用此函数，您可能可以通过使用`<fetcher.Form>`来简化您的代码。

## `fetcher.data`

从加载程序或操作返回的数据存储在这里。设置数据后，即使重新加载和重新提交，它也会保留在提取器上。

```javascript
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

使用`<fetcher.Form>`or`fetcher.submit()`时，表单数据可用于构建乐观的 UI。

```javascript
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

告诉您表单提交到的操作 url。

```javascript
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
```

## `fetcher.formMethod`

告诉您提交表单的方法：get、post、put、patch 或 delete。

```javascript
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
```