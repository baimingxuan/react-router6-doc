`useHref`

类型声明

```tsx
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```

`useHref`钩子返回一个 URL，可用于链接到给定的 ``` `to` ``` 位置，即使在 React Router 之外也可以。

> **提示：**
>
> 您可能会对查看 `react-router-dom` 中 `<Link>` 组件的源代码感兴趣，以了解它如何在内部使用 `useHref` 来确定自己的 `href` 值。