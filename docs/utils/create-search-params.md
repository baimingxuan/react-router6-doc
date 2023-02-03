# `createSearchParams`

类型声明

```javascript
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```

`createSearchParams`是一个薄包装器，[`new URLSearchParams(init)`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)它增加了对使用具有数组值的对象的支持。这与在`useSearchParams`内部用于`URLSearchParams`从值创建对象的函数相同`URLSearchParamsInit`。