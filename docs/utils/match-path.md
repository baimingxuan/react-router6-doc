# `matchPath`

类型声明

```ts
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

`matchPath` 将路由路径模式与 URL 路径名进行匹配，并返回匹配信息。当您需要手动运行路由器的匹配算法来确定路由路径是否匹配时，这个功能就非常有用。如果模式与给定路径名不匹配，则返回`null`。

[`useMatch`钩子](https://baimingxuan.github.io/react-router6-doc/hooks/use-match)内部使用此函数来匹配相对于当前位置的路径。