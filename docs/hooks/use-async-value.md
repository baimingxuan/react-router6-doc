# `useAsyncValue`

从最近的`<Await>`祖先组件返回已解析的数据。

```javascript
function ProductVariants() {
  const variants = useAsyncValue();
  return <div>{/* ... */}</div>;
}

// Await creates the context for the value
<Await resolve={somePromiseForProductVariants}>
  <ProductVariants />
</Await>;
```

有关更多信息，请参阅[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)和[``文档](https://reactrouter.com/en/main/components/await)。