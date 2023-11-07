# `resolvePath`

类型声明

```ts
declare function resolvePath(
  to: To,
  fromPathname?: string
): Path;

type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

`resolvePath` 将给定的 `To` 值解析为具有绝对 `pathname` 的实际 `Path` 对象。每当您需要知道相对 `To` 值的确切路径时，这个功能就非常有用。例如， `<Link>` 使用该函数来了解其指向的实际 URL。

[`useResolvedPath`钩子](https://baimingxuan.github.io/react-router6-doc/hooks/use-resolved-path)内部使用 `resolvePath` 解析路径名。如果 `to` 包含路径名，则根据当前路由路径名进行解析。否则，将根据当前 URL ( `location.pathname` ) 进行解析。

