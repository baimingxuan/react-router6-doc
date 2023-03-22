# `useNavigation`

这个钩子告诉您关于页面导航的一切，以构建挂起导航指示器和在数据变化时进行乐观 UI。例如：

- 全局加载指示器
- 在发生突变时禁用表单
- 在提交按钮上添加忙碌指示器
- 在服务器上创建新记录时乐观地显示新记录
- 在更新记录时乐观地显示记录的新状态

> 仅当使用数据路由器时，此功能才有效，请参阅[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

```jsx
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.formAction;
  navigation.formMethod;
}
```

## `navigation.state`

- **idle** - 没有待处理的导航。
- **submitting**- 由于使用POST、PUT、PATCH或DELETE提交表单而调用路由操作
- **loading** - 下一个路由的加载器正在调用以呈现下一页

正常导航和GET表单提交通过这些状态转换：

```sh
idle → loading → idle
```

使用POST、PUT、PATCH或DELETE的表单提交通过这些状态转换：

```sh
idle → submitting → loading → idle
```

这是一个简单的提交按钮，当导航状态正在更改时更改其文本：

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

虽然 `navigation.state` 提供了活动导航的高级状态，但您可以通过将其与其他 `navigation` 方面相结合来推断更细粒度的信息：

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

从 `<Form>` 或 `useSubmit` 开始的任何POST、PUT、PATCH或DELETE导航都将附加到您的表单提交数据。这主要用于使用 `submission.formData` [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)对象构建“乐观UI”。

在GET表单提交的情况下， `formData` 将为空，并且数据将反映在 `navigation.location.search` 中。

## `navigation.location`

这告诉您下一个[位置](https://reactrouter.com/en/main/utils/location)将是什么。

请注意，如果表单正在提交到链接指向的URL，则此链接不会显示为“待定”，因为我们仅对“加载”状态执行此操作。表单将包含“提交”状态下的待定UI，一旦操作完成，链接将变为待定状态。