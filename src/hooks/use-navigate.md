# `useNavigate`

类型声明

```ts
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  unstable_flushSync?: boolean;
  unstable_viewTransition?: boolean;
}

type RelativeRoutingType = "route" | "path";
```

> IMPORTANT
>
> 通常在 [`loaders`](../route/loader) 和[`actions`](../route/action)中使用[`redirect`](../fetch/redirect)比使用此钩子更好。

`useNavigate` 钩子会返回一个函数，让您以编程方式导航，例如在效果中导航：

```jsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

`navigate` 函数有两个签名：

- 或者传递一个 `To` 值（与 `<Link to>` 类型相同），并可选择第二个 `options` 参数（与 [`Link`](../components/link)可以传递的属性类似），或者
- 在历史堆栈中传递您想去的 delta 值。例如， `navigate(-1)` 相当于点击后退按钮

> NOTE
>
> 请参阅 `useResolvedPath` 文档中的 [Splat Paths](../hooks/use-resolved-path#splat-paths) 部分，了解 `future.v7_relativeSplatPath` future 标志在 `splat` 路由中相对 `useNavigate()` 的行为。

## `options.replace`

指定 `replace: true` 会导致导航替换历史堆栈中的当前条目，而不是添加新条目。

## `options.state`

您可以在[历史状态](https://developer.mozilla.org/en-US/docs/Web/API/History/state)中存储一个可选的 `state` 值，然后通过[`useLocation`](../hooks/use-location)访问目的地路由。例如:

```jsx
navigate("/new-route", { state: { key: "value" } });
```

## `options.preventScrollReset`

使用[ `<ScrollRestoration>`](../components/scroll-restoration) 组件时，可以通过以下方式禁用重置滚动到页面顶部的功能 `options.preventScrollReset`

## `options.relative`

默认情况下，导航是相对于路由层次结构（ `relative: "route"` ）而言的，因此 `..` 将向上一级 `Route` 。有时，您可能会发现匹配的 URL 模式没有嵌套的意义，而您更希望使用相对路径路由。您可以通过 `relative: "path"` 选择这种行为：

```jsx
// Contact and EditContact do not share additional UI layout
<Route path="/" element={<Layout />}>
  <Route path="contacts/:id" element={<Contact />} />
  <Route
    path="contacts/:id/edit"
    element={<EditContact />}
  />
</Route>;

function EditContact() {
  // Since Contact is not a parent of EditContact we need to go up one level
  // in the path, instead of one level in the Route hierarchy
  navigate("..", { relative: "path" });
}
```

## `options.unstable_flushSync`

`unstable_flushSync` 选项告诉 React Router DOM 将此导航的初始状态更新封装在 [`ReactDOM.flushSync`](https://react.dev/reference/react-dom/flushSync) 调用中，而不是默认的 [`React.startTransition`](https://react.dev/reference/react/startTransition) 中。这样就可以在更新刷新到 DOM 后立即执行同步 DOM 操作。

> IMPORTANT
>
> `unstable_flushSync` 仅在使用数据路由器时有效，请参阅 [选择路由](../routers/picking-a-router)。

> IMPORTANT
>
> 请注意，该应用程序接口标记为不稳定状态，在未发布重大版本之前可能会出现破坏性更新。

## `options.unstable_viewTransition`

`unstable_viewTransition` 选项通过在 `document.startViewTransition()` 中封装最终状态更新，为该导航启用[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)。如果需要为该视图转换应用特定样式，还需要利用[ `unstable_useViewTransitionState()`](../hooks/use-view-transition-state)。

> IMPORTANT
>
> `unstable_viewTransition` 仅在使用数据路由时有效，请参阅 [选择路由](../routers/picking-a-router)。

> IMPORTANT
>
> 请注意，此应用程序接口标记为不稳定状态，在未发布重大版本之前可能会出现破坏性更新。