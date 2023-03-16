# `<ScrollRestoration />`

此组件将在加载程序完成后模拟浏览器的滚动恢复，以确保滚动位置恢复到正确的位置，即使跨域名。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)
>

您应该只渲染其中一个，并建议您在应用的根路由中渲染它：

```jsx
import { ScrollRestoration } from "react-router-dom";

function RootRouteComponent() {
  return (
    <div>
      {/* ... */}
      <ScrollRestoration />
    </div>
  );
}
```

## `getKey`

可选属性，定义React Router应该使用哪个键来恢复滚动位置。

```jsx
<ScrollRestoration
  getKey={(location, matches) => {
    // default behavior
    return location.key;
  }}
/>
```

默认情况下，它使用 `location.key` ，模拟浏览器的默认行为，而没有客户端路由。用户可以在堆栈中多次导航到相同的URL，并且每个条目都有自己的滚动位置以恢复。

一些应用程序可能希望覆盖此行为，并基于其他内容恢复位置。考虑一个具有四个主要页面的社交应用程序：

- "/home"
- "/messages"
- "/notifications"
- "/search"

如果用户从“/home”开始，向下滚动一点，然后在导航菜单中单击“messages”，然后在导航菜单中单击“home”（不是返回按钮！），则历史堆栈中将有三个条目：

```jsx
1. /home
2. /messages
3. /home
```

默认情况下，React Router（和浏览器）将为 `1` 和 `3` 存储两个不同的滚动位置，即使它们具有相同的URL。这意味着当用户从 `2` → `3` 导航时，滚动位置会回到顶部，而不是恢复到 `1` 中的位置。

在这里做出一个明智的产品决策是，无论用户如何到达主页，都保持用户的滚动位置不变（返回按钮或新链接单击）。为此，您需要使用 `location.pathname` 作为键。

```jsx
<ScrollRestoration
  getKey={(location, matches) => {
    return location.pathname;
  }}
/>
```

或者您可能只想对某些路径使用路径名，并对其他所有内容使用正常行为：

```jsx
<ScrollRestoration
  getKey={(location, matches) => {
    const paths = ["/home", "/notifications"];
    return paths.includes(location.pathname)
      ? // home and notifications restore by pathname
        location.pathname
      : // everything else by location like the browser
        location.key;
  }}
/>
```

## 防止滚动重置

当导航创建新的滚动键时，滚动位置将重置为页面顶部。您可以通过链接和表单来防止“滚动到顶部”的行为：

```jsx
<Link preventScrollReset={true} />
<Form preventScrollReset={true} />
```

另请参阅：[`<Link preventScrollReset>`](https://reactrouter.com/en/main/components/link#preventscrollreset),[`<Form preventScrollReset>`](https://reactrouter.com/en/main/components/form#preventscrollreset)

## 滚动闪烁

如果没有像[Remix](https://remix.run/)这样的服务器端渲染框架，您可能会在初始页面加载时遇到一些滚动闪烁。这是因为React Router无法恢复滚动位置，直到JS包已下载，数据已加载并且完整页面已呈现（如果您正在呈现旋转器，则视口可能不是保存滚动位置时的大小）。

服务器端渲染框架可以防止滚动闪烁，因为它们可以在初始加载时发送完整的文档，因此可以在页面首次呈现时恢复滚动。