# `useMatches`

返回页面上的当前路由匹配项。这对于在父布局中创建抽象以访问其子路由数据最有用。

```javascript
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

A`match`具有以下形状：

```javascript
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

配对变得非常强大`<Route handle>`，`useMatches`因为您可以将任何您想要的东西放在路线上`handle`并可以访问`useMatches`任何地方。

`useMatches`只适用于像 的数据路由器[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)，因为他们预先知道完整的路由树并且可以提供所有当前匹配项。此外，`useMatches`不会匹配到任何后代路由树，因为路由器不知道后代路由。

## 面包屑

这里众所周知的用例是将面包屑添加到使用子路由数据的父布局。

```javascript
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
      crumb: () => <Link to="/message">Messages</Link>,
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

现在我们可以创建一个`Breadcrumbs`组件，利用我们自己开发的`crumb`抽象`useMatches`和`handle`。

```javascript
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

现在你可以渲染`<Breadcrumbs/>`任何你想要的地方，可能是在根组件中。