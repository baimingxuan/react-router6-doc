# `resolvePath`

类型声明

```javascript
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

`resolvePath`将给定值解析为具有绝对值`To`的实际对象。当您需要知道相对值的确切路径时，这很有用。例如，组件使用此函数来了解它指向的实际 URL。`Path pathname To <Link>`

该[`useResolvedPath`挂钩](https://reactrouter.com/en/main/hooks/use-resolved-path)在内部用于`resolvePath`解析路径名。如果`to`包含路径名，则根据当前路由路径名进行解析。否则，它根据当前 URL ( `location.pathname`) 进行解析。

