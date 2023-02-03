# `matchRoutes`

类型声明

```javascript
declare function matchRoutes(
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename?: string
): RouteMatch[] | null;

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  route: RouteObject;
}
```

`matchRoutes`针对给定的一组路由运行路由匹配算法，[`location`](https://reactrouter.com/en/main/utils/location)以查看哪些路由（如果有）匹配。如果找到匹配项，`RouteMatch`则返回一个对象数组，每个匹配的路由对应一个对象。

这是 React Router 匹配算法的核心。它由[组件](https://reactrouter.com/en/main/components/routes)[`useRoutes`](https://reactrouter.com/en/main/hooks/use-routes)在内部使用，以确定哪些路由与当前位置匹配。在您想要手动匹配一组路由的某些情况下，它也很有用。[``](https://reactrouter.com/en/main/components/routes)