#  使用 FormData

> TODO：这个文档是一个存根

一个常见的技巧是将整个 formData 变成一个对象[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)：

```javascript
const data = Object.fromEntries(await request.formData());
data.songTitle;
data.lyrics;
```