# `redirect`

因为您可以在加载程序和操作中返回或抛出响应，所以您可以使用`redirect`重定向到另一个路由。

```javascript
import { redirect } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
};
```

这实际上只是一个捷径：

```javascript
new Response("", {
  status: 302,
  headers: {
    Location: someUrl,
  },
});
```

当重定向响应数据时，建议`redirect`在加载程序和操作中使用，而不是在您的组件中使用。`useNavigate`

也可以看看：

- [从装载机返回响应](https://reactrouter.com/en/main/route/loader#returning-responses)

## 类型声明

```javascript
type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response;
```

## `url`

要重定向到的 URL。

```javascript
redirect("/login");
```

## `init`

要在响应中使用的[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)选项。