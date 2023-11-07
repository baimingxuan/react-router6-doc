# `defer`

该实用程序允许您通过传递承诺而不是解析值来延迟从`loader`返回的值。

```jsx
async function loader() {
  let product = await getProduct();
  let reviews = getProductReviews();
  return defer({ product, reviews });
}
```

更多信息，请参阅[延迟指南](https://baimingxuan.github.io/react-router6-doc/guides/deferred)。