# `<Link>`

> NOTE
>
> 这是`<Link>` 的 Web 版。有关 React Native 版本，[请访问此处](../components/link-native)。

类型声明

```ts
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > {
  to: To;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  unstable_viewTransition?: boolean;
}

type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

 `<Link>` 是一种元素，用户可以通过点击或轻点它来导航到另一个页面。在 `react-router-dom` 中， `<Link>` 会渲染一个可访问的 `<a>` 元素，该元素带有一个真正的 `href` ，指向它所链接的资源。这意味着，右键单击 `<Link>` 等操作都能如您所愿。您可以使用 `<Link reloadDocument>` 跳过客户端路由，让浏览器正常处理转换（就像 `<a href>` 一样）。

```jsx
import * as React from "react";
import { Link } from "react-router-dom";

function UsersIndexPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

相对 `<Link to>` 值（不以 `/` 开头）是相对于父路由解析的，这意味着它建立在渲染该 `<Link>` 的路由所匹配的 URL 路径之上。它可能包含 `..` ，以链接到层级更高的路由。在这种情况下， `..` 的工作原理与命令行函数 `cd` 完全相同；每 `..` 删除父路径中的一段。

> 当当前 URL 以 `/` 结尾时，带有 `..` 的 `<Link to>` 与普通 `<a href>` 的行为不同。 `<Link to>` 会忽略尾部斜线，并为每个 `..` 删除一个 URL 段。但是，当当前 URL 以 `/` 结尾时， `<a href>` 值处理 `..` 的方式与其不同。

> NOTE
>
> 请参阅 `useResolvedPath` 文档中的 [Splat Paths](../hooks/use-resolved-path#splat-paths) 部分，了解 `future.v7_relativeSplatPath` future 标志在 `splat` 路由中相对 `<Link to> `的行为。

## `relative`

默认情况下，链接是相对于路由层次结构（ `relative="route"` ）而言的，因此 `..` 将从当前上下文路由向上移动一级 `Route` 。有时，您可能会发现匹配的 URL 模式没有嵌套的意义，而您更希望使用当前上下文路由路径的相对路径路由。您可以通过 `relative="path"` 选择这种行为：

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
  // in the current contextual route path, instead of one level in the Route
  // hierarchy
  return (
    <Link to=".." relative="path">
      Cancel
    </Link>
  );
}
```

## `preventScrollReset`

如果使用的是[`<ScrollRestoration>`](../components/scroll-restoration)，则可以防止在点击链接时将滚动位置重置到窗口顶部。

```jsx
<Link to="?tab=one" preventScrollReset={true} />
```

这并不会阻止用户使用后退/前进按钮回到该位置时恢复滚动位置，而只是防止用户点击链接时重置滚动位置。

举例来说，如果一个标签列表操作的URL 搜索参数不在页面顶部，就可能需要这种行为。你不会希望滚动位置跳到顶部，因为这可能会将切换的内容滚出视口！

```
      ┌─────────────────────────┐
      │                         ├──┐
      │                         │  │
      │                         │  │ scrolled
      │                         │  │ out of view
      │                         │  │
      │                         │ ◄┘
    ┌─┴─────────────────────────┴─┐
    │                             ├─┐
    │                             │ │ viewport
    │   ┌─────────────────────┐   │ │
    │   │  tab   tab   tab    │   │ │
    │   ├─────────────────────┤   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   │ content             │   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   └─────────────────────┘   │ │
    │                             │◄┘
    └─────────────────────────────┘
```

## `replace`

如果您希望通过[`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) 替换历史堆栈中的当前条目，而不是默认使用[`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)，则可以使用 `replace` 属性。

## `state`

`state` 属性可用于为存储在[历史状态](https://developer.mozilla.org/en-US/docs/Web/API/History/state)中的新位置设置一个有状态的值。随后可通过 `useLocation()` 访问该值。

```jsx
<Link to="new-path" state={{ some: "value" }} />
```

您可以在 "新路径 "路由上访问该状态值：

```jsx
let { state } = useLocation();
```

## `reloadDocument`

`reloadDocument` 属性可用于跳过客户端路由，让浏览器正常处理转换（如同 `<a href>` ）。

## `unstable_viewTransition`

`unstable_viewTransition` 属性通过将最终状态更新封装在 `document.startViewTransition()` 中，启用了该导航的[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)：

```jsx
<Link to={to} unstable_viewTransition>
  Click me
</Link>
```

如果需要为该视图转换应用特定样式，还需要利用[`unstable_useViewTransitionState()`](../hooks//use-view-transition-state) 钩子（或查看 [NavLink](../components/nav-link) 中的 `transitioning` 类和 `isTransitioning` 渲染属性）：

```jsx
function ImageLink(to) {
  const isTransitioning =
    unstable_useViewTransitionState(to);
  return (
    <Link to={to} unstable_viewTransition>
      <p
        style={{
          viewTransitionName: isTransitioning
            ? "image-title"
            : "",
        }}
      >
        Image Number {idx}
      </p>
      <img
        src={src}
        alt={`Img ${idx}`}
        style={{
          viewTransitionName: isTransitioning
            ? "image-expand"
            : "",
        }}
      />
    </Link>
  );
}
```

> IMPORTANT
>
> `unstable_viewTransition` 仅在使用数据路由器时有效，请参阅 ["选择路由"](../routers/picking-a-router)。

> IMPORTANT
>
> 请注意，此应用程序接口标记为不稳定状态，可能会在未发布重大版本时发生破坏性更改。