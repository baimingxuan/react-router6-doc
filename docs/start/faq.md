#  常见问题

以下是人们对 React Router v6 的一些常见问题。[您可能还会在示例](https://github.com/remix-run/react-router/tree/dev/examples)中找到您要查找的内容。

## withRouter 怎么了？我需要它！

这个问题通常源于您正在使用不支持挂钩的 React 类组件这一事实。在 React Router v6 中，我们完全接受了钩子并使用它们来共享路由器的所有内部状态。但这并不意味着您不能使用路由器。假设您实际上可以使用钩子（您使用的是 React 16.8+），您只需要一个包装器。

```javascript
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

## 为什么`<Route>`有一个`element`道具而不是`render`or `component`？

在 React Router v6 中，我们从使用 v5`<Route component>`和`<Route render>`API 切换到`<Route element>`. 这是为什么？

对于初学者，我们看到 React 本身在`<Suspense fallback={<Spinner />}>`API 方面处于领先地位。该`fallback`道具采用 React**元素**，而不是**组件**。这使您可以轻松地将任何您想要的道具`<Spinner>`从呈现它的组件传递给您。

使用元素而不是组件意味着我们不必提供`passProps`-style API，因此您可以获得元素所需的道具。例如，在基于组件的 API 中，没有很好的方法将 props 传递给匹配`<Profile>`时呈现的元素。`<Route path=":userId" component={Profile} />`大多数采用这种方法的 React 库最终都会使用类似 API`<Route component={Profile} passProps={{ animate: true }} />`或使用 render prop 或高阶组件。

此外，`Route`v5 中的渲染 API 相当大。当我们在 v4/5 上工作时，对话是这样的：

```javascript
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

这个 API 蔓延的至少部分原因是 React 没有提供任何方法让我们从`<Route>`你的路由元素获取信息，所以我们必须发明聪明的方法来获取路由数据**和**你自己的自定义道具到你的元素：`component`，渲染道具，`passProps`高阶组件......直到**钩子**出现！

现在，上面的对话是这样的：

```javascript
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

`element`在 v6 中使用 prop 的另一个重要原因是它`<Route children>`是为嵌套路由保留的。您可以在v6[入门指南](https://reactrouter.com/en/main/start/overview#nested-routes)中阅读更多相关信息。

## 如何在 react-router v6 中添加不匹配 (404) 路由？

在 v4 中，我们只是将路径道具留在了路线之外。在 v5 中，我们会将 404 元素包装在 Route 中并使用`path="*"`. 在 v6 中使用新的 element 属性，`path="*"`改为传递：

```javascript
<Route path="*" element={<NoMatch />} />
```

## `<Route>`不渲染？我如何作曲？

在 v5 中，该`<Route>`组件只是一个普通组件，就像一个`if`在 URL 匹配其路径时呈现的语句。在 v6 中，`<Route>`元素实际上并不渲染，它只是用于配置。

在 v5 中，由于路由只是组件，`MyRoute`因此将在路径为“/my-route”时呈现。

```javascript
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

然而，在 v6 中，`<Route>`仅用于它的道具，因此以下代码将永远不会呈现`<p>Hello!</p>`，因为`<MyRoute>`没有`<Routes>`可以看到的路径：

```javascript
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

- 只渲染`<Route>`里面的元素`<Routes>`
- 将构图移动到`element`道具中

```javascript
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

在 中静态提供完整的嵌套路由配置`<Routes>`将启用 中的许多功能`v6.x`，因此我们鼓励您将路由放在一个顶级配置中。如果你真的喜欢独立于任何其他组件匹配 URL 的组件的想法，你可以制作一个行为类似于 v5 的组件`Route`：

```javascript
function MatchPath({ path, Comp }) {
  let match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}

// Will match anywhere w/o needing to be in a `<Routes>`
<MatchPath path="/accounts/:id" Comp={Account} />;
```

## 如何在树深处嵌套路线？

在 v5 中，您可以渲染 a`<Route>`或`<Switch>`任何您想要的地方。你可以继续做同样的事情，但你需要使用`<Routes>`（`<Route>`没有's'将不起作用）。我们称这些为“后裔`<Routes>`”。

在 v5 中可能看起来像这样

```javascript
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

- 请注意`*`祖先路由中的 以使其匹配更深层次的 URL，即使它没有直接子级
- 您不再需要知道整个子路由路径，您现在可以使用相对路由

```javascript
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

如果您在 v5 中有一个“浮动路线”（未包裹在 a 中`<Switch>`），只需将其包裹在 a 中即可`<Routes>`。

```javascript
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## 正则表达式路由路径发生了什么？

正则表达式路由路径被删除有两个原因：

1. 路由中的正则表达式路径对 v6 的排名路由匹配提出了很多问题。您如何对正则表达式进行排名？
2. 我们能够摆脱整个依赖关系（正则表达式路径）并显着减少发送到用户浏览器的包重量。如果加回来，就代表了 React Router 页面权重的 1/3！

在查看了很多用例之后，我们发现在没有直接正则表达式路径支持的情况下我们仍然可以满足它们，因此我们做出权衡以显着减小包大小并避免围绕正则表达式路由排名的开放性问题。

大多数正则表达式路由一次只关心一个 URL 段并执行以下两件事之一：

1. 匹配多个静态值
2. 以某种方式验证参数（是数字，不是数字等）

**匹配一般静态值**

我们见过的一种非常常见的路由是匹配多种语言代码的正则表达式：

```javascript
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

这些实际上都只是静态路径，所以在 v6 中你可以创建三个路由并将代码直接传递给组件。如果您有很多，请制作一个数组并将其映射到路线中以避免重复。

```javascript
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

另一个常见的情况是确保参数是一个整数。

```javascript
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

在这种情况下，您必须自己对匹配组件中的正则表达式做一些工作：

```javascript
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

在 v5 中，如果正则表达式不匹配，`<Switch>`则将继续尝试匹配下一条路线：

```javascript
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

查看此示例，您可能会担心在 v6 版本中您的其他路由不会在其 URL 处呈现，因为`:userId`路由可能首先匹配。但是，由于路线排名，情况并非如此。"new" 和 "inactive" 路由将排名更高，因此呈现在它们各自的 URL 上：

```javascript
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

*事实上，如果您的路由没有正确*排序，v5 版本会出现各种问题。V6 完全消除了这个问题。

**混音用户**

如果您使用的是[Remix](https://remix.run/)，则可以通过将此工作移至您的加载程序来向浏览器发送适当的 40x 响应。这也减少了发送给用户的浏览器包的大小，因为加载器只在服务器上运行。

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

remix 不会渲染您的组件，而是渲染最近的[捕获边界](https://remix.run/docs/en/v1/api/conventions#catchboundary)。