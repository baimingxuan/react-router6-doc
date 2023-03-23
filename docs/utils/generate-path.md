# `generatePath`

类型声明

```tsx
declare function generatePath<Path extends string>(
  path: Path,
  params?: {
    [key in PathParams<Path>]: string;
  }
): string;
```

`generatePath` 将一组参数插入到路由路径字符串中，其中包含 `:id` 和 `*` 占位符。当您想要从路由路径中消除占位符以使其静态匹配而不是使用动态参数时，这可能非常有用。

```jsx
generatePath("/users/:id", { id: "42" }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```