# `matchRoutes`

类型声明

```ts
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

`matchRoutes` 针对一组路由与给定的[`location`](https://reactrouter.com/en/main/utils/location)运行路由匹配算法，查看哪些路由（如果有）匹配。如果发现匹配，就会返回一个 `RouteMatch` 对象数组，每个匹配路由对应一个对象。

这是 React Router 匹配算法的核心。[`useRoutes`](https://reactrouter.com/en/main/hooks/use-routes)和[`<Routes>`组件](https://reactrouter.com/en/main/components/routes) 在内部使用它来确定哪些路由与当前位置相匹配。在某些需要手动匹配一组路由的情况下，它也会非常有用。

