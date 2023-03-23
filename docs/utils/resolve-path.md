# `resolvePath`

类型声明

```tsx
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

`resolvePath` 将给定的 `To` 值解析为具有绝对 `pathname` 的实际 `Path` 对象。每当您需要知道相对 `To` 值的确切路径时，这非常有用。例如， `<Link>` 组件使用此函数来了解其指向的实际URL。

[`useResolvedPath`钩子](https://reactrouter.com/en/main/hooks/use-resolved-path)在内部使用`resolvePath`来解析路径名。如果`to`包含路径名，则会根据当前路由路径名解析它。否则，它将根据当前 URL  ( `location.pathname`) 解析。

