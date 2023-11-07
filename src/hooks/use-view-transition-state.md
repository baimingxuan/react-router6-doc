# `unstable_useViewTransitionState`

类型声明

```ts
declare function unstable_useViewTransitionState(
  to: To,
  opts: { relative?: "route" : "path" } = {}
): boolean;

type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

当指定位置有活动[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)时，此钩子会返回 `true` 。这可用于对元素应用更精细的样式，以进一步自定义视图转换。这要求通过 `Link` （或 `Form` , `navigate` 或 `submit` 调用）上的[ unstable_viewTransition prop ](https://baimingxuan.github.io/react-router6-doc/components/link#unstable_viewtransition)启用指定导航的视图转换。

考虑点击列表中的图片，将其扩展为目标页面上的主图片：

```jsx
function NavImage({ src, alt, id }) {
  let to = `/images/${idx}`;
  let vt = unstable_useViewTransitionState(href);
  return (
    <Link to={to} unstable_viewTransition>
      <img
        src={src}
        alt={alt}
        style={{
          viewTransitionName: vt ? "image-expand" : "",
        }}
      />
    </Link>
  );
}
```