# `useBeforeUnload`

这个钩子只是 `window.onbeforeunload` 的辅助工具。在用户离开页面之前，将重要的应用程序状态保存在页面上（例如浏览器的本地存储）可能很有用。这样，如果他们回来，您可以恢复任何有状态的信息（恢复表单输入值等）。

```jsx
import { useBeforeUnload } from "react-router-dom";

function SomeForm() {
  const [state, setState] = React.useState(null);

  // save it off before users navigate away
  useBeforeUnload(
    React.useCallback(() => {
      localStorage.stuff = state;
    }, [state])
  );

  // read it in when they return
  React.useEffect(() => {
    if (state === null && localStorage.stuff != null) {
      setState(localStorage.stuff);
    }
  }, [state]);

  return <>{/*... */}</>;
}
```