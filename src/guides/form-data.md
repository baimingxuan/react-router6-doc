#  使用 FormData

> NOTE
>
> TODO：本文档为存根

常见的技巧是使用[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)将整个 formData 转换为对象：

```jsx
const data = Object.fromEntries(await request.formData());
data.songTitle;
data.lyrics;
```

