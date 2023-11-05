# `useMatches`

返回页面上匹配的当前路由。这对于在父布局中创建抽象布局以访问子路由数据非常有用。

```jsx
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

 `match` 的形状如下：

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

将 `<Route handle>` 与 `useMatches` 配对后，功能会变得非常强大，因为您可以将任何想要的东西放在 `handle` 路由上，并在任何地方访问 `useMatches` 。

`useMatches` 只适用于[`createBrowserRouter`](https://baimingxuan.github.io/react-router6-doc/routers/create-browser-router)这样的数据路由，因为它们预先知道完整的路由树，可以提供所有当前匹配结果。此外， `useMatches` 不会向下匹配到任何子路由树，因为路由器不知道子路由。

## 面包屑

众所周知，这里的用例是将面包屑添加到使用子路由数据的父布局中。

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

现在，我们可以使用 `useMatches` 和 `handle` 来创建一个利用我们自定义 `crumb` 抽象的 `Breadcrumbs` 组件。

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

现在，您可以在任何地方呈现 `<Breadcrumbs/>` ，可能是在根组件中。