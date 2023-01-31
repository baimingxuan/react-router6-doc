# `<Link>`

这是 的网络版本`<Link>`。对于 React Native 版本，[请转到此处](https://reactrouter.com/en/main/components/link-native)。

类型声明

```javascript
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

A`<Link>`是一个元素，它允许用户通过单击或点击它来导航到另一个页面。在`react-router-dom`中，a`<Link>`呈现一个可访问`<a>`元素，其中包含一个`href`指向它链接到的资源的 real。这意味着像`<Link>`您期望的那样右键单击作品。您可以使用`<Link reloadDocument>`跳过客户端路由并让浏览器正常处理转换（就好像它是一个`<a href>`）。

```javascript
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

相对`<Link to>`值（不以 开头`/`）相对于父路由解析，这意味着它建立在与呈现该路由的匹配的 URL 路径之上`<Link>`。它可能包含`..`链接到层次结构中更上层的路由。在这些情况下，`..`它的工作方式与命令行`cd`功能完全一样；每个`..`删除父路径的一段。

> `<Link to>`当当前`..`URL`<a href>`以`/`. `<Link to>`忽略结尾的斜杠，并为每个删除一个 URL 段`..`。但是，当当前 URL 以结尾与不以结尾时，`<a href>`值的处理方式不同。`..``/

## `relative`

默认情况下，链接是相对于路由层次结构的，因此`..`会上升`Route`一层。有时，您可能会发现匹配的 URL 模式没有嵌套的意义，并且您更愿意使用相对*路径*路由。您可以通过以下方式选择加入此行为`relative`：

```javascript
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

如果您使用[``](https://reactrouter.com/en/main/components/scroll-restoration)，这可以防止在单击链接时将滚动位置重置为窗口顶部。

```javascript
<Link to="?tab=one" preventScrollReset={true} />
```

这不会阻止当用户使用后退/前进按钮返回到该位置时恢复滚动位置，它只是阻止当用户单击链接时重置。

您可能需要此行为的一个示例是操作不在页面顶部的 url 搜索参数的选项卡列表。您不希望滚动位置跳到顶部，因为它可能会将切换的内容滚动到视口之外！

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

`replace`如果您想通过[`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)代替默认用法替换历史堆栈中的当前条目，则可以使用该属性[`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)。

## `state`

该`state`属性可用于为存储在[history state](https://developer.mozilla.org/en-US/docs/Web/API/History/state)中的新位置设置有状态值。随后可以通过 访问该值`useLocation()`。

```javascript
<Link to="new-path" state={{ some: "value" }} />
```

您可以在“新路径”路线上访问此状态值：

```javascript
let { state } = useLocation();
```