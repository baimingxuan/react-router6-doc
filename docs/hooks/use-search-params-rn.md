# `useSearchParams`（React Native）

> NOTE
>
> 这是 `useSearchParams` 的 React Native 版本。有关`Web`版本，[请点击此处](https://reactrouter.com/en/main/hooks/use-search-params)。

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

`useSearchParams` 钩子用于读取和修改当前位置 URL 中的查询字符串。与 React 自己的[`useState`钩子](https://reactjs.org/docs/hooks-reference.html#usestate)一样，`useSearchParams` 返回一个包含两个值的数组：当前位置的[搜索参数](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)和一个可用于更新这些参数的函数。与 React 的[`useState`钩子](https://reactjs.org/docs/hooks-reference.html#usestate)一样，`setSearchParams` 也支持功能更新。因此，您可以提供一个接收 `searchParams` 并返回更新版本的函数。

```jsx
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