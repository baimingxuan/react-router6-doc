# `<Link>`

> 这是`<Link>` 的Web版。如需 React Native 版本，[请前往此处](https://reactrouter.com/en/main/components/link-native)。
>

类型声明

```tsx
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > {
  replace?: boolean;
  state?: any;
  to: To;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
}

type To = string | Partial<Path>;
```

 `<Link>` 是一个元素，让用户通过点击或轻触它来导航到另一个页面。在 `react-router-dom` 中， `<Link>` 渲染一个可访问的 `<a>` 元素，具有指向其链接资源的实际 `href` 。这意味着像右键单击 `<Link>` 这样的事情会按照您的期望工作。您可以使用 `<Link reloadDocument>` 跳过客户端路由，让浏览器正常处理过渡（就像它是个 `<a href>` 一样）。

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

相对 `<Link to>` 值（不以 `/` 开头）相对于父路由解析，这意味着它建立在由呈现该 `<Link>` 的路由匹配的 URL 路径之上。它可能包含 `..` 来链接到更高层次的路由。在这些情况下， `..` 的工作方式与命令行 `cd` 函数完全相同；每个 `..` 删除一个父路径段。

> 当当前 URL 以 `/` 结尾时，具有 `..` 的 `<Link to>` 与普通 `<a href>` 的行为不同。 `<Link to>` 忽略尾随斜杠，并为每个 `..` 删除一个 URL 段。但是，当当前 URL 以 `/` 结尾时， `<a href>` 值处理 `..` 的方式与其不同。

## `relative`

默认情况下，链接相对于路由层次结构，因此 `..` 将上升一个 `Route` 级别。偶尔，您可能会发现您有匹配的 URL 模式，这些模式不适合嵌套，并且您更喜欢使用相对路径路由。您可以使用 `relative` 选择此行为：

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
  return (
    <Link to=".." relative="path">
      Cancel
    </Link>
  );
}
```

## `preventScrollReset`

如果您正在使用[`<ScrollRestoration>`](https://reactrouter.com/en/main/components/scroll-restoration)，这将使您在链接被点击时防止滚动位置被重置到窗口顶部。

```jsx
<Link to="?tab=one" preventScrollReset={true} />
```

这并不会阻止用户使用浏览器的“后退/前进”按钮返回到该位置时恢复滚动位置，它只是防止用户点击链接时重置滚动位置。

一个需要这种行为的例子是一个操作URL搜索参数的选项卡列表，它们不在页面顶部。如果滚动位置跳到顶部，可能会将切换的内容滚出视口，这时你就不希望发生这种情况！

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

如果您想通过[`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)替换历史堆栈中的当前条目，而不是默认使用[`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)，则可以使用replace属性。

## `state`

state 属性可用于设置一个有状态值，该值存储在[history state](https://developer.mozilla.org/en-US/docs/Web/API/History/state)中，用于新位置。随后，可以通过 useLocation() 访问此值。

```jsx
<Link to="new-path" state={{ some: "value" }} />
```

您可以在“new-path”路由上访问此状态值：

```jsx
let { state } = useLocation();
```