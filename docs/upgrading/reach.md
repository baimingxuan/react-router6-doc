# 从 Reach Router 迁移到 React Router v6

> NOTE
>
> 本页面正在制作中。请告诉我们哪里有不足，以便我们尽可能顺利地进行迁移！

## 导言

当我们从 `@reach/router` 用户的角度出发构建 React Router v6 时，我们有这样几个目标：

- 保持较小的打包大小（实证明，我们的打包大小小于 `@reach/router`）
- 保留 `@reach/router` 的精华部分（嵌套路由，以及通过路径匹配和 `navigate` 简化的 API）
- 更新 API 以符合现代 React 的习惯用法（即 hooks）
- 为并发模式和暂停模式提供更好的支持
- 停止默认进行不够好的焦点管理

如果我们要制作 `@reach/router` v2，它将与 React Router v6 几乎一模一样。因此， `@reach/router` 的下一个版本就是 React Router v6。换句话说，不会有 `@reach/router` v2，因为它将与 React Router v6 一样。

`@reach/router` 1.3 和 React Router v6 的许多 API 实际上是相同的：

- 对路由进行排序和匹配
- 嵌套路由配置在这里
- `navigate` 具有相同的签名
- `Link` 具有相同的签名
- 1.3 中的所有钩子都是相同的（或几乎相同的）

大部分改动只是重命名而已。如果您碰巧写了一个 codemod，请与我们分享，我们会将其添加到本指南中！！

## 升级概述

在本指南中，我们将向您展示如何升级路由代码的每一部分。我们将循序渐进地进行升级，这样您就可以进行一些更改、发布，然后在方便的时候再次进行迁移。我们还会讨论一下 "为什么 "要做这些更改，看似简单的重命名其实背后有更大的原因。

### 首先：非破坏性更新

我们强烈建议您在迁移到 React Router v6 之前对代码进行以下更新。这些更改不必在您的应用程序中一次性完成，您只需更新一行，提交并发布即可。这样做将大大减少您在 React Router v6 中进行破坏性更改时的工作量。

1. 升级到React v16.8或更高版本
2. 升级到 `@reach/router` v1.3
3. 更新路由组件，以便从钩子访问数据
4. 在应用程序顶部添加 `<LocationProvider/>`

### 其次：破坏性更新

以下更改需要在整个应用程序中一次性完成。

1. 升级到 React Router v6
2. 将所有 `<Router>` 元素更新为 `<Routes>`
3. 将 `<RouteElement default/>` 更改为 `<RouteElement path="*" />`
4. 修复 `<Redirect />`
5. 使用钩子实现 `<Link getProps />`
6. 更新 `useMatch` ，参数已开启 `match.params` 
7. 将 `ServerLocation` 更改为 `StaticRouter`

## 非破坏性更新

### 升级到 React Router v6

React Router v6 大量使用了 [React hooks](https://reactjs.org/docs/hooks-intro.html)，因此在尝试升级到 React Router v6 之前，您需要使用 React 16.8 或更高版本。

升级到 React 16.8 后，您就可以部署应用程序了。然后，您可以稍后再回来继续之前的工作。

### 升级到 `@reach/router` v1.3.3

您只需安装 v1.3.3，然后部署应用程序即可。

```bash
npm install @reach/router@latest
```

### 更新路由组件以使用 hooks

您可以一次只更新一个路由组件，然后提交并部署。您不需要一次性更新整个应用程序。

在 `@reach/router` v1.3 中，我们添加了访问路由数据的钩子，以便为 React Router v6 做准备。如果您先完成这项工作，那么当您升级到 React Router v6 时，就可以少走很多弯路了。

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

#### 理由

所有这些数据都已存在于上下文中，但从上下文中访问这些数据对于应用程序代码来说很不方便，因此我们将其转储到了属性中。钩子简化了从上下文访问数据的过程，因此我们不再需要用路由信息来污染属性。

不污染属性对 TypeScript 也有一些帮助，而且还能避免在查看组件时怀疑属性的来源。如果您使用的是路由中的数据，现在就一目了然了。

此外，随着页面的增长，你会自然而然地将其分解为多个组件，并最终将数据“prop drilling”到树中的任意位置。现在，你可以在树的任何位置访问路由数据。这不仅更方便，而且使创建以路由为中心的可组合抽象成为可能。如果自定义钩子需要位置，现在只需通过 `useLocation()` 等请求即可。

### 添加 LocationProvider

虽然 `@reach/router` 并不要求在应用程序树的顶端提供位置提供程序，但 React Router v6 却要求，所以我们不妨现在就为此做好准备。

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

#### 理由

`@reach/router` 使用全局默认历史实例，该实例在模块中具有副作用，因此无论是否使用全局实例，都无法对模块进行`tree-shake`。此外，React Router 还提供了其他`history`类型（如哈希`history`），而 `@reach/router` 却没有提供，因此它总是需要一个顶级位置提供者（在 React Router 中，这些都是 `<BrowserRouter/>` 的朋友）。

此外，在 `<LocationProvider/>` 之外呈现的各种模块（如 `Router` 、 `Link` 和 `useLocation` ）都设置了自己的 URL 监听器。这通常不是问题，但每一点都很重要。将 `<LocationProvider />` 放在顶部可以让应用程序拥有一个单一的 URL 监听器。

## 破坏性更新

下一组更新需要一次性完成。幸运的是，大部分更新都只是简单的重命名。

你可以耍个小花招，在迁移时同时使用两个路由器，但绝对不能在这种状态下发送应用程序，因为它们不能互操作。一个路由器上的链接无法在另一个路由器上使用。不过，如果能在做出更改后刷新页面，看看自己是否正确地完成了这一步，那还是很不错的。

### 安装 React Router v6

```bash
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

您可能有多个，但通常只有一个在应用程序顶部附近。如果您有多个，请为每个都这样做。

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

`default` 属性告诉 `@reach/router` ，如果没有其他路由匹配，就使用该路由。在 React Router v6 中，您可以用通配符路径来解释这种行为。

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

呼......系好安全带。请把西红柿留着自制玛格丽塔披萨，而不是扔给我们。

我们已移除从 React Router 重定向的功能。因此，这意味着没有 `<Redirect/>` 、 `redirectTo` 或 `isRedirect` ，也没有替代的 API。请继续阅读 😅

在用户与您的应用程序交互时，不要将重定向与导航混为一谈。我们仍然支持根据用户交互进行导航。当我们谈论重定向时，我们是在谈论匹配时的重定向：

```jsx
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

`@reach/router` 中的重定向工作方式是一项实验。它 "抛出 "重定向，并通过 `componentDidCatch` 捕捉。这很酷，因为它会导致整个渲染树停止，然后从新的位置重新开始。几年前，当我们第一次发布这个项目时，与 React 团队的讨论让我们决定试一试。

在遇到一些问题（如应用级 `componentDidCatch` 需要重新抛出重定向）之后，我们决定在 React Router v6 中不再这样做。

但我们更进一步得出结论：重定向甚至都不是 React Router 的工作。您的动态 Web 服务器或静态文件服务器应该处理这个问题，并发送适当的响应状态代码（如 301 或 302）。

在 React Router 中匹配时重定向的功能，最好的情况是需要在两个地方（服务器和路由）配置重定向，最坏的情况是鼓励人们只在 React Router 中进行重定向，而 React Router 根本不会发送状态代码。

我们经常使用 firebase 托管，下面是我们更新一个应用程序的示例：

```jsx
// @reach/router
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

```js
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

无论我们是使用无服务器函数进行服务器渲染，还是仅将其用作静态文件服务器，这种方法都能奏效。所有虚拟主机服务都提供了配置方法。

#### 点击未更新的链接怎么办？

如果您的应用程序仍然挂着一个 `<Link to="/events" />` ，而用户点击了它，那么服务器并没有参与，因为您使用的是客户端路由器。您需要更加勤奋地更新链接😬。

另外，如果您希望允许过期链接，*并且意识到需要在客户端和服务器上配置重定向，*那么请继续复制并粘贴我们准备发送但后来删除的 `Redirect` 组件。

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

#### 理由

我们认为，如果不提供任何重定向 API，人们就更有可能正确配置它们。多年来，我们一直在不经意间鼓励不良做法，希望能停止这种做法🙈。

### `<Link getProps />`

这个 prop getter 对于将链接样式设置为 "活动 "非常有用。决定一个链接是否处于活动状态有点主观。有时你希望 URL 完全匹配时链接是活动的，有时你希望部分匹配时链接是活动的，还有更多涉及搜索参数和位置状态的边缘情况。

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

让我们来看一些不那么普遍的例子。

```jsx
// A custom nav link that is active when the URL matches the link's href exactly

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

#### 理由

"Prop getters" 非常笨拙，几乎可以用钩子来代替。这样还可以使用其他钩子（如 `useLocation` ），做更多自定义事情，如使用搜索字符串使链接激活：

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

`useMatch` 的签名在 React Router v6 中略有不同。

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

#### 理由

将参数与 URL 和路径分开会让人感觉更整洁。

此外，没有人知道 URL 和 URI 之间的区别，所以我们也不想在这方面引发一堆迂腐的争论。React Router 一直称之为 URL，而且它有更多的生产应用，所以我们使用了 URL 而不是 URI。

### `<Match />`

React Router v6 中没有 `<Match/>` 组件。它使用渲染属性来组合行为，但我们现在有了钩子。

如果你喜欢它，或者只是不想更新代码，很容易就能反向移植：

```jsx
function Match({ path, children }) {
  let match = useMatch(path);
  let location = useLocation();
  let navigate = useNavigate();
  return children({ match, location, navigate });
}
```

#### 理由

现在有了钩子，渲染属性就有点恶心了。

### `<ServerLocation />`

这里的重命名非常简单：

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

如果本指南对您有帮助，请告诉我们：

*打开一个 Pull Request*：请添加我们遗漏的任何您需要的迁移。

*General Feedback*: [@remix_run](https://twitter.com/remix_run) on Twitter, or email [hello@remix.run](mailto:hello@remix.run).
*一般反馈*：在 Twitter 上 [@remix_run](https://twitter.com/remix_run) 或发送电子邮件至[hello@remix.run](mailto:hello@remix.run)。

谢谢!