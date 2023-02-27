# `<Router>`

类型声明

```javascript
declare function Router(
  props: RouterProps
): React.ReactElement | null;

interface RouterProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
}
```

`<Router>`是所有路由组件共享的低级接口(如 `<BrowserRouter>`和`<StaticRouter>`)。就 React 而言，`<Router>`是一个[上下文提供者](https://reactjs.org/docs/context.html#contextprovider)，它向应用程序的其余部分提供路由信息。

您可能永远不需要手动渲染`<Router>`。相反，您应该根据您的环境使用更高级别的路由之一。在给定的应用程序中，您只需要一个路由。

`<Router basename>`属性可用于使您的应用程序中的所有路由和链接相对于它们共享的 URL 路径名的“基本”部分。这在使用 React Router 仅渲染较大应用程序的一部分时，或当您的应用程序具有多个入口点时，非常有用。基名不区分大小写。