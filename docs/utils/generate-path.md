# `generatePath`

类型声明

```javascript
declare function generatePath<Path extends string>(
  path: Path,
  params?: {
    [key in PathParams<Path>]: string;
  }
): string;
```

`generatePath`将一组参数插入到带有`:id`和`*`占位符的路由路径字符串中。当您想从路由路径中消除占位符以便它静态匹配而不是使用动态参数时，这会很有用。

```javascript
generatePath("/users/:id", { id: "42" }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```