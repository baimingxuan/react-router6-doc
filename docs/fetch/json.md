# `json`

快捷方式：

```javascript
new Response(JSON.stringify(someValue), {
  headers: {
    "Content-Type": "application/json; utf-8",
  },
});
```

通常用于装载机：

```javascript
import { json } from "react-router-dom";

const loader = async () => {
  const data = getSomeData();
  return json(data);
};
```

也可以看看：

- [从装载机返回响应](https://reactrouter.com/en/main/route/loader#returning-responses)