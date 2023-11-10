# `redirect`

由于可以在`loaders`和`actions`中返回或抛出响应，因此可以使用 `redirect` 重定向到另一个路由。

```jsx
import { redirect } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
};
```

这其实只是一个快捷方式：

```jsx
new Response("", {
  status: 302,
  headers: {
    Location: someUrl,
  },
});
```

当重定向是为了响应数据时，建议在加载器和操作中使用 `redirect` ，而不是在组件中使用 `useNavigate` 。

另请参阅：

- [从`loader`返回响应](../route/loader#returning-responses)

## 类型声明

```ts
type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response;
```

## `url`

重定向到的 URL。

```jsx
redirect("/login");
```

## `init`

要在响应中使用的[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)选项。