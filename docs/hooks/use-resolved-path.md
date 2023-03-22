# `useResolvedPath`

类型声明

```tsx
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;
```

这个钩子解析给定 `to` 值的位置的 `pathname` 相对于当前位置的路径名。

当从相对值构建链接时，这非常有用。例如，请查看调用 `useResolvedPath` 以内部解析链接页面的完整路径名的 [`<NavLink>`](https://reactrouter.com/en/main/components/nav-link) 的源代码。

有关更多信息，请参见[resolvePath](https://reactrouter.com/en/main/utils/resolve-path)。