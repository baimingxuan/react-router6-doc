`<NavLink>`

类型声明

```javascript
declare function NavLink(
  props: NavLinkProps
): React.ReactElement;

interface NavLinkProps
  extends Omit<
    LinkProps,
    "className" | "style" | "children"
  > {
  caseSensitive?: boolean;
  children?:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode);
  className?:
    | string
    | ((props: {
        isActive: boolean;
      }) => string | undefined);
  end?: boolean;
  style?:
    | React.CSSProperties
    | ((props: {
        isActive: boolean;
      }) => React.CSSProperties);
}
```

`<NavLink>`是一种特殊的，[``](https://reactrouter.com/en/main/components/link)它知道它是否是“活跃的”。这在构建导航菜单（例如面包屑或一组选项卡）时非常有用，您希望在其中显示当前选中的选项卡。它还为屏幕阅读器等辅助技术提供有用的上下文。

默认情况下，类会在组件处于活动状态时`active`添加到组件中。`<NavLink>`这为大多数从 v5 升级的用户提供了相同的简单样式机制。一个不同之`v6.0.0-beta.3`处在于`activeClassName`和`activeStyle`已从`NavLinkProps`. 相反，您可以将一个函数传递给其中一个，`style`或者`className`允许您根据组件的活动状态自定义内联样式或类字符串。您还可以将函数作为子项传递，以根据`<NavLink>`组件的活动状态自定义组件的内容，这对于更改内部元素的样式特别有用。

```javascript
import * as React from "react";
import { NavLink } from "react-router-dom";

function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="messages"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="tasks">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeClassName : undefined
                }
              >
                Tasks
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

如果您更喜欢 v5 API，您可以创建自己`<NavLink />`的包装器组件：

```javascript
import * as React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";

const NavLink = React.forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);
```

如果`end`使用该道具，它将确保该组件在其后代路径匹配时不会被匹配为“活动”。例如，要呈现仅在网站根目录而不是任何其他 URL 处处于活动状态的链接，您可以使用：

```javascript
<NavLink to="/" end>
  Home
</NavLink>
```