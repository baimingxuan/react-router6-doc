# `useAsyncValue`

从最近的 `<Await>` 父组件返回已解析的数据。

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

更多信息，请参阅[延迟数据指南](https://baimingxuan.github.io/react-router6-doc/guides/deferred)和[`<Await>`](https://baimingxuan.github.io/react-router6-doc/components/await)文档。