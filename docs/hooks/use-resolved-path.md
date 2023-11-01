# `useResolvedPath`

类型声明

```tsx
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;
```

此钩子根据当前位置的路径名解析给定 `to` 值中位置的 `pathname` 。

这在根据相对值建立链接时非常有用。例如，请查看 [`<NavLink>`](https://reactrouter.com/en/main/components/nav-link) 的源代码，它在内部调用 `useResolvedPath` 来解析所链接页面的完整路径名。

更多信息，请参阅 [resolvePath ](https://reactrouter.com/en/main/utils/resolve-path)。

