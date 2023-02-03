# `matchPath`

类型声明

```javascript
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

`matchPath`将路由路径模式与 URL 路径名进行匹配，并返回有关匹配的信息。当您需要手动运行路由器的匹配算法以确定路由路径是否匹配时，这很有用。`null`如果模式与给定的路径名不匹配，它将返回。

[`useMatch`钩子](https://reactrouter.com/en/main/hooks/use-match)在内部使用这个函数来匹配相对于当前位置的路由路径。