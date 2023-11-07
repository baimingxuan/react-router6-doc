# `useNavigationType`

类型声明

```ts
declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";
```

此钩子返回当前的导航类型或用户是如何进入当前页面的；可以是通过历史堆栈上的弹出、推送或替换操作。