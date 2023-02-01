# `useMatch`

类型声明

```javascript
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path
): PathMatch<ParamKey> | null;
```

返回关于给定路径相对于当前位置的路线的匹配数据。

有关[`matchPath`](https://reactrouter.com/en/main/utils/match-path)详细信息，请参阅。