# `defer`

该实用程序允许您通过传递承诺而不是已解析的值来延迟从加载程序返回的值。

```javascript
function loader() {
  let product = await getProduct();
  let reviews = getProductReviews();
  return defer({ product, reviews });
}
```

有关详细信息，请参阅[延期指南](https://reactrouter.com/en/main/guides/deferred)。