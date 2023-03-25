# 从 Reach Router 迁移到 React Router v6

> 这个页面还在建设中。请告诉我们它缺少什么，以便我们可以使迁移尽可能顺利！

## 简介

当我们开始构建 React Router v6 时，从 `@reach/router` 用户的角度来看，我们有以下目标：

- 保持打包大小较小（结果我们把它变得比 `@reach/router` 更小了）
- 保留 `@reach/router` 的最佳部分（嵌套路由和通过排名路径匹配和 `navigate` 简化的 API）
- 更新 API 以符合现代 React 的习惯用法（即 hooks）
- 为并发模式和暂停提供更好的支持
- 停止默认进行不够好的焦点管理

如果我们要制作 `@reach/router` v2，它看起来几乎完全像 React Router v6。因此， `@reach/router` 的下一个版本是 React Router v6。换句话说，没有 `@reach/router` v2，因为它与 React Router v6 相同。

很多API在 `@reach/router` 1.3和React Router v6之间实际上是相同的：

- 路由被排名和匹配
- 嵌套路由配置在那里
- `navigate` 具有相同的签名
- `Link` 具有相同的签名
- 1.3 中的所有钩子都是相同的（或几乎相同的）

大部分的更改只是一些重命名。如果您恰好编写了一个codemod，请与我们分享，我们将把它添加到本指南中！

## 升级概述

在本指南中，我们将向您展示如何升级您的路由代码的每个部分。我们将逐步进行，以便您可以进行一些更改，然后进行发布，然后在方便时再次进行迁移。我们还将讨论一些“为什么”进行更改的原因，可能看起来像简单重命名实际上背后有更大的原因。

### 首先：非破坏性更新

我们强烈建议您在迁移到React Router v6之前对代码进行以下更新。这些更改不必一次完成整个应用程序，您可以简单地更新一行，提交并发布。这样做将大大减少您在React Router v6中遇到破坏性更改时的工作量。

1. 升级到React v16.8或更高版本
2. 升级到 `@reach/router` v1.3
3. 更新路由组件以从hooks访问数据
4. 在应用程序顶部添加 `<LocationProvider/>`

### 其次：破坏性更新

以下更改需要一次完成整个应用程序。

1. 升级到 React Router v6
2. 将所有 `<Router>` 元素更新为 `<Routes>`
3. 将 `<RouteElement default/>` 更改为 `<RouteElement path="*" />`
4. 修复 `<Redirect />`
5. 使用hooks实现 `<Link getProps />`
6. 更新 `useMatch` ，参数在 `match.params` 上
7. 将 `ServerLocation` 更改为 `StaticRouter`

## 非破坏性更新

### 升级到 React Router v6

React Router v6 在很大程度上使用了[React hooks](https://reactjs.org/docs/hooks-intro.html)，因此在尝试升级到 React Router v6 之前，您需要使用 React 16.8 或更高版本。

以下是每个步骤的详细说明，应该可以帮助您快速且有信心地迁移到 v6。

### 升级到 `@reach/router` v1.3.3

您应该能够简单地安装 v1.3.3，然后部署您的应用程序。

```sh
npm install @reach/router@latest
```

### 更新路由组件以使用 hooks

您可以逐个路由组件执行此步骤，提交并部署。 您不需要立即更新整个应用程序。

在 `@reach/router` v1.3 中，我们添加了 hooks 来访问路由数据，以准备升级到 React Router v6。 如果您首先执行此操作，则在升级到 React Router v6 时需要执行的操作将会减少很多。

```jsx
// @reach/router v1.2
<Router>
  <User path="users/:userId/grades/:assignmentId" />
</Router>;

function User(props) {
  let {
    // route params were accessed from props
    userId,
    assignmentId,

    // as well as location and navigate
    location,
    navigate,
  } = props;

  // ...
}

// @reach/router v1.3 and React Router v6
import {
  useParams,
  useLocation,
  useNavigate,
} from "@reach/router";

function User() {
  // everything comes from a specific hook now
  let { userId, assignmentId } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  // ...
}
```

#### 合理解释

所有这些数据已经存在于上下文中，但是从那里访问它对应用程序代码来说很麻烦，因此我们将其转储到了您的 props 中。Hooks 使从上下文访问数据变得简单，因此我们不再需要使用路由信息污染您的 props。

不污染 props 对 TypeScript 也有所帮助，还可以防止您在查看组件时想知道 prop 来自何处。如果您正在使用来自路由器的数据，现在完全清楚了。

此外，随着页面的增长，您自然会将其分成多个组件，并最终将该数据“prop drilling”到整个树中。现在，您可以在树的任何位置访问路由数据。这不仅更方便，而且使创建以路由器为中心的可组合抽象变得可能。如果自定义 hook 需要位置，则现在可以使用 `useLocation()` 等简单地请求它。

### 添加 LocationProvider

虽然 `@reach/router` 不需要在应用程序树的顶部提供位置提供程序，但 React Router v6 需要，因此最好现在就准备好。

```jsx
// before
ReactDOM.render(<App />, el);

// after
import { LocationProvider } from "@reach/router";

ReactDOM.render(
  <LocationProvider>
    <App />
  </LocationProvider>,
  el
);
```

#### 合理解释

`@reach/router` 使用全局默认历史实例，在模块中具有副作用，这会阻止模块的树摇优化，无论您是否使用全局。此外，React Router 提供其他历史类型（如哈希历史记录）， `@reach/router` 没有提供，因此它始终需要一个顶级位置提供程序（在 React Router 中，这些是 `<BrowserRouter/>` 和朋友们）。

另外，像 `Router` 、 `Link` 和 `useLocation` 这样的各种模块在 `<LocationProvider/>` 之外呈现，它们设置了自己的 URL 监听器。这通常不是问题，但每一点都很重要。在顶部放置 `<LocationProvider />` 允许应用程序拥有单个 URL 监听器。

## 破坏性更新

这些更新需要一次性完成。幸运的是，大部分只是简单的重命名。

你可以使用两个路由器来进行迁移，但是绝对不应该在这种状态下发布应用程序，因为它们不兼容。一个路由器的链接对于另一个路由器是无效的。但是，能够进行更改并刷新页面以查看是否正确完成了一步是很好的。

### 安装 React Router v6

```sh
npm install react-router@6 react-router-dom@6
```

### 将 `LocationProvider` 更新为 `BrowserRouter`

```jsx
// @reach/router
import { LocationProvider } from "@reach/router";

ReactDOM.render(
  <LocationProvider>
    <App />
  </LocationProvider>,
  el
);

// React Router v6
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

### 将 `Router` 更新为 `Routes`

你可能有多个，但通常只有一个在应用程序的顶部附近。如果有多个，请为每个执行此操作。

```jsx
// @reach/router
import { Router } from "@reach/router";

<Router>
  <Home path="/" />
  {/* ... */}
</Router>;

// React Router v6
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  {/* ... */}
</Routes>;
```

###  更新 `default` 路由属性

`default` 属性告诉 `@reach/router` 如果没有其他路由匹配，则使用该路由。在 React Router v6 中，您可以使用通配符路径来解释此行为。

```jsx
// @reach/router
<Router>
  <Home path="/" />
  <NotFound default />
</Router>

// React Router v6
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### `<Redirect/>` ， `redirectTo` ， `isRedirect`

Whew ... 为这个做好准备。请把你的番茄留着自己做玛格丽特披萨，不要扔向我们。

我们已经删除了从React Router重定向的功能。这意味着没有 `<Redirect/>` ， `redirectTo` 或 `isRedirect` ，也没有替换API。请继续阅读 😅

不要将重定向与用户与您的应用程序交互时的导航混淆。仍支持根据用户交互进行导航。当我们谈论重定向时，我们是指在匹配时重定向：

```jsx
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

重定向在 `@reach/router` 中的工作方式有点像实验。它“抛出”重定向并使用 `componentDidCatch` 捕获它。这很酷，因为它会导致整个渲染树停止，然后使用新位置重新开始。几年前我们第一次发布这个项目时与React团队的讨论使我们决定尝试一下。

在遇到问题（例如应用程序级别的 `componentDidCatch` 需要重新抛出重定向）后，我们决定在React Router v6中不再这样做。

但我们更进一步得出结论，重定向甚至不是React Router的工作。您的动态Web服务器或静态文件服务器应该处理此问题，并发送适当的响应状态代码，如301或302。

在React Router中匹配时具有重定向功能，最好需要您在两个位置（服务器和路由）配置重定向，最坏的情况是鼓励人们仅在React Router中执行此操作- -它根本不发送状态代码。

我们经常使用Firebase托管，因此这是我们如何更新其中一个应用程序的示例：

```jsx
// @reach/router
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

```jsx
// React Router v6
// firebase.json config file
{
  // ...
  "hosting": {
    "redirects": [
      {
        "source": "/dashboard",
        "destination": "/events",
        "type": 301
      }
    ]
  }
}
```

无论我们是使用无服务器函数进行服务器渲染，还是仅将其用作静态文件服务器，都可以使用此方法。所有 Web 托管服务都提供了一种配置方法。

#### 点击未更新的链接怎么办？

如果您的应用程序中仍有 `<Link to="/events" />` ，并且用户单击它，则服务器不会参与，因为您正在使用客户端路由器。您需要更加勤奋地更新您的链接 😬。

或者，如果您想允许过时的链接，*并且您意识到需要在客户端和服务器上配置重定向*，请继续复制并粘贴我们即将发布但随后删除的 `Redirect` 组件。

```jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

// usage
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/events" element={<Users />} />
  <Route
    path="/dashboard"
    element={<Redirect to="/events" />}
  />
</Routes>;
```

#### 合理解释

我们认为，不提供任何重定向 API，人们更有可能正确配置它们。多年来，我们一直无意中鼓励不良实践，现在想停止 🙈。

### `<Link getProps />`

这个 prop getter 对于将链接样式设置为“活动状态”很有用。决定链接是否处于活动状态有点主观。有时您希望它在 URL 完全匹配时处于活动状态，有时您希望它在部分匹配时处于活动状态，甚至还涉及搜索参数和位置状态的更多边缘情况。

```jsx
// @reach/router
function SomeCustomLink() {
  return (
    <Link
      to="/some/where/cool"
      getProps={(obj) => {
        let {
          isCurrent,
          isPartiallyCurrent,
          href,
          location,
        } = obj;
        // do what you will
      }}
    />
  );
}

// React Router
import { useLocation, useMatch } from "react-router-dom";

function SomeCustomLink() {
  let to = "/some/where/cool";
  let match = useMatch(to);
  let { isExact } = useMatch(to);
  let location = useLocation();
  return <Link to={to} />;
}
```

让我们看一些不太一般的例子。

```jsx
// @reach/router
function ExactNavLink(props) {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active" } : {};
  };
  return <Link getProps={isActive} {...props} />;
}

// React Router v6
function ExactNavLink(props) {
  return (
    <Link
      // If you only need the active state for styling without
      // overriding the default isActive state, we provide it as
      // a named argument in a function that can be passed to
      // either `className` or `style` props
      className={({ isActive }) =>
        isActive ? "active" : ""
      }
      {...props}
    />
  );
}

// A link that is active when itself or deeper routes are current

// @reach/router
function PartialNavLink(props) {
  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent
      ? { className: "active" }
      : {};
  };
  return <Link getProps={isPartiallyActive} {...props} />;
}

// React Router v6
function PartialNavLink(props) {
  // add the wild card to match deeper URLs
  let match = useMatch(props.to + "/*");
  return (
    <Link className={match ? "active" : ""} {...props} />
  );
}
```

#### 合理解释

"Prop getters" 很笨拙，几乎总是可以用 hook 替换。这还允许您使用其他 hook，比如 `useLocation` ，并且可以做更多自定义的事情，比如使用搜索字符串使链接处于活动状态：

```jsx
function RecentPostsLink(props) {
  let match = useMatch("/posts");
  let location = useLocation();
  let isActive =
    match && location.search === "?view=recent";
  return (
    <Link className={isActive ? "active" : ""}>Recent</Link>
  );
}
```

### `useMatch`

`useMatch` 的签名在React Router v6中略有不同。

```jsx
// @reach/router
let {
  uri,
  path,

  // params are merged into the object with uri and path
  eventId,
} = useMatch("/events/:eventId");

// React Router v6
let {
  url,
  path,

  // params get their own key on the match
  params: { eventId },
} = useMatch("/events/:eventId");
```

还要注意从 `uri -> url` 的更改。

#### 合理解释

只是感觉将参数与URL和路径分开更加清晰。

此外，没有人知道URL和URI之间的区别，因此我们不想开始一堆关于它的学究争论。React Router总是称其为URL，并且它有更多的生产应用程序，因此我们使用URL而不是URI。

### `<Match />`

在React Router v6中没有 `<Match/>` 组件。它使用渲染属性来组合行为，但现在我们有了hooks。

如果您喜欢它，或者只是不想更新您的代码，那么很容易进行回溯：

```jsx
function Match({ path, children }) {
  let match = useMatch(path);
  let location = useLocation();
  let navigate = useNavigate();
  return children({ match, location, navigate });
}
```

#### 合理解释

渲染属性现在有点恶心（ew！），因为我们有了hooks。

### `<ServerLocation />`

这里真的很简单：

```jsx
// @reach/router
import { ServerLocation } from "@reach/router";

createServer((req, res) => {
  let markup = ReactDOMServer.renderToString(
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  req.send(markup);
});

// React Router v6
// note the import path from react-router-dom/server!
import { StaticRouter } from "react-router-dom/server";

createServer((req, res) => {
  let markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  req.send(markup);
});
```

## 反馈!

请告诉我们这篇指南是否有帮助：

*打开一个 Pull Request*：请添加任何我们错过的迁移，以满足您的需求。

*General Feedback*: [@remix_run](https://twitter.com/remix_run) on Twitter, or email [hello@remix.run](mailto:hello@remix.run).
*一般反馈*： [@remix_run](https://twitter.com/remix_run) 在 Twitter 上，或发送电子邮件至[hello@remix.run](mailto:hello@remix.run)。

感谢!