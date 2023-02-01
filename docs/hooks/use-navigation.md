# `useNavigation`

这个钩子告诉你关于页面导航你需要知道的一切，以构建挂起的导航指示器和数据突变的乐观 UI。像：

- 全局加载指标
- 发生突变时禁用表单
- 添加忙指示器以提交按钮
- 在服务器上创建时乐观地显示新记录
- 在记录更新时乐观地显示记录的新状态

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
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

- **idle** - 没有导航挂起。
- **提交**- 由于使用 POST、PUT、PATCH 或 DELETE 提交表单，正在调用路由操作
- **loading** - 正在调用下一个路由的加载器以呈现下一个页面

正常导航和 GET 表单提交通过这些状态转换：

```
idle → loading → idle
```

通过这些状态转换带有 POST、PUT、PATCH 或 DELETE 的表单提交：

```
idle → submitting → loading → idle
```

这是一个简单的提交按钮，当导航状态发生变化时，它会更改其文本：

```javascript
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

在`navigation.state`提供活动导航的高级状态的同时，您可以通过将其与其他`navigation`方面相结合来推断出更细粒度的信息：

```javascript
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

任何从 a 开始的 POST、PUT、PATCH 或 DELETE 导航`<Form>`将`useSubmit`附加表单的提交数据。这主要用于使用`submission.formData` [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)对象构建“乐观 UI”。

在 GET 表单提交的情况下，`formData`将为空，数据将反映在`navigation.location.search`.

## `navigation.location`

这会告诉您下一个[位置](https://reactrouter.com/en/main/utils/location)是什么。

请注意，如果表单正在提交到链接指向的 URL，则此链接不会显示为“待处理”，因为我们只在“加载”状态下这样做。当状态为“正在提交”时，表单将包含待处理的 UI，一旦操作完成，链接将变为待处理状态。