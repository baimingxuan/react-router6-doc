`<Navigate>`

类型声明

```javascript
declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}
```

元素在`<Navigate>`呈现时会更改当前位置。它是围绕 的组件包装器[`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate)，并接受与 props 相同的所有参数。

> 拥有基于组件的`useNavigate`钩子版本可以更轻松地在[`React.Component`](https://reactjs.org/docs/react-component.html)无法使用钩子的子类中使用此功能。

```javascript
import * as React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  state = { user: null, error: null };

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await login(event.target);
      this.setState({ user });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    let { user, error } = this.state;
    return (
      <div>
        {error && <p>{error.message}</p>}
        {user && (
          <Navigate to="/dashboard" replace={true} />
        )}
        <form
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>
      </div>
    );
  }
}
```