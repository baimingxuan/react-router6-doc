# `<Routes>`

在应用程序的任何位置， `<Routes>` 将匹配当前[位置](https://reactrouter.com/en/main/hook/location)的一组子路由。

```tsx
interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

<Routes location>
  <Route />
</Routes>;
```

> 如果您正在使用像 [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由，则不常使用此组件，因为它不参与数据加载。

每当位置发生变化时， `<Routes>` 会查找其所有子路由以找到最佳匹配并呈现该分支的 UI。 `<Route>` 元素可以嵌套以指示嵌套的 UI，这也对应于嵌套的 URL 路径。父路由通过呈现 [`<Outlet`](https://reactrouter.com/en/main/components/outlet)来呈现其子路由。

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