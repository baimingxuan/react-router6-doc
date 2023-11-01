#  索引查询参数

在提交表单时，您可能会发现应用程序的 URL 中出现一个乱码 `?index` 。

由于存在嵌套路由，路由层次结构中的多个路由都能与 URL 匹配。与导航不同的是，导航会调用所有匹配的路由加载器来构建用户界面，而提交表单时*只会调用一个操作*。

由于索引路由与其父路由共享相同的 URL，因此 `?index` 参数可帮助您区分两者。

例如，请看下面的路由和表单：

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

`?index` 参数将提交到索引路由，不带索引参数的操作将提交到父路由。

当 `<Form>` 在没有 `action` 的索引路由中呈现时，将自动附加 `?index` 参数，以便表单发布到索引路由。下面的表单在提交后会发布到 `/projects?index` ，因为它是在项目索引路由的上下文中呈现的：

```jsx
function ProjectsIndex() {
  return <Form method="post" />;
}
```

如果您将代码移至 `ProjectsLayout` 路由，它将转而发布到 `/projects` 。

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

