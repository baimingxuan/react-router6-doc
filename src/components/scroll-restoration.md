# `<ScrollRestoration />`

该组件将在加载程序完成后，模拟浏览器在位置更改时的滚动恢复功能，以确保滚动位置恢复到正确位置，甚至跨域滚动。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](../routers/picking-a-router)

只需呈现其中一个，建议在应用程序的根路由中呈现：

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

可选属性，用于定义 React Router 恢复滚动位置时应使用的键。

```jsx
<ScrollRestoration
  getKey={(location, matches) => {
    // default behavior
    return location.key;
  }}
/>
```

默认情况下，它使用 `location.key` ，在没有客户端路由的情况下模拟浏览器的默认行为。用户可以在堆栈中多次导航到相同的 URL，每个条目都有自己的滚动位置来还原。

有些应用可能希望覆盖这一行为，并根据其他内容恢复位置。例如，一个社交应用程序有四个主要页面：

- "/home"
- "/messages"
- "/notifications"
- "/search"

如果用户从"/home "开始，向下滚动一点，点击导航菜单中的 "信息"，然后点击导航菜单中的 "主页"（而不是返回按钮！），历史堆栈中就会出现三个条目：

```js
1. /home
2. /messages
3. /home
```

默认情况下，React Router（和浏览器）会为 `1` 和 `3` 存储两个不同的滚动位置，即使它们的 URL 相同。这意味着当用户从 `2` → `3` 浏览时，滚动位置会移到顶部，而不是恢复到 `1` 中的位置。

这里一个可靠的产品决策是，无论用户如何到达（返回按钮或新链接点击），都要保持他们在主页上的滚动位置。为此，您需要使用 `location.pathname` 作为关键字。

```jsx
<ScrollRestoration
  getKey={(location, matches) => {
    return location.pathname;
  }}
/>
```

或者，您可能只想对某些路径使用路径名，而对其他路径使用正常行为：

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

当导航创建新的滚动键时，滚动位置会重置为页面顶部。您可以防止链接和表单出现 "滚动到顶部 "行为：

```jsx
<Link preventScrollReset={true} />
<Form preventScrollReset={true} />
```

另请参阅：[`<Link preventScrollReset>`](../components/link#preventscrollreset),[`<Form preventScrollReset>`](../components/form#preventscrollreset)

## 滚动闪烁

如果没有 [Remix](https://remix.run/) 这样的服务器端渲染框架，在初始页面加载时可能会出现一些滚动闪烁。这是因为 React Router 无法还原滚动位置，直到您的 JS 捆绑包下载完毕、数据加载完毕、整个页面渲染完毕（如果您正在渲染一个旋转器，视口很可能不是保存滚动位置时的大小）。

服务器渲染框架可以防止滚动闪烁，因为它们可以在首次加载时发送一个完整的文档，因此可以在页面首次渲染时恢复滚动。