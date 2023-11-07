# `<Routes>`

在应用程序中的任何地方， `<Routes>` 都会匹配当前[位置](../hook/location)的一组子路由。

```tsx
interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

<Routes location>
  <Route />
</Routes>;
```

> NOTE
>
> 如果您使用的是[`createBrowserRouter`](../routers/create-browser-router)这样的数据路由器，使用该组件的情况并不常见，因为作为 `<Routes>` 树的后代的一部分定义的路由无法利用[`RouterProvider`](../routers/router-provider)应用程序可用的[数据 API](../routers/picking-a-router#data-apis)。[在迁移过程中](../upgrading/v6-data)，您可以也应该在 `RouterProvider` 应用程序中使用该组件。

每当位置发生变化时， `<Routes>` 就会查看其所有子路由，找出最匹配的路由，并渲染用户界面的该分支。 `<Route>` 元素可以嵌套，以表示嵌套的用户界面，这也与嵌套的 URL 路径相对应。父路由通过呈现 [`<Outlet`](../components/outlet)来呈现其子路由。

```jsx
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
```