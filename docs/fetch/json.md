# `json`

快捷方式：

```jsx
new Response(JSON.stringify(someValue), {
  headers: {
    "Content-Type": "application/json; utf-8",
  },
});
```

通常用于`loader`：

```jsx
import { json } from "react-router-dom";

const loader = async () => {
  const data = getSomeData();
  return json(data);
};
```

另请参阅：

- [从`loader`返回响应](https://reactrouter.com/en/main/route/loader#returning-responses)