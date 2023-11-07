# `useNavigation`

该钩子会告诉你关于页面导航的一切信息，以便在数据突变时建立待定的导航指示器和优化的用户界面。例如：

- 全局加载指示器
- 在发生突变时禁用表单
- 在提交按钮上添加繁忙指示器
- 在服务器上创建新记录时优化的显示新记录
- 在更新记录时优化的显示记录的新状态

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](../routers/picking-a-router)。

```jsx
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.json;
  navigation.text;
  navigation.formAction;
  navigation.formMethod;
}
```

> IMPORTANT
>
> `useNavigation().formMethod` 字段为小写，没有 `future.v7_normalizeFormMethod` [Future Flag](../guides/api-development-strategy)。为了与 `fetch()` 在 v7 版本中的行为保持一致，我们正在将其规范化为大写，因此请升级 React Router v6 应用程序以采用大写 HTTP 方法。

## `navigation.state`

- **idle** -- 没有待处理的导航。
- **submitting**-- 由于使用 POST、PUT、PATCH 或 DELETE 提交表单，路由操作被调用
- **loading** --下一个路由的加载器正在调用以呈现下一页

正常导航和 GET 表单提交通过这些状态转换：

```sh
idle → loading → idle
```

通过 POST、PUT、PATCH 或 DELETE 提交的表单会在这些状态中转换：

```sh
idle → submitting → loading → idle
```

下面是一个简单的提交按钮，当导航状态改变时，它的文本也会改变：

```jsx
function SubmitButton() {
  const navigation = useNavigation();

  const text =
    navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Go";

  return <button type="submit">{text}</button>;
}
```

虽然 `navigation.state` 提供了主动导航的高级状态，但通过将其与其他 `navigation` 方面相结合，可以推断出更细粒度的信息：

```jsx
// Is this just a normal load?
let isNormalLoad =
  navigation.state === "loading" &&
  navigation.formData == null;

// Are we reloading after an action?
let isReloading =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction === navigation.location.pathname;

// Are we redirecting after an action?
let isRedirecting =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction !== navigation.location.pathname;
```

## `navigation.formData`

任何从 `<Form>` 或 `useSubmit` 开始的 POST、PUT、PATCH 或 DELETE 导航都会附加表单的提交数据。这对使用 `submission.formData` `FormData` 对象构建 "优化用户界面 "非常有用。

如果提交的是 GET 表单， `formData` 将为空，数据将反映在 `navigation.location.search` 中。

## `navigation.json`

任何从 `useSubmit(payload, { encType: "application/json" })` 开始的 POST、PUT、PATCH 或 DELETE 导航都将在 `navigation.json` 中提供 JSON 值。

## `navigation.text`

任何从 `useSubmit(payload, { encType: "text/plain" })` 开始的 POST、PUT、PATCH 或 DELETE 导航都将在 `navigation.text` 中提供文本值。

## `navigation.location`

这告诉您下一个[位置](../utils/location)是什么。

请注意，如果正在向链接指向的 URL 提交表单，该链接将不会显示为 "pending"，因为我们只在 "loading "状态下才这样做。当状态为 "submitting "时，表单将包含待处理用户界面，一旦操作完成，链接将转为待处理状态。