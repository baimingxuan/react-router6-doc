# `useMatch`

类型声明

```ts
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path
): PathMatch<ParamKey> | null;
```

返回给定路径上的路由相对于当前位置的匹配数据。

更多信息，请参阅[`matchPath`](https://baimingxuan.github.io/react-router6-doc/utils/match-path)。