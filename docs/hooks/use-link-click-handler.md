# `useLinkClickHandler`

类型声明

```tsx
declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
    options?: { relative?: RelativeRoutingType };
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;
```

当在 `react-router-dom` 中构建自定义 `<Link>` 时， `useLinkClickHandler` 钩子返回一个点击事件处理程序，用于导航。

```jsx
import {
  useHref,
  useLinkClickHandler,
} from "react-router-dom";

const StyledLink = styled("a", { color: "fuchsia" });

const Link = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    },
    ref
  ) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <StyledLink
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);
```