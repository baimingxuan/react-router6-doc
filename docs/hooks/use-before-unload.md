# `useBeforeUnload`

这个钩子只是一个帮手`window.onbeforeunload`。在用户离开您的页面之前，将重要的应用程序状态保存在页面上（保存到浏览器的本地存储之类的东西）可能很有用。这样，如果他们回来，您可以恢复任何状态信息（恢复表单输入值等）

```javascript
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