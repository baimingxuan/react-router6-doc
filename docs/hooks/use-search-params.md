# `useSearchParams`

> 这是 的网络版本`useSearchParams`。对于 React Native 版本，[请转到此处](https://reactrouter.com/en/main/hooks/use-search-params-rn)。

类型声明

```javascript
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

该`useSearchParams`钩子用于读取和修改当前位置的 URL 中的查询字符串。像 React 自己的[`useState`hook](https://reactjs.org/docs/hooks-reference.html#usestate)一样，`useSearchParams`返回一个包含两个值的数组：当前位置的[搜索参数](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)和一个可用于更新它们的函数。正如 React 的[`useState`hook](https://reactjs.org/docs/hooks-reference.html#usestate)一样，`setSearchParams`也支持[功能更新](https://reactjs.org/docs/hooks-reference.html#functional-updates)。因此，您可以提供一个接受`searchParams`并返回更新版本的函数。

```javascript
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

> 该`setSearchParams`功能与 类似[`navigate`](https://reactrouter.com/en/main/hooks/use-navigate)，但仅适用于 URL 的[搜索部分](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)。另请注意，第二个 arg to 与第二个 arg to`setSearchParams`的类型相同`navigate`。