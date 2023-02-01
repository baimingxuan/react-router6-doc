# `useResolvedPath`

类型声明

```javascript
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;
```

此挂钩根据当前位置的路径名解析`pathname`给定`to`值中的位置。

这在从相对值构建链接时很有用。例如，检查内部[``](https://reactrouter.com/en/main/components/nav-link)调用的来源`useResolvedPath`以解析链接到的页面的完整路径名。

有关详细信息，请参阅[解析路径](https://reactrouter.com/en/main/utils/resolve-path)。