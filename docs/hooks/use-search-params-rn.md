# `useSearchParams`（React Native）

> 这是`useSearchParams`. 对于网络版本，[请转到此处](https://reactrouter.com/en/main/hooks/use-search-params)。

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
import { View, SearchForm, TextInput } from "react-native";
import { useSearchParams } from "react-router-native";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = React.useState(
    searchParams.get("query")
  );

  function handleSubmit() {
    setSearchParams({ query });
  }

  return (
    <View>
      <SearchForm onSubmit={handleSubmit}>
        <TextInput value={query} onChangeText={setQuery} />
      </SearchForm>
    </View>
  );
}
```