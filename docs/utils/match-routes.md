# `matchRoutes`

类型声明

```tsx
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

`matchRoutes` 运行路由匹配算法，针对给定的[`location`](https://reactrouter.com/en/main/utils/location)来查看哪些路由（如果有）匹配。如果找到匹配项，则返回一个 `RouteMatch` 对象数组，每个对象对应一个匹配的路由。

这是 React Router 匹配算法的核心。它被[`useRoutes`](https://reactrouter.com/en/main/hooks/use-routes)和[`<Routes>`组件](https://reactrouter.com/en/main/components/routes)内部使用，以确定哪些路由与当前位置匹配。在某些情况下，您也可以手动匹配一组路由，这时它也会很有用。

