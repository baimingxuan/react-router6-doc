#  索引查询参数

当提交表单时，你可能会发现你的应用程序的 URL 中出现一个“?index”的参数。

由于嵌套路由，您路由层次结构中的多个路由可能匹配URL。与导航不同，导航时所有匹配的路由加载器都会被调用以构建UI，当提交表单时*只调用一个操作*。

由于索引路由与其父路由共享相同的URL， `?index` 参数可让您在两者之间进行区分。

例如，考虑以下路由器和表单：

```jsx
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

`?index` 参数将提交到索引路由，没有索引参数的操作将提交到父路由。

当一个 `<Form>` 在没有 `action` 的索引路由中呈现时， `?index` 参数将自动添加，以便表单发布到索引路由。当提交以下表单时，它将发布到 `/projects?index` ，因为它是在项目索引路由的上下文中呈现的：

```jsx
function ProjectsIndex() {
  return <Form method="post" />;
}
```

如果您将代码移动到 `ProjectsLayout` 路由，则会将其发布到 `/projects` 。

这适用于 `<Form>` 及其所有同类产品：

```jsx
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

