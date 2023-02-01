# `useActionData`

此挂钩提供先前导航`action`结果的返回值，或者`undefined`如果没有提交。

```javascript
import { useActionData } from "react-router-dom";

function SomeComponent() {
  let actionData = useActionData();
  // ...
}
```

此挂钩最常见的用例是表单验证错误。如果表单不正确，您可以返回错误并让用户重试：

```javascript
import {
  useActionData,
  Form,
  redirect,
} from "react-router-dom";

export default function SignUp() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <input type="text" name="email" />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type="submit">Sign up</button>
      </p>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};

  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email =
      "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  // otherwise create the user and redirect
  await createUser(email, password);
  return redirect("/dashboard");
}
```