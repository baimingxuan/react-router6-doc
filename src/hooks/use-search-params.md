# `useSearchParams`

> NOTE
>
> 这是 `useSearchParams` 的`Web`版。有关 React Native 版本，[请点击此处](../hooks/use-search-params-rn)。

类型声明

```ts
declare function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```

`useSearchParams` 钩子用于读取和修改当前位置 URL 中的查询字符串。与 React 自己的[`useState钩子`](https://legacy.reactjs.org/docs/hooks-reference.html#usestate)一样，`useSearchParams` 返回一个包含两个值的数组：当前位置的[搜索参数](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)和一个可用于更新这些参数的函数。与 React 的[`useState`钩子](https://legacy.reactjs.org/docs/hooks-reference.html#usestate)一样，`setSearchParams` 也支持[函数式更新](https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates)。因此，您可以提供一个接收 `searchParams` 并返回更新版本的函数。

```jsx
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </div>
  );
}
```

> NOTE
>
> `setSearchParams` 函数的工作原理与[`navigate`](../hooks/use-navigate)类似，但只针对URL的[搜索部分](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)。此外，请注意 `setSearchParams` 的第二个参数与 `navigate` 的第二个参数类型相同。