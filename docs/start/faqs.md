#  常见问题

以下是一些关于 React Router v6 的常见问题，您可能会在[示例](https://github.com/remix-run/react-router/tree/dev/examples)中找到想要的答案。

## withRouter 去哪了？我需要它！

这个问题通常源于您使用的是不支持钩子的 React 类组件。在 React Router v6 中，我们完全支持钩子，并使用它们共享路由器的所有内部状态。但这并不意味着你不能使用路由器。假设您真的可以使用钩子（您使用的是 React 16.8 以上版本），您只需要一个封装器。

```jsx
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
```

## 为什么`<Route>`有一个`element`属性而不是`render`或 `component`？

在 React Router v6 中，我们从使用 v5 的 `<Route component>` 和 `<Route render>` API 转而使用 `<Route element>` 。这是为什么呢？

首先，我们可以看到 React 本身率先使用 `<Suspense fallback={<Spinner />}>` API。 `fallback`属性采用的是 React **元素**，而不是**组件**。这样，您就可以轻松地将您想要的任何属性从渲染它的组件传递到 `<Spinner>` 。

使用元素而非组件意味着我们不必提供 `passProps` 风格的 API，因此您可以为您的元素获取所需的 `props`。例如，在基于组件的 API 中，没有很好的方法将属性传递给 `<Profile>` 元素，当 `<Route path=":userId" component={Profile} />` 匹配时，该元素就会呈现。大多数采用这种方法的 React 库最终要么使用类似 `<Route component={Profile} passProps={{ animate: true }} />` 的 API，要么使用渲染属性或高阶组件。

此外， `Route` v5 中的渲染 API 也相当庞大。我们在开发 v4/5 时，曾有过这样的对话：

```jsx
// Ah, this is nice and simple!
<Route path=":userId" component={Profile} />

// But wait, how do I pass custom props to the <Profile> element??
// Hmm, maybe we can use a render prop in those situations?
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// Ok, now we have two ways to render something with a route. :/

// But wait, what if we want to render something when a route
// *doesn't* match the URL, like a Not Found page? Maybe we
// can use another render prop with slightly different semantics?
<Route
  path=":userId"
  children={({ match }) => (
    match ? (
      <Profile match={match} animate={true} />
    ) : (
      <NotFound />
    )
  )}
/>

// What if I want to get access to the route match, or I need
// to redirect deeper in the tree?
function DeepComponent(routeStuff) {
  // got routeStuff, phew!
}
export default withRouter(DeepComponent);

// Well hey, now at least we've covered all our use cases!
// ... *facepalm*
```

造成这种 API 无序的原因至少有一部分是，React 没有提供任何方法让我们从 `<Route>` 获取路由元素的信息，因此我们不得不发明一些巧妙的方法来获取路由数据，并将自己的自定义属性传递到元素中： `component` 渲染属性、 `passProps` 高阶组件......直到钩子的出现！

现在，上面的对话是这样的：

```jsx
// Ah, nice and simple API. And it's just like the <Suspense> API!
// Nothing more to learn here.
<Route path=":userId" element={<Profile />} />

// But wait, how do I pass custom props to the <Profile>
// element? Oh ya, it's just an element. Easy.
<Route path=":userId" element={<Profile animate={true} />} />

// Ok, but how do I access the router's data, like the URL params
// or the current location?
function Profile({ animate }) {
  let params = useParams();
  let location = useLocation();
}

// But what about components deep in the tree?
function DeepComponent() {
  // oh right, same as anywhere else
  let navigate = useNavigate();
}

// Aaaaaaaaand we're done here.
```

在 v6 中使用 `element` prop 的另一个重要原因是， `<Route children>` 专用于嵌套路由。您可以在 v6 [入门指南](https://reactrouter.com/en/main/start/overview#nested-routes)中了解更多相关信息。

## 如何在 react-router v6 中添加不匹配 (404) 路由？

在 v4 中，我们只需将路径属性从路由中删除即可。在 v5 中，我们会将 404 元素封装在路由中，然后使用 `path="*"` 。在 v6 中，我们使用 `path="*"` ，并将 404 元素传递到新的 `element` 属性中，而不是将其包裹起来：

```jsx
<Route path="*" element={<NoMatch />} />
```

## `<Route>`不渲染？我该如何编写？

在 v5 版中， `<Route>` 组件只是一个普通组件，它就像一个 `if` 语句，当 URL 与其路径匹配时就会呈现。在 v6 中， `<Route>` 元素实际上不会呈现，它只是用于配置。

在 v5 中，由于路由只是组件，当路径为“/my-route”时， `MyRoute` 将被渲染。

`v5.js`

```jsx
let App = () => (
  <div>
    <MyRoute />
  </div>
);

let MyRoute = ({ element, ...rest }) => {
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

但在 v6 中， `<Route>` 只用于其属性，因此下面的代码永远不会呈现 `<p>Hello!</p>` ，因为 `<MyRoute>` 没有 `<Routes>` 可以看到的路径：

`v6-wrong.js` -- 这是个错误的示例：

```jsx
let App = () => (
  <Routes>
    <MyRoute />
  </Routes>
);

let MyRoute = () => {
  // won't ever render because the path is down here
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

您可以通过以下方式获得相同的行为：

- 仅在 `<Routes>` 中渲染 `<Route>` 元素
- 将构图移入 `element` 属性中

`v6.js`

```jsx
let App = () => (
  <div>
    <Routes>
      <Route path="/my-route" element={<MyRoute />} />
    </Routes>
  </div>
);

let MyRoute = () => {
  return <p>Hello!</p>;
};
```

在 `<Routes>` 中静态提供一个完整的嵌套路由配置将使 `v6.x` 中的许多功能得以实现，因此我们鼓励你将路由放在一个顶级配置中。如果你非常喜欢组件独立于其他组件匹配 URL 的想法，你可以制作一个与 v5 `Route` 行为类似的组件：

```jsx
function MatchPath({ path, Comp }) {
  let match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}

// Will match anywhere w/o needing to be in a `<Routes>`
<MatchPath path="/accounts/:id" Comp={Account} />;
```

## 如何在树中嵌套路由？

在 v5 版中，您可以在任何地方呈现 `<Route>` 或 `<Switch>` 。您可以继续做同样的事情，但需要使用 `<Routes>` （没有 "s "的 `<Route>` 将不起作用）。我们称之为 "后代 `<Routes>` "。

在 v5 中可能是这样的：

`v5.js`

```jsx
// somewhere up the tree
<Switch>
  <Route path="/users" component={Users} />
</Switch>;

// and now deeper in the tree
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Switch>
        <Route path="/users/account" component={Account} />
      </Switch>
    </div>
  );
}
```

在v6中几乎一样：

- 请注意祖先路由中的 `*` ，即使它没有重定向子路由，也能匹配更深的 URL
- 您不再需要知道整个子路由路径，现在可以使用相对路由了

`v6.js`

```jsx
// somewhere up the tree
<Routes>
  <Route path="/users/*" element={<Users />} />
</Routes>;

// and now deeper in the tree
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Routes>
        <Route path="account" element={<Account />} />
      </Routes>
    </div>
  );
}
```

如果您在 v5 中使用了 "浮动路由"（未用 `<Switch>` 封装），只需用 `<Routes>` 封装即可。

```jsx
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## 正则表达式路由路径发生了什么？

删除正则表达式路由路径有两个原因：

1. 路由中的正则表达式路径给 v6 的路由匹配排序带来了很多问题。如何对正则表达式进行排序？
2. 我们能够舍弃整个依赖关系（path-to-regexp），并大幅削减发送到用户浏览器的包权重。如果将其添加回去，它将占 React Router 页面权重的 1/3！

在研究了大量使用案例后，我们发现如果不支持直接正则表达式路径，我们仍然可以满足这些需求，因此我们做出了权衡，大幅减少了打包的大小，避免了围绕正则表达式路由排序的开放问题。

大多数正则表达式路由路径一次只关心一个 URL 段，并只做两件事中的一件：

1. 匹配多个静态值
2. 以某种方式验证参数（是数字，不是数字等）

**匹配一般静态值**

我们常见的路由是匹配多个语言代码的正则表达式：

`v5-lang-route.jsx`

```jsx
function App() {
  return (
    <Switch>
      <Route path={/(en|es|fr)/} component={Lang} />
    </Switch>
  );
}

function Lang({ params }) {
  let lang = params[0];
  let translations = I81n[lang];
  // ...
}
```

这些实际上都只是静态路径，因此在 v6 中，你可以创建三个路由，然后直接将代码传递给组件。如果你有很多语言代码，可以创建一个数组并将其映射到路由中，以避免重复。

`v6-lang-route.js`

```jsx
function App() {
  return (
    <Routes>
      <Route path="en" element={<Lang lang="en" />} />
      <Route path="es" element={<Lang lang="es" />} />
      <Route path="fr" element={<Lang lang="fr" />} />
    </Routes>
  );
}

function Lang({ lang }) {
  let translations = I81n[lang];
  // ...
}
```

**进行某种参数验证**

另一种常见情况是确保参数是整数。

`v5-userId-route.jsx`

```jsx
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
    </Switch>
  );
}

function User({ params }) {
  let id = params[0];
  // ...
}
```

在这种情况下，你必须自己在匹配组件内使用正则表达式做一些工作：

`v6-userId-route.jsx`

```jsx
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/*" element={<NotFound />} />
    </Routes>
  );
}

function ValidateUser() {
  let params = useParams();
  let userId = params.id.match(/\d+/);
  if (!userId) {
    return <NotFound />;
  }
  return <User id={params.userId} />;
}

function User(props) {
  let id = props.id;
  // ...
}
```

在v5中，如果正则表达式不匹配，则 `<Switch>` 将继续尝试匹配下一条路由：

`v5-switch.jsx`

```jsx
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
      <Route path="/users/new" exact component={NewUser} />
      <Route
        path="/users/inactive"
        exact
        component={InactiveUsers}
      />
      <Route path="/users/*" component={NotFound} />
    </Switch>
  );
}
```

了这个例子，你可能会担心在 v6 版本中，你的其他路由不会在其 URL 上呈现，因为 `:userId` 路由可能会首先匹配。但是，由于路由排序的存在，情况并非如此。"新"和 "不活动 "路由的排序会更靠前，因此会呈现在各自的 URL 上：

`v6-ranked.js`

```jsx
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/new" element={<NewUser />} />
      <Route
        path="/users/inactive"
        element={<InactiveUsers />}
      />
    </Routes>
  );
}
```

事实上，如果路由排序*不当*，V5 版本就会出现各种问题。V6 则完全消除了这一问题。

**Remix用户**

如果您使用的是 [Remix](https://remix.run/)，您可以将这项工作移到`loader`中，从而向浏览器发送适当的 40x 响应。这还能减少发送给用户的浏览器打包的大小，因为`loader`只在服务器上运行。

`remix-useLoaderData.js`

```js
import { useLoaderData } from "remix";

export async function loader({ params }) {
  if (!params.id.match(/\d+/)) {
    throw new Response("", { status: 400 });
  }

  let user = await fakeDb.user.find({
    where: { id: params.id },
  });
  if (!user) {
    throw new Response("", { status: 404 });
  }

  return user;
}

function User() {
  let user = useLoaderData();
  // ...
}
```

remix 将渲染离你最近的[捕获边界](https://remix.run/docs/en/v1/api/conventions#catchboundary)，而不是渲染你的组件。