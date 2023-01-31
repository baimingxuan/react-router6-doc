# `<ScrollRestoration />`

该组件将在加载程序完成后模拟浏览器在位置更改时的滚动恢复，以确保滚动位置恢复到正确的位置，即使跨域也是如此。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

您应该只渲染其中之一，建议您在应用程序的根路径中渲染它：

```javascript
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

定义 React Router 应该用来恢复滚动位置的键的可选属性。

```javascript
<ScrollRestoration
  getKey={(location, matches) => {
    // default behavior
    return location.key;
  }}
/>
```

默认情况下，它使用`location.key`模拟浏览器的默认行为，无需客户端路由。用户可以多次导航到堆栈中的同一个 URL，每个条目都有自己的滚动位置以恢复。

某些应用程序可能希望覆盖此行为并根据其他内容恢复位置。考虑一个具有四个主要页面的社交应用程序：

- "/home"
- "/messages"
- "/notifications"
- "/search"

如果用户从“/home”开始，向下滚动一点，点击导航菜单中的“messages”，然后点击导航菜单中的“home”（不是后退按钮！）历史堆栈中将有三个条目：

```javascript
1. /home
2. /messages
3. /home
```

默认情况下，React Router（和浏览器）将存储两个不同的滚动位置`1`，`3`即使它们具有相同的 URL。这意味着当用户从`2`→导航时`3`，滚动位置会转到顶部而不是恢复到它所在的位置`1`。

这里一个可靠的产品决策是保持用户在主页上的滚动位置，无论他们如何到达那里（后退按钮或新链接点击）。为此，您需要使用`location.pathname`作为键。

```javascript
<ScrollRestoration
  getKey={(location, matches) => {
    return location.pathname;
  }}
/>
```

或者您可能只想对某些路径使用路径名，而对其他所有路径使用正常行为：

```javascript
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

当导航创建新的滚动键时，滚动位置将重置为页面顶部。您可以阻止链接和表单中的“滚动到顶部”行为：

```javascript
<Link preventScrollReset={true} />
<Form preventScrollReset={true} />
```

另见：[`<Link preventScrollReset>`](https://reactrouter.com/en/main/components/link#preventscrollreset),[`<Form preventScrollReset>`](https://reactrouter.com/en/main/components/form#preventscrollreset)

## 滚动闪烁

如果没有像[Remix](https://remix.run/)这样的服务器端渲染框架，您可能会在初始页面加载时遇到一些滚动闪烁。这是因为 React Router 无法恢复滚动位置，直到您的 JS 包已下载、数据已加载并且整个页面已呈现（如果您正在呈现微调器，视口可能不是滚动位置时的大小得救了）。

服务器呈现框架可以防止滚动闪烁，因为它们可以在初始加载时发送完整的文档，因此可以在页面首次呈现时恢复滚动。