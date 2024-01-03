# `useResolvedPath`

类型声明

```tsx
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;
```

此钩子根据当前位置的路径名解析给定 `to` 值中位置的 `pathname` 。

这在根据相对值建立链接时非常有用。例如，请查看 [`<NavLink>`](../components/nav-link) 的源代码，它在内部调用 `useResolvedPath` 来解析所链接页面的完整路径名。

更多信息，请参阅 [resolvePath ](../utils/resolve-path)。

##  Splat Paths

`useResolvedPath` 的原始逻辑对溅射路径有不同的行为，事后看来这是不正确/有漏洞的行为。  [`6.19.0`](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v6190) 中修复了这一问题，但发现大量现有应用程序依赖于这一行为，因此在 [`6.20.1`](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v6201) 中恢复了这一修复，并在 [`6.21.0`](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v6210) 中以 `future.v7_relativeSplatPath` [future flag](../guides/api-development-strategy) 重新引入。这将成为 React Router v7 的默认行为，因此建议您在方便的时候更新您的应用程序，以便为最终的 v7 升级做好更好的准备。

需要注意的是，这是 React Router 中所有相对路由的基础，因此也适用于以下相对路径代码流：

- `<Link to>`
- `useNavigate()`
- `useHref()`
- `<Form action>`
- `useSubmit()`
- 相对路径 `redirect` 加载器和操作返回的响应

###  未使用标志的行为

如果未启用此标记，默认情况下，在解析 [splat 路由 ( `*` )](../route/route#splats) 中的相对路径时，路径的 splat 部分将被忽略。因此，给定的路由树如下：

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/dashboard/*" element={<Dashboard />} />
  </Routes>
</BrowserRouter>
```

如果您当前位于 URL `/dashboard/teams` ， `Dashboard` 组件内的 `useResolvedPath("projects")` 将解析为 `/dashboard/projects` ，因为我们相对的 "当前 "位置将被视为 `/dashboard` ，*而没有 "teams"的 splat 值*。

这为 "同级 "拼接路由（ `/dashboard/teams` , `/dashboard/projects` 等）之间的路由选择提供了些许便利，但也造成了其他不一致之处，如：

- `useResolvedPath(".")` 不再解析为该路由的当前位置，它实际上是从`/dashboard/teams`“向上”解析到 `/dashboard` 
- 如果将路由定义改为使用动态参数 ( `<Route path="/dashboard/:widget">` )，那么 `Dashboard` 组件内的任何解析路径都会中断，因为动态参数值不会像 splat 值那样被忽略。

如果你将 `splat route` 定义为子路由，情况会变得更糟:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/dashboard">
      <Route path="*" element={<Dashboard />} />
    </Route>
  </Routes>
</BrowserRouter>
```

- 现在， `useResolvedPath(".")` 和 `useResolvedPath("..")` 解析到 `<Dashboard />` 中的路由完全相同。 
- 如果您使用的是数据路由，并在 splat 路由上定义了 `action` ，那么在 `<Dashboard>` 内提交 `<Form>` 时就会出现 405 错误，因为它们（默认情况下）会提交到 `"."` ，这将解析为没有 `action` 的父 `/dashboard` 路由。

###  使用标志的行为

启用该标记后，这一 "错误 "将得到修复，从而使所有路由类型的路径解析保持一致，并且 `useResolvedPath(".")` 始终解析为上下文路由的当前路径名。这包括任何动态参数或 splat 参数值。

如果您想在一个 splat 路由中的 "同级 "路由之间导航，建议您将 splat 路由移到它自己的子路由中，然后使用 `useResolvedPath("../teams")` 和 `useResolvedPath("../projects")` 父相关路径导航到同级 `/dashboard` 路由。请注意，这里我们还使用了 `index` ，这样 URL `/dashboard` 也会呈现 `<Dashboard>` 组件。

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/dashboard">
      <Route index path="*" element={<Dashboard />} />
    </Route>
  </Routes>
</BrowserRouter>
```

