# `json`

快捷方式：

```jsx
new Response(JSON.stringify(someValue), {
  headers: {
    "Content-Type": "application/json; utf-8",
  },
});
```

通常用于加载器：

```jsx
import { json } from "react-router-dom";

const loader = async () => {
  const data = getSomeData();
  return json(data);
};
```

也可以看看：

- [从加载器返回响应](https://reactrouter.com/en/main/route/loader#returning-responses)