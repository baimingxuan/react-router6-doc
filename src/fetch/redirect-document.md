# `redirectDocument`

这是[`redirect`](../fetch/redirect) 的一个小封装，它将触发文档级重定向到新位置，而不是客户端导航。

当您的 React Router 应用程序与同一域名上的另一个应用程序相邻，并且需要通过 `window.location` 而不是 React Router 导航从 React Router 应用程序重定向到另一个应用程序时，这一点最为有用：

```jsx
import { redirectDocument } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirectDocument("/otherapp/login");
  }
  return null;
};
```

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
redirectDocument("/otherapp/login");
```

## `init`

要在响应中使用的[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)选项。