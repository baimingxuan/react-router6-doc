`<NavLink>`

`<NavLink>` 是一种特殊的 `<Link>` ，它知道自己是否处于 "激活"、"待定 "或 "过渡 "状态。这在几种不同的情况下都很有用：

- 在创建导航菜单（如面包屑或一组选项卡）时，您希望显示当前选择了哪个选项卡
- 它为屏幕阅读器等辅助技术提供了有用的背景信息
- 它提供了一个 "过渡 "值，可让您对[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)进行更精细的控制

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

默认情况下，当 `<NavLink>` 组件处于活动状态时，会为其添加一个 `active` 类，以便使用 CSS 对其进行样式设置。

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

`className` 属性的作用与普通 className 类似，但您也可以将函数传递给它，以便根据链接的活动和待定状态自定义应用的 classNames。

```jsx
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
>
  Messages
</NavLink>
```

## `style`

`style` 属性的工作方式与普通样式属性类似，但您也可以通过一个函数，根据链接的活动和待定状态自定义应用的样式。

```jsx
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
```

## `children`

您可以传递一个呈现属性作为子元素，以便根据活动和待定状态自定义 `<NavLink>` 的内容，这对更改内部元素的样式非常有用。

```jsx
<NavLink to="/tasks">
  {({ isActive, isPending }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

## `end`

`end` 属性更改了 `active` 和 `pending` 状态的匹配逻辑，使其只匹配到导航链接 `to` 路径的 "末端"。如果 URL 长于 `to` ，将不再被视为激活状态。

| Link                          | URL          | isActive |
| ----------------------------- | ------------ | -------- |
| `<NavLink to="/tasks" />`     | `/tasks`     | true     |
| `<NavLink to="/tasks" />`     | `/tasks/123` | true     |
| `<NavLink to="/tasks" end />` | `/tasks`     | true     |
| `<NavLink to="/tasks" end />` | `/tasks/123` | false    |

**关于根路由链接的说明**

`<NavLink to="/">` 是一个特例，因为每个 URL 都匹配`/` 。为了避免默认情况下每条路由都匹配，它实际上忽略了 `end`属性，只在根路由上匹配。 

## `caseSensitive`

添加 `caseSensitive` 属性后，匹配逻辑会发生变化，变得区分大小写。

| Link                                         | URL           | isActive |
| -------------------------------------------- | ------------- | -------- |
| `<NavLink to="/SpOnGe-bOB" />`               | `/sponge-bob` | true     |
| `<NavLink to="/SpOnGe-bOB" caseSensitive />` | `/sponge-bob` | false    |

## `aria-current`

当 `NavLink` 处于活动状态时，它会自动将 `<a aria-current="page">` 应用于底层锚标签。请参阅 MDN 上的 [aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)。

## `reloadDocument`

`reloadDocument` 属性可用于跳过客户端路由，让浏览器正常处理转换（如同 `<a href>` ）。

## `unstable_viewTransition`

`unstable_viewTransition` 这个道具通过将最终状态更新封装在 `document.startViewTransition()` 中来启用该导航的[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)。默认情况下，在过渡期间，一个 `transitioning` 类将被添加到 `<a>` 元素，你可以用它来定制视图过渡。

```jsx
a.transitioning p {
  view-transition-name: "image-title";
}

a.transitioning img {
  view-transition-name: "image-expand";
}
```

```jsx
<NavLink to={to} unstable_viewTransition>
  <p>Image Number {idx}</p>
  <img src={src} alt={`Img ${idx}`} />
</NavLink>
```

您还可以使用 `className` / `style` 属性或传递给 `children` 的渲染属性，根据 `isTransitioning` 值进一步定制。

```jsx
<NavLink to={to} unstable_viewTransition>
  {({ isTransitioning }) => (
    <>
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
    </>
  )}
</NavLink>
```

> IMPORTANT
>
> 请注意，此 API 已被标记为不稳定版，在未发布重大版本之前，可能会出现一些破坏性更改。