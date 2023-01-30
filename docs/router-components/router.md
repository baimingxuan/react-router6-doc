`<Router>`

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

`<Router> <BrowserRouter>`是所有路由器组件（如和）共享的低级接口`<StaticRouter>`。就 React 而言，`<Router>`是一个[上下文提供者](https://reactjs.org/docs/context.html#contextprovider)，它向应用程序的其余部分提供路由信息。

您可能永远不需要`<Router>`手动渲染。相反，您应该根据您的环境使用更高级别的路由器之一。在给定的应用程序中，您只需要一个路由器。

该`<Router basename>`道具可用于使您的应用程序中的所有路由和链接相对于它们共享的 URL 路径名的“基本”部分。这在使用 React Router 仅渲染较大应用程序的一部分时或当您的应用程序具有多个入口点时非常有用。基本名称不区分大小写。****