# `useAsyncValue`

从最近的 `<Await>` 祖先组件返回已解析的数据。

```jsx
function ProductVariants() {
  const variants = useAsyncValue();
  return <div>{/* ... */}</div>;
}

// Await creates the context for the value
<Await resolve={somePromiseForProductVariants}>
  <ProductVariants />
</Await>;
```

请查看[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)和[`<Await>`](https://reactrouter.com/en/main/components/await)文档以获取更多信息。