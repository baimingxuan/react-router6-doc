# `useMatches`

返回页面上当前路由匹配项。这对于在父布局中创建抽象以访问其子路由的数据非常有用。

```jsx
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

 `match` 具有以下形状：

```jsx
{
  // route id
  id,

  // the portion of the URL the route matched
  pathname,

  // the data from the loader
  data,

  // the parsed params from the URL
  params,

  // the <Route handle> with any app specific data
  handle,
};
```

将 `<Route handle>` 与 `useMatches` 配对非常强大，因为您可以在路由 `handle` 上放置任何您想要的内容，并随时访问 `useMatches` 。

`useMatches` 仅适用于像[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由，因为它们事先知道完整的路由树，并且可以提供所有当前匹配项。此外， `useMatches` 不会匹配到任何后代路由树中，因为路由器不知道后代路由。

## 面包屑

这里的谚语用例是向使用子路由数据的父布局添加面包屑。

`app.jsx`

```jsx
<Route element={<Root />}>
  <Route
    path="messages"
    element={<Messages />}
    loader={loadMessages}
    handle={{
      // you can put whatever you want on a route handle
      // here we use "crumb" and return some elements,
      // this is what we'll render in the breadcrumbs
      // for this route
      crumb: () => <Link to="/messages">Messages</Link>,
    }}
  >
    <Route
      path="conversation/:id"
      element={<Thread />}
      loader={loadThread}
      handle={{
        // `crumb` is your own abstraction, we decided
        // to make this one a function so we can pass
        // the data from the loader to it so that our
        // breadcrumb is made up of dynamic content
        crumb: (data) => <span>{data.threadName}</span>,
      }}
    />
  </Route>
</Route>
```

现在，我们可以创建一个 `Breadcrumbs` 组件，利用我们自己开发的 `crumb` 抽象，使用 `useMatches` 和 `handle` 。

`components/breadcrumbs.jsx`

```jsx
function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}
```

现在，您可以在任何您想要的地方呈现 `<Breadcrumbs/>` ，可能是在根组件中。