# `hydrateFallbackElement`

如果您使用[服务器端渲染](../guides/ssr)并利用[部分水合](../routers/create-browser-router#partial-hydration-data)，那么您可以指定一个元素/组件，以便在应用程序初始水合期间为未水合路由进行渲染。

> NOTE
>
> 如果您不想指定 React 元素（即 `hydrateFallbackElement={<MyFallback />}` ），您可以指定一个 `HydrateFallback` 组件（即 `HydrateFallback={MyFallback}` ），React 路由器将在内部为您调用 `createElement` 。

> IMPORTANT
>
> 此功能只有在使用数据路由时才有效，请参阅 [选择路由](../routers/picking-a-router)。

```jsx
let router = createBrowserRouter(
  [
    {
      id: "root",
      path: "/",
      loader: rootLoader,
      Component: Root,
      children: [
        {
          id: "invoice",
          path: "invoices/:id",
          loader: loadInvoice,
          Component: Invoice,
          HydrateFallback: InvoiceSkeleton,
        },
      ],
    },
  ],
  {
    future: {
      v7_partialHydration: true,
    },
    hydrationData: {
      root: {
        /*...*/
      },
      // No hydration data provided for the `invoice` route
    },
  }
);
```

没有默认的`fallback`，它只会在该路由级别呈现 `null` ，因此建议您始终提供自己的 `fallback` 元素。