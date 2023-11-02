# `<Navigate>`

类型声明

```ts
declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}
```

`<Navigate>` 元素在渲染时会改变当前位置。它是[`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate)的组件包装器，并接受与 props 相同的参数。

> NOTE
>
> 有了基于组件的 `useNavigate` 钩子版本，就可以在无法使用钩子的[`React.Component`](https://reactjs.org/docs/react-component.html)子类中更方便地使用这一功能。

```jsx
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

```