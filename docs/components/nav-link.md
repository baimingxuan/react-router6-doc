`<NavLink>`

 `<NavLink>` 是一种特殊的 `<Link>` ，它知道自己是否处于“活动”或“挂起”状态。在构建导航菜单（如面包屑导航或选项卡集合）时非常有用，可以显示当前选中的选项。它还为屏幕阅读器等辅助技术提供有用的上下文信息。

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>;
```

## 默认 `active` 类

默认情况下，当一个 `<NavLink>` 组件处于活动状态时，会添加一个 `active` 类，因此您可以使用 CSS 对其进行样式设置。

```jsx
<nav id="sidebar">
  <NavLink to="/messages" />
</nav>
```

```css
#sidebar a.active {
  color: red;
}
```

## `className`

`className` ” 属性的作用类似于普通的 className，但您还可以传递一个函数来自定义应用于链接的类名，基于链接的活动状态和挂起状态。

```jsx
<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>
```

## `style`

“ `style` ” 属性的作用类似于普通的样式属性，但您还可以传递一个函数来自定义应用的样式，基于链接的活动状态和挂起状态。

```jsx
<NavLink
  to="/messages"
  style={({ isActive, isPending }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
    };
  }}
>
  Messages
</NavLink>
```

## `children`

您可以将渲染属性作为子元素传递，以根据活动和挂起状态自定义 `<NavLink>` 的内容，这对于更改内部元素的样式非常有用。

```jsx
<NavLink to="/tasks">
  {({ isActive, isPending }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

## `end`

 `end` 属性更改了匹配逻辑，使得 `active` 和 `pending` 状态只匹配到 NavLink 的 `to` 路径的“结尾”。如果 URL 长度超过 `to` ，则不再被视为活动状态。

如果没有 end 属性，这个链接总是活动的，因为每个 URL 都匹配 `/` 。

```jsx
<NavLink to="/">Home</NavLink>
```

要将 URL “匹配到结尾” 的 `to` ，请使用 `end` ：

```jsx
<NavLink to="/" end>
  Home
</NavLink>
```

现在这个链接只在 `"/"` 处活动。这也适用于具有更多段的路径：

| Link                          | URL          | isActive |
| ----------------------------- | ------------ | -------- |
| `<NavLink to="/tasks" />`     | `/tasks`     | true     |
| `<NavLink to="/tasks" />`     | `/tasks/123` | true     |
| `<NavLink to="/tasks" end />` | `/tasks`     | true     |
| `<NavLink to="/tasks" end />` | `/tasks/123` | false    |

## `caseSensitive`

添加 `caseSensitive` 属性会改变匹配逻辑，使其区分大小写。

| Link                                         | URL           | isActive |
| -------------------------------------------- | ------------- | -------- |
| `<NavLink to="/SpOnGe-bOB" />`               | `/sponge-bob` | true     |
| `<NavLink to="/SpOnGe-bOB" caseSensitive />` | `/sponge-bob` | false    |

## `aria-current`

当 `NavLink` 处于活动状态时，它会自动应用于底层锚点标记 `<a aria-current="page">` 。请参阅 MDN 上的 [aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)。