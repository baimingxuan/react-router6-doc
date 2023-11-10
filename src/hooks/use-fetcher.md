# `useFetcher`

在 HTML/HTTP 中，数据突变和加载是通过导航来模拟的： `<a href>` 和 `<form action>` 。两者都会在浏览器中引起导航。与 React Router 对应的是 `<Link>` 和 `<Form>` 。

但有时您需要在导航之外调用 [`loader`](../route/loader) ，或者调用 [`action`](../route/action)（并获取页面上的数据以重新验证），而无需更改 URL。或者您需要同时进行多个突变。

与服务器的许多交互都不是导航事件。此钩子可让你在不导航的情况下将用户界面插入操作和加载器。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅[“选择路由”](../routers/picking-a-router)。

这在需要时非常有用：

- 获取与用户界面路由（弹出窗口、动态表单等）无关的数据
- 无需导航即可将数据提交至操作（共享组件，如即时通讯注册）
- 在一个列表中处理多个并发提交（典型的 "待办事项应用程序 "列表，您可以点击多个按钮，所有按钮都应同时待处理）
- 无限滚动容器
- 以及更多！

如果您正在构建一个高度交互、"类似应用程序 "的用户界面，那么您将经常 `useFetcher` 。

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
  fetcher.json;
  fetcher.text;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // render a form that doesn't cause navigation
  return <fetcher.Form />;
}
```

`Fetchers`有很多内置行为：

- 自动处理获取中断时的取消操作
- 使用 POST、PUT、PATCH、DELETE 提交时，首先调用操作
  - 操作完成后，页面上的数据会重新验证，以捕捉可能发生的任何变化，从而自动保持用户界面与服务器状态同步
- 当多个`fetchers`同时运行时，它会...
  - 在每次登陆时提交最新的可用数据
  - 确保无论响应返回的顺序如何，都不会有陈旧的负载覆盖较新的数据
- 通过渲染最近的 `errorElement` 来处理未捕获的错误（就像从 `<Link>` 或 `<Form>` 进行正常导航一样）。
- 如果调用的操作/加载器返回重定向，应用程序将重定向（就像从 `<Link>` 或 `<Form>` 进行普通导航一样）。

##  选项

### `key`

默认情况下， `useFetcher` 会生成一个唯一的`fetcher`，该`fetcher`的作用域为该组件（不过，在运行过程中，该`fetcher`可能会在 [`useFetchers()`](../hooks/use-fetchers) 中查找）。如果你想用自己的 `key` 来识别一个 fetcher，以便从应用程序的其他地方访问它，可以使用 `key` 选项来实现：

```jsx
function AddToBagButton() {
  const fetcher = useFetcher({ key: "add-to-bag" });
  return <fetcher.Form method="post">...</fetcher.Form>;
}

// Then, up in the header...
function CartCount({ count }) {
  const fetcher = useFetcher({ key: "add-to-bag" });
  const inFlightCount = Number(
    fetcher.formData?.get("quantity") || 0
  );
  const optimisticCount = count + inFlightCount;
  return (
    <>
      <BagIcon />
      <span>{optimisticCount}</span>
    </>
  );
}
```

##  组件

### `fetcher.Form`

就像 `<Form>` 一样，只是它不会导致导航。(你会克服 JSX 中的圆点......我们希望！）。

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

## 方法

### `fetcher.load()`

从路由`loader`中加载数据。

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

虽然一个 URL 可能匹配多个嵌套路由，但 `fetcher.load()` 调用只会调用叶匹配（或[索引路](../guides/index-search-param)由的父路由）上的`loader`。

如果您发现自己在点击处理程序中调用此函数，您可以使用 `<fetcher.Form>` 来简化代码。

> NOTE
>
> 为重新验证的一部分，页面上激活的任何 `fetcher.load` 调用都将重新执行（在导航提交、另一个`fetcher`提交或 `useRevalidator()` 调用之后）。

## `fetcher.submit()`

`<fetcher.Form>` 的命令式版本。如果是由用户交互启动获取，则应使用 `<fetcher.Form>` 。但如果是由程序员启动获取（而不是响应用户点击按钮等），则应使用此函数。

例如，您可能希望在闲置一定时间后注销用户：

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

`fetcher.submit` 是 [`useSubmit`](../hooks/use-submit)调用 fetcher 实例的包装器，因此也接受与`useSubmit`相同的选项。

如果要提交索引路由，请使用[`?index` 参数](../guides/index-search-param)。

如果您发现自己在点击处理程序中调用此函数，您可以使用 `<fetcher.Form>` 来简化代码。

## 属性

### `fetcher.state`

您可以通过 `fetcher.state` 了解 fetcher 的状态。它将是:

- **idle** - 没有获取任何信息。
- **submitting** - 由于使用 POST、PUT、PATCH 或 DELETE 提交了取件，路由操作被调用
- **loading** - fetcher 正在调用`loader`（来自 `fetcher.load` ），或在单独提交或调用 `useRevalidator` 后正在重新验证

### `fetcher.data`

加载器或操作返回的数据存储在这里。数据一旦设置完毕，即使重新加载和重新提交，也会在获取器上持续存在。

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

### `fetcher.formData`

当使用 `<fetcher.Form>` 或 `fetcher.submit()` 时，表单数据可用于构建优化的用户界面。

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
        value={isComplete ? "complete" : "incomplete"}
      >
        {isComplete ? "Mark Complete" : "Mark Incomplete"}
      </button>
    </fetcher.Form>
  );
}
```

### `fetcher.json`

使用 `fetcher.submit(data, { formEncType: "application/json" })` 时，提交的 JSON 可通过 `fetcher.json` 获取。

### `fetcher.text`

使用 `fetcher.submit(data, { formEncType: "text/plain" })` 时，提交的文本可通过 `fetcher.text` 获取。

### `fetcher.formAction`

告诉您提交表单的操作`url`。

```jsx
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
```

### `fetcher.formMethod`

告诉您提交表单的方法：get、post、put、patch 或 delete。

```jsx
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
```

> IMPORTANT
>
> `fetcher.formMethod` 字段为小写，没有 `future.v7_normalizeFormMethod` [Future Flag](../guides/api-development-strategy)。为了与 `fetch()` 在 v7 中的行为保持一致，我们正在将其规范化为大写，因此请升级 React Router v6 应用程序以采用大写 HTTP 方法。

