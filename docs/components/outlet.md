`<Outlet>`

类型声明

```javascript
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```

`<Outlet>`应该在父路由元素中使用An来呈现它们的子路由元素。这允许在呈现子路由时显示嵌套 UI。如果父路由完全匹配，它将呈现一个子索引路由，如果没有索引路由，则不呈现任何内容。

```javascript
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