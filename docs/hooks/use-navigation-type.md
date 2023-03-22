# `useNavigationType`

类型声明

```tsx
declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";
```

此钩子返回当前导航类型或用户如何到达当前页面的方式；通过历史堆栈上的弹出、推送或替换操作。