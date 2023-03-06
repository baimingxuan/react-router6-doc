#  常见问题

以下是人们通常对 React Router v6 提出的一些问题。您可能还可以在[示例](https://github.com/remix-run/react-router/tree/dev/examples)中找到您要查找的内容。

## withRouter 去哪了？我需要它！

这个问题通常源于您正在使用不支持hooks的React类组件。在React Router v6中，我们完全采用了hooks并使用它们来共享路由器的所有内部状态。但这并不意味着您不能使用路由。假设您实际上可以使用hooks（您使用的是React 16.8+），您只需要一个包装器即可。

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

在 React Router v6 中，我们从使用 v5 的 `<Route component>` 和 `<Route render>` API 切换到了 `<Route element>` 。为什么会这样呢？

对于初学者，我们看到 React 本身在`<Suspense fallback={<Spinner />}>`API 方面处于领先地位。`fallback` 属性接受一个 React **元素**，而不是**组件**。这使得您可以轻松地从渲染它的组件向您的 `<Spinner>` 传递任何 props。

使用元素而不是组件意味着我们不必提供 `passProps` 风格的 API，因此您可以获得您的元素所需的 props。例如，在基于组件的 API 中，没有很好的方法将 props 传递给当 `<Route path=":userId" component={Profile} />` 匹配时呈现的 `<Profile>` 元素。大多数采用这种方法的 React 库最终会使用类似于 `<Route component={Profile} passProps={animate: true}/>` 的 API，或者使用渲染 prop 或高阶组件。

此外， `Route` 在 v5 中的渲染 API 相当大。当我们在 v4/5 上工作时，对话大致如下：

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

至少部分原因是 React 没有提供任何方法让我们从 `<Route>` 获取信息到您的路由元素，因此我们不得不发明聪明的方法来将路由数据和您自己的自定义 props 传递到您的元素中： `component` ，渲染 props， `passProps` 高阶组件... 直到 hooks 出现！

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

在 v6 中使用 `element` 属性的另一个重要原因是 `<Route children>` 保留用于嵌套路由。您可以在有关使用 v6 [入门指南](https://reactrouter.com/en/main/start/overview#nested-routes)中了解更多信息。

## 如何在 react-router v6 中添加No Match (404) 路由？

在 v4 中，我们只需在路由中留下 path 属性。在 v5 中，我们将 404 元素包装在 Route 中，并使用 `path="*"` 。在 v6 中，使用新的 element 属性，传递 `path="*"` ：

```jsx
<Route path="*" element={<NoMatch />} />
```

## `<Route>`没有渲染？如何组合？

 v5 中， `<Route>` 组件只是一个普通组件，类似于一个 if 语句，当 URL 匹配其路径时渲染。在 v6 中， `<Route>` 元素实际上永远不会渲染，它只是用于配置。

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

然而，在 v6 中， `<Route>` 仅用于其 props，因此以下代码将永远不会渲染 `<p>Hello!</p>` ，因为 `<MyRoute>` 没有路径可以被 `<Routes>` 看到：

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
- 将组合移入 `element` 属性中

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

在 `<Routes>` 中静态地提供完整的嵌套路由配置将启用许多 `v6.x` 中的功能，因此我们鼓励您将路由放在一个顶级配置中。如果您真的喜欢与任何其他组件无关的与 URL 匹配的组件的想法，您可以创建一个类似于 v5 `Route` 的组件，如下所示：

```jsx
function MatchPath({ path, Comp }) {
  let match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}

// Will match anywhere w/o needing to be in a `<Routes>`
<MatchPath path="/accounts/:id" Comp={Account} />;
```

## 如何在树中嵌套路由？

在 v5 中，您可以在任何地方呈现 `<Route>` 或 `<Switch>` 。您仍然可以继续做同样的事情，但是您需要使用 `<Routes>` （没有 's' 的 `<Route>` 将不起作用）。我们称这些为“后代 `<Routes>` ”。

在 v5 中可能看起来像这样：

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

在 v6 中几乎是一样的：

在v6中几乎相同：

- 请注意，祖先路由中的 `*` 可以使其匹配更深的 URL，即使它没有直接的子级
- 您不再需要知道整个子路由路径，现在可以使用相对路由

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

如果您在v5中有一个“浮动路由”（未包装在 `<Switch>` 中），只需将其包装在 `<Routes>` 中即可。

```jsx
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## 正则表达式路由路径发生了什么？

正则表达式路由路径被删除有两个原因：

1. 路由中的正则表达式路径对于v6的排名路由匹配提出了很多问题。如何对正则表达式进行排名？
2. 我们能够摆脱整个依赖项（path-to-regexp）并显着减少发送到用户浏览器的软件包重量。如果它被添加回来，它将代表React Router页面重量的1/3！

在查看了许多用例之后，我们发现可以在没有直接正则表达式路径支持的情况下仍然满足它们，因此我们做出了权衡，显着减少了捆绑大小并避免了排名正则表达式路由的开放问题。

大多数正则表达式路由路径只关心一次一个URL段，并执行以下两个操作之一：

1. 匹配多个静态值
2. 以某种方式验证参数（是数字，不是数字等）

**匹配一般静态值**

我们看到的一个非常常见的路由是匹配多个语言代码的正则表达式：

`v5-lang-route.js`

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

这些实际上只是静态路径，所以在v6中，您可以创建三个路由并将代码直接传递给组件。如果您有很多这样的路径，请创建一个数组并将其映射到路由中，以避免重复。

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

另一个常见情况是确保参数是整数。

`v5-userId-route.js`

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

在这种情况下，您必须在匹配组件内部使用正则表达式进行一些工作：

`v6-userId-route.js`

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

在v5中，如果正则表达式不匹配，则 `<Switch>` 将继续尝试匹配下一个路由：

`v5-switch.js`

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

到这个例子，您可能会担心在 v6 版本中，您的其他路由不会在它们的 URL 上呈现，因为 `:userId` 路由可能会首先匹配。但是，由于路由排名，情况并非如此。 "new" 和 "inactive" 路由将排名更高，因此在它们各自的 URL 上呈现：

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

实际上，如果您的路由没有正确排序，v5 版本会出现各种问题。V6 完全消除了这个问题。

**Remix用户**

如果您正在使用 [Remix](https://remix.run/)，则可以通过将此工作移动到您的加载器中向浏览器发送适当的 40x 响应。这还可以减少发送到用户的浏览器捆绑包的大小，因为加载器仅在服务器上运行。

`remix-useLoaderData.js`

```javascript
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

与其渲染您的组件，Remix 将渲染最近的[catch boundary](https://remix.run/docs/en/v1/api/conventions#catchboundary)。