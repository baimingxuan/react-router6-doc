# `createSearchParams`

类型声明

```tsx
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```

`createSearchParams` 是对[`new URLSearchParams(init)`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)的轻量级封装，增加了对使用对象作为数组值的支持。这是与 `useSearchParams` 内部使用的相同函数，用于从 `URLSearchParamsInit` 值创建 `URLSearchParams` 对象。