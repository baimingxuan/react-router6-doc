# `<Router>`

类型声明

```tsx
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

`<Router>` 是所有路由组件（如 `<BrowserRouter>` 和 `<StaticRouter>` ）共享的低级接口。在 React 中，`<Router>`是一个[上下文提供者](https://reactjs.org/docs/context.html#contextprovider)，为应用程序的其余部分提供路由信息。

您可能永远不需要手动渲染 `<Router basename>` 。相反，您应该根据您的环境使用其中一个高级路由。在给定的应用程序中，您只需要一个路由。

`<Router basename>` 属性可用于使应用程序中的所有路由和链接相对于它们共享的 URL 路径名的“基础”部分。当仅呈现 React Router 的较大应用程序的一部分或者您的应用程序具有多个入口点时，这非常有用。基本名称不区分大小写。