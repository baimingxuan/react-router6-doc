# `<Router>`

类型声明

```ts
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

`<Router>` 是所有路由组件（如 `<BrowserRouter>` 和 `<StaticRouter>` ）共享的底层接口。就 React 而言，`<Router>`是一个[上下文提供者](https://reactjs.org/docs/context.html#contextprovider)，负责向应用程序的其他部分提供路由信息。

您可能永远不需要手动渲染 `<Router>` 。相反，您应该根据您的环境使用更高级别的路由。在一个给定的应用程序中，你只需要一个路由。

`<Router basename>` 属性可用于使应用程序中的所有路由和链接都相对于它们共享的 URL 路径名的 "基本 "部分。这在使用 React Router 渲染大型应用程序的一部分或应用程序有多个入口时非常有用。基础名称不区分大小写。