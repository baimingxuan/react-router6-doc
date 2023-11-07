# `createSearchParams`

类型声明

```ts
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```

`createSearchParams` 是对[`new URLSearchParams(init)`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)的轻量级封装，增加了对使用具有数组值的对象的支持。该函数与  `useSearchParams` 内部使用的从 `URLSearchParamsInit` 值创建 `URLSearchParams` 对象的函数相同。