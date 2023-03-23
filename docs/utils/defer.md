# `defer`

此实用程序允许您通过传递承诺而不是已解决的值来推迟从加载器返回的值。

```jsx
async function loader() {
  let product = await getProduct();
  let reviews = getProductReviews();
  return defer({ product, reviews });
}
```

请查看[延期指南](https://reactrouter.com/en/main/guides/deferred)以获取更多信息。