# `<Routes>`

在应用程序的任何地方呈现，`<Routes>`将匹配一组来自当前[位置](https://reactrouter.com/en/main/hook/location)的子路由。

```javascript
interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

<Routes location>
  <Route />
</Routes>;
```

> 如果您使用的是数据路由器[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)，则很少使用此组件，因为它不参与数据加载。

每当位置发生变化时，`<Routes>`查看其所有子路由以找到最佳匹配并呈现 UI 的该分支。`<Route>`元素可以嵌套以指示嵌套的 UI，这也对应于嵌套的 URL 路径。父路由通过渲染一个[``](https://reactrouter.com/en/main/components/outlet).

```javascript
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