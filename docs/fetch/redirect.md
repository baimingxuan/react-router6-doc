# `redirect`

因为您可以在加载器和操作中返回或抛出响应，所以您可以使用 `redirect` 重定向到另一个路由。

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

这只是一个快捷方式：

```jsx
new Response("", {
  status: 302,
  headers: {
    Location: someUrl,
  },
});
```

建议在加载器和操作中使用 `redirect` ，而不是在组件中使用 `useNavigate` ，当重定向是响应数据时。

也可以看看：

- [从加载器返回响应](https://reactrouter.com/en/main/route/loader#returning-responses)

## 类型声明

```tsx
type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response;
```

## `url`

要重定向到的 URL。

```jsx
redirect("/login");
```

## `init`

[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)选项在响应中使用。