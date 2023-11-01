# `generatePath`

类型声明

```ts
declare function generatePath<Path extends string>(
  path: Path,
  params?: {
    [key in PathParams<Path>]: string;
  }
): string;
```

`generatePath` 将一组参数插值为路由路径字符串，其中包含 `:id` 和 `*` 占位符。当你想消除路由路径中的占位符，使其静态匹配而不是使用动态参数时，这种方法非常有用。

```jsx
generatePath("/users/:id", { id: "42" }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```