`useHref`

类型声明

```javascript
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```

该`useHref`钩子返回一个 URL，该 URL 可用于链接到给定`to`位置，甚至在 React Router 之外。

> **提示：**
>
> 您可能有兴趣查看`<Link>` 组件的源代码，`react-router-dom`了解它如何在`useHref`内部使用来确定其自身的`href`值。