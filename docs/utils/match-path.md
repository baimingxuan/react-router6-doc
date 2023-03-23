# `matchPath`

类型声明

```tsx
declare function matchPath<
  ParamKey extends string = string
>(
  pattern: PathPattern | string,
  pathname: string
): PathMatch<ParamKey> | null;

interface PathMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pattern: PathPattern;
}

interface PathPattern {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
}
```

`matchPath` 将路由路径模式与 URL 路径名进行匹配，并返回有关匹配的信息。每当您需要手动运行路由器的匹配算法以确定路由路径是否匹配时，这非常有用。如果模式不匹配给定的路径名，则返回 `null` 。

[`useMatch`钩子](https://reactrouter.com/en/main/hooks/use-match)在内部使用此函数来匹配相对于当前位置的路由路径。