# `useInRouterContext`

类型声明

```javascript
declare function useInRouterContext(): boolean;
```

如果组件正在 a 的上下文中呈现，则挂钩`useInRouterContext`返回，否则。这对于需要知道它们是否在 React Router 应用程序的上下文中呈现的某些 3rd 方扩展很有用。`true``<Router>``false`