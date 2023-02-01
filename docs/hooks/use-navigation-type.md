# `useNavigationType`

类型声明

```javascript
declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";
```

该钩子返回当前的导航类型或用户如何到达当前页面；通过历史堆栈上的弹出、推送或替换操作。