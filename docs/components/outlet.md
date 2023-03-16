`<Outlet>`

类型声明

```tsx
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```

应该在父路由元素中使用 `<Outlet>` 来渲染它们的子路由元素。这样可以在渲染子路由时显示嵌套的 UI。如果父路由完全匹配，则会渲染子索引路由，如果没有索引路由，则不会渲染任何内容。

```jsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="messages"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```