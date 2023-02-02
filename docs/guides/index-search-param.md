#  索引查询参数

提交表单时，您可能会发现`?index`应用程序的 URL 中出现乱码。

由于嵌套路由，路由层次结构中的多个路由可以匹配 URL。与调用所有匹配的路由加载器来构建 UI 的导航不同，提交表单时*仅调用一个操作*。

因为索引路由与其父路由共享相同的 URL，所以该`?index`参数可以让您消除两者之间的歧义。

例如，考虑以下路由器和表单：

```javascript
createBrowserRouter([
  {
    path: "/projects",
    element: <ProjectsLayout />,
    action: ProjectsLayout.action,
    children: [
      {
        index: true,
        element: <ProjectsIndex />,
        action: ProjectsPage.action,
      },
    ],
  },
]);

<Form method="post" action="/projects" />;
<Form method="post" action="/projects?index" />;
```

参数将`?index`提交到索引路由，没有索引参数的动作将提交到父路由。

当`<Form>`在没有 的索引路由中呈现a 时`action`，`?index`将自动附加参数，以便将表单发布到索引路由。以下表单在提交时将发布到，`/projects?index`因为它是在项目索引路由的上下文中呈现的：

```javascript
function ProjectsIndex() {
  return <Form method="post" />;
}
```

如果您将代码移动到`ProjectsLayout`路由，它会改为发布到`/projects`.

这适用于`<Form>`及其所有表亲：

```javascript
let submit = useSubmit();
submit({}, { action: "/projects" });
submit({}, { action: "/projects?index" });

let fetcher = useFetcher();
fetcher.submit({}, { action: "/projects" });
fetcher.submit({}, { action: "/projects?index" });
<fetcher.Form action="/projects" />;
<fetcher.Form action="/projects?index" />;
<fetcher.Form />; // defaults to the route in context
```

