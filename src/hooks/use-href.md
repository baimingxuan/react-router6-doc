# `useHref`

类型声明

```ts
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```

`useHref` 钩子会返回一个 URL，可用于链接到给定的 `to` 位置，即使在 React Router 之外也是如此。

> **NOTE**
>
> 您可能有兴趣看看 `react-router-dom` 中 `<Link>` 组件的源代码，看看它是如何在内部使用 `useHref` 来确定自己的 `href` 值的。

> **NOTE**
>
> 请参阅 `useResolvedPath` 文档中的 [Splat Paths](../hooks/use-resolved-path#splat-paths) 部分，了解 `future.v7_relativeSplatPath` future 标志在 `splat` 路由中相对 `useHref()` 的行为。