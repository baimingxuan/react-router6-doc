# `useMatch`

类型声明

```tsx
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path
): PathMatch<ParamKey> | null;
```

相对于当前位置，返回有关给定路径的路由匹配数据。

查看[`matchPath`](https://reactrouter.com/en/main/utils/match-path)以获取更多信息。