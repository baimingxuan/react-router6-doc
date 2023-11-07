# `useInRouterContext`

类型声明

```ts
declare function useInRouterContext(): boolean;
```

如果组件是在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 `true` ，否则返回 `false` 。这对某些需要知道自己是否在 React Router 应用程序上下文中呈现的第三方扩展很有用。