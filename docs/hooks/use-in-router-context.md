# `useInRouterContext`

类型声明

```tsx
declare function useInRouterContext(): boolean;
```

如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 `true` ，否则返回 `false` 。这对于某些第三方扩展非常有用，它们需要知道它们是否在 React Router 应用程序的上下文中呈现。