#  主要概念

> 此文档需要更新为 6.4 数据 `API`
>
> 本文档深入探讨了React Router实现的路由核心概念。它相当长，如果您正在寻找更实用的指南，请查看我们的[快速入门教程](https://reactrouter.com/en/main/start/tutorial)。
>

您可能想知道 `React Router` 到底是做什么的。它如何帮助您构建应用程序？到底什么是**路由**？

如果您曾经有过这些问题，或者您只是想深入了解路由的基本组成部分，那么您来对地方了。本文档详细解释了 `React Router` 实现的所有路由核心概念。

请不要让本文档让您感到不知所措！对于日常使用，`React Router` 非常简单。您不需要深入了解它。

`React Router` 不仅仅是将 `URL` 与函数或组件匹配：它还涉及构建与 `URL` 相对应的完整用户界面，因此它可能比您想象的概念更多。我们将详细介绍 `React Router` 的三个主要任务：

1. 订阅和操作[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)
2. 将[URL](https://reactrouter.com/en/main/start/concepts#url)与您的[路由](https://reactrouter.com/en/main/start/concepts#route-config)匹配
3. 从[路由匹配中](https://reactrouter.com/en/main/start/concepts#matches)渲染嵌套的 UI

## 定义

但首先，先来一些定义！关于后端和前端框架的路由有很多不同的想法。有时，一个词在一个上下文中可能与另一个上下文中的意义不同。

以下是我们在谈论 `React Router` 时经常使用的一些词语。本指南的其余部分将详细介绍每个词语。

- **URL** - 地址栏中的`URL`。很多人将“URL”和“路由”视为可互换使用的术语，但在 `React Router` 中，这不是路由，它只是一个`URL`。
- **位置** - 这是一个基于内置浏览器 `window.location` 对象的`React Router`特定对象。它表示“用户所在的位置”。它主要是`URL`的对象表示，但比`URL`多一些。
- **位置状态** - 与未在[URL](https://reactrouter.com/en/main/start/concepts#url)中编码的[位置](https://reactrouter.com/en/main/start/concepts#location)一起持久存在的值。与哈希或搜索参数（在`URL`中编码的数据）类似，但在浏览器的内存中隐式存储。
- **历史堆栈** - 当用户导航时，浏览器会在堆栈中跟踪每个[位置](https://reactrouter.com/en/main/start/concepts#location)。如果在浏览器中单击并按住后退按钮，则可以在那里看到浏览器的历史堆栈。
- **客户端路由 (CSR)** - 普通的`HTML`文档可以链接到其他文档，浏览器自己处理[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。客户端路由使开发人员能够在不向服务器发出文档请求的情况下操作浏览器历史堆栈。
- **历史记录** - 一个对象，允许 React Router 订阅[`URL`](https://reactrouter.com/en/main/start/concepts#url)的更改，并提供编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)的`API`。
- **历史记录操作**-其中之一为`POP`、`PUSH`或`REPLACE`。用户可能因以下三种原因之一而到达[`URL`](https://reactrouter.com/en/main/start/concepts#url)。当向历史记录堆栈添加新条目时进行推送（通常是链接单击或程序员强制导航）。替换类似，只是替换堆栈上的当前条目而不是推送新条目。最后，当用户在浏览器 Chrome 中单击后退或前进按钮时，会发生弹出。
- **段**-[`URL`](https://reactrouter.com/en/main/start/concepts#url)或[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)中`/`字符之间的部分。例如，“/users/123”有两个段。
- **路径模式**- 它们看起来像`URL`，但可以具有用于将`URL`与路由匹配的特殊字符，如**动态段**(`"/users/:userId"`) 或**星号段**(`"/docs/*"`)。它们不是`URL`，而是`React Router`将匹配的模式。
- **动态段**- 路径模式的一部分，是动态的，意味着它可以匹配段中的任何值。例如，模式 `/users/:userId` 将匹配像 `/users/123` 这样的`URL`。
- **URL 参数**- 与动态段匹配的`URL`的解析值。
- **Router**- 有状态的顶级组件，使所有其他组件和钩子工作。
- **路由配置** -一组路由对象的树，将与当前位置进行排名和匹配（嵌套）以创建**路由匹配**的分支。
- **路由**- 一个对象或路由元素，通常具有形状 `{ path, element }` 或 `<Route path element>` 。 `path` 是路径模式。当路径模式与当前`URL`匹配时，该元素将被渲染。
- **路由元素**- 或者**`<Route>`**。该元素的`props`被读取以通过`<Routes>`创建[路由](https://reactrouter.com/en/main/start/concepts#route)，但除此之外不起作用。
- **嵌套路由**- 因为路由可以有子路由，并且每个路由通过[ 段 ](https://reactrouter.com/en/main/start/concepts#segment)定义[`URL`](https://reactrouter.com/en/main/start/concepts#url)的一部分，所以单个`URL`可以在树的嵌套“分支”中匹配多个路由。这使得通过[`outlet`](https://reactrouter.com/en/main/start/concepts#outlet)、[ 相对链接](https://reactrouter.com/en/main/start/concepts#relative-links)等实现自动布局嵌套成为可能。
- **相对链接**- 不以 `/` 开头的链接将继承它们呈现的最近的路由。这使得在不必知道和构建整个路径的情况下链接到更深的`URL`变得容易。
- **匹配**- 一个对象，它在路由匹配 URL 时保存信息，例如匹配的[`URL`参数](https://reactrouter.com/en/main/start/concepts#url-params)和路径名。
- **匹配项**-与当前[位置](https://reactrouter.com/en/main/start/concepts#location)匹配的路由数组（或[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)的分支）。此结构使[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)成为可能。
- **父路由**- 具有子路由的路由。
- **Outlet** - 在一组匹配项中渲染下一个[匹配项](https://reactrouter.com/en/main/start/concepts#match)的组件。
- **索引路由** - 没有路径的子路由，在父路由的[`URL`](https://reactrouter.com/en/main/start/concepts#url)上父路由的[`Outlet`](https://reactrouter.com/en/main/start/concepts#outlet)处渲染。
- **布局路由**- 没有路径的**父路由**，专门用于在特定布局内分组子路由。

## 历史和位置

在`React Router`可以执行任何操作之前，它必须能够订阅浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的更改。

浏览器在用户浏览时维护自己的历史记录堆栈。这就是后退和前进按钮可以工作的原因。在传统网站（没有`JavaScript`的`HTML`文档）中，浏览器每次用户点击链接、提交表单或点击后退和前进按钮时都会向服务器发出请求。

例如，考虑用户：

1. 点击链接`/dashboard`
2. 点击链接`/accounts`
3. 点击链接`/customers/123`
4. 点击后退按钮
5. 点击链接`/dashboard`

历史记录堆栈将按以下方式更改，其中**粗体**条目表示当前[`URL`](https://reactrouter.com/en/main/start/concepts#url)：

1. **`/dashboard`**
2. `/dashboard`,**`/accounts`**
3. `/dashboard`, `/accounts`,**`/customers/123`**
4. `/dashboard`, **`/accounts`**,`/customers/123`
5. `/dashboard`, `/accounts`,**`/dashboard`**

### 历史记录对象

通过**客户端路由**，开发人员能够以编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。我们可以编写以下代码来更改[`URL`](https://reactrouter.com/en/main/start/concepts#url)，而不会触发浏览器默认行为，即向服务器发出请求：

```jsx
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

> 仅供说明，不要直接在`React Router`中使用 `window.history.pushState` 。
>

此代码更改[URL](https://reactrouter.com/en/main/start/concepts#url)但不对 UI 执行任何操作。我们需要编写更多代码来更改某处的某些状态，以使 UI 更改为联系人页面。麻烦的是，浏览器没有给我们一个方法来“监听 URL”并订阅这样的变化。

嗯，这不完全正确。[我们可以通过pop](https://reactrouter.com/en/main/start/concepts#history-actions)事件监听 URL 的变化：

```javascript
window.addEventListener("popstate", () => {
  // URL changed!
});
```

但这只会在用户单击后退或前进按钮时触发。没有关于程序员何时调用`window.history.pushState`or的事件`window.history.replaceState`。

这就是 React Router 特定`history`对象发挥作用的地方。它提供了一种“侦听[URL](https://reactrouter.com/en/main/start/concepts#url) ”更改[历史操作](https://reactrouter.com/en/main/start/concepts#history-actions)是**推送**、**弹出**还是**替换**的方法。

```javascript
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

应用程序不需要设置自己的历史记录对象——这是`<Router>`. 它设置这些对象之一，订阅[历史栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的变化，最后在[URL](https://reactrouter.com/en/main/start/concepts#url)变化时更新它的状态。这会导致应用重新呈现并显示正确的 UI。它唯一需要放在状态上的是一个`location`，其他一切都从那个单一的对象开始。

### 地点

浏览器在 上有一个位置对象`window.location`。它会告诉您有关[URL](https://reactrouter.com/en/main/start/concepts#url)的信息，但也有一些方法可以更改它：

```javascript
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh w/ the server
// and a lot more
```

为了说明。你通常不会`window.location`在 React Router 应用程序中工作

React Router 没有使用 ，而是有一个[位置](https://reactrouter.com/en/main/start/concepts#location)`window.location`的概念，该位置是在其后设计的，但要简单得多。它看起来像这样：`window.location`

```json
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

前三个：`{ pathname, search, hash }`完全一样`window.location`。如果您只是将这三个相加，您将获得用户在浏览器中看到的[URL ：](https://reactrouter.com/en/main/start/concepts#url)

```javascript
location.pathname + location.search + location.hash;
// /bbq/pig-pickins?campaign=instagram#menu
```

最后两个`{ state, key }`是 React Router 特定的。

**位置路径名**

这是[URL](https://reactrouter.com/en/main/start/concepts#url)后面的部分，所以`https://example.com/teams/hotspurs`路径名是`/teams/hotspurs`. 这是路由匹配的位置的唯一部分。

**位置搜索**

[人们对URL](https://reactrouter.com/en/main/start/concepts#url)的这一部分使用了很多不同的术语：

- 位置搜索
- 搜索参数
- URL 搜索参数
- 请求参数

在 React Router 中，我们称之为“位置搜索”。但是，位置搜索是 . 的序列化版本[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。所以有时我们也可以将其称为“URL 搜索参数”。

```javascript
// given a location like this:
let location = {
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram&popular=true",
  hash: "",
  state: null,
  key: "aefz24ie",
};

// we can turn the location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.get("popular"); // "true"
params.toString(); // "campaign=instagram&popular=true",
```

精确时，将序列化字符串版本称为“搜索”，将解析后的版本称为“搜索参数”，但当精度不重要时，通常可以互换使用这些术语。

**位置哈希**

*URL 中的散列表示当前页面上的*滚动位置。在引入 API 之前，Web 开发人员专门使用[URL](https://reactrouter.com/en/main/start/concepts#url)`window.history.pushState`的哈希部分进行客户端路由，这是我们唯一可以在不向服务器发出新请求的情况下进行操作的部分。但是，今天我们可以将其用于其设计目的。

**位置状态**

您可能想知道为什么`window.history.pushState()`API 被称为“推送状态”。状态？我们不只是更改[URL](https://reactrouter.com/en/main/start/concepts#url)吗？不应该`history.push`吗？好吧，当设计 API 时我们不在场，所以我们不确定为什么“状态”是焦点，但它仍然是浏览器的一个很酷的功能。

浏览器让我们通过将值传递给 来保存有关导航的信息`pushState`。当用户单击返回时，值 on`history.state`更改为之前“推送”的值。

```javascript
window.history.pushState("look ma!", undefined, "/contact");
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

为了说明。你不会`history.state`直接在 React Router 应用程序中阅读

React Router 利用了这个浏览器特性，对其进行了一些抽象，并将值显示在`location`而不是`history`.

您可以考虑`location.state`just like`location.hash`或`location.search`except 而不是将值放在它隐藏的[URL](https://reactrouter.com/en/main/start/concepts#url)中——就像只有程序员知道的 URL 的超级机密部分。

位置状态的几个重要用例是：

- 告诉下一页用户来自哪里并分支 UI。这里最流行的实现是，如果用户单击网格视图中的项目，则在模式中显示记录，但如果他们直接显示到 URL，则在其自己的布局中显示记录（pinterest，旧 instagram）。
- 将列表中的部分记录发送到下一个屏幕，以便它可以立即呈现部分数据，然后再获取其余数据。

您可以通过两种方式设置位置状态：打开`<Link>`或`navigate`：

```javascript
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

在下一页上，您可以通过以下方式访问它`useLocation`：

```javascript
let location = useLocation();
location.state;
```

位置状态值将被序列化，因此类似的东西`new Date()`将变成一个字符串。

**定位键**

每个位置都有一个唯一的密钥。这对于基于位置的滚动管理、客户端数据缓存等高级案例很有用。因为每个新位置都有一个唯一的键，所以您可以构建将信息存储在普通对象、`new Map()`甚至中的抽象`locationStorage`。

例如，一个非常基本的客户端数据缓存可以通过位置键（和获取[URL](https://reactrouter.com/en/main/start/concepts#url)）存储值，并在用户点击返回时跳过获取数据：

```javascript
let cache = new Map();

function useFakeFetch(URL) {
  let location = useLocation();
  let cacheKey = location.key + URL;
  let cached = cache.get(cacheKey);

  let [data, setData] = useState(() => {
    // initialize from the cache
    return cached || null;
  });

  let [state, setState] = useState(() => {
    // avoid the fetch if cached
    return cached ? "done" : "loading";
  });

  useEffect(() => {
    if (state === "loading") {
      let controller = new AbortController();
      fetch(URL, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          if (controller.signal.aborted) return;
          // set the cache
          cache.set(cacheKey, data);
          setData(data);
        });
      return () => controller.abort();
    }
  }, [state, cacheKey]);

  useEffect(() => {
    setState("loading");
  }, [URL]);

  return data;
}
```

## 匹配

在初始渲染时，当[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)发生变化时，React Router 会将[位置](https://reactrouter.com/en/main/start/concepts#location)与您的[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)进行匹配，以得出一组要渲染的[匹配项。](https://reactrouter.com/en/main/start/concepts#match)

### 定义路线

路由配置是一棵[路由](https://reactrouter.com/en/main/start/concepts#route)树，看起来像这样：

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

该`<Routes>`组件通过其递归`props.children`，剥离它们的道具，并生成如下所示的对象：

```javascript
let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ":teamId",
            element: <Team />,
          },
          {
            path: ":teamId/edit",
            element: <EditTeam />,
          },
          {
            path: "new",
            element: <NewTeamForm />,
          },
        ],
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy",
      },
      {
        element: <Tos />,
        path: "/tos",
      },
    ],
  },
  {
    element: <Contact />,
    path: "/contact-us",
  },
];
```

实际上，`<Routes>`您可以使用钩子`useRoutes(routesGoHere)`代替。这就是所有`<Routes>`正在做的。

如您所见，路由可以定义多个[段](https://reactrouter.com/en/main/start/concepts#segment)，例如`:teamId/edit`，或仅定义一个段，例如`:teamId`。[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)分支下的所有段都加在一起以创建路由的最终[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)。

### 匹配参数

注意`:teamId`细分。这就是我们所说的[路径模式的](https://reactrouter.com/en/main/start/concepts#path-pattern)[动态段](https://reactrouter.com/en/main/start/concepts#dynamic-segment)，这意味着它不静态匹配 URL（实际字符），而是动态匹配它。任何值都可以填写 for 。两者或将匹配。我们将解析后的值称为[URL 参数](https://reactrouter.com/en/main/start/concepts#url-params)。所以在这种情况下，我们的参数将是or 。[我们将在渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分了解如何在您的应用程序中使用它们。`:teamId``/teams/123``/teams/cupcakes``teamId``"123"``"cupcakes"`

### 排名路线

如果我们将[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)的所有分支的所有段相加，我们最终会得到我们的应用程序响应的以下路径模式：

```json
[
  "/",
  "/teams",
  "/teams/:teamId",
  "/teams/:teamId/edit",
  "/teams/new",
  "/privacy",
  "/tos",
  "/contact-us",
];
```

现在事情变得非常有趣了。考虑[URL](https://reactrouter.com/en/main/start/concepts#url) `/teams/new`。该列表中的哪个模式与 URL 匹配？

没错，就是他们两个！

```javascript
/teams/new
/teams/:teamId
```

React Router 必须在这里做出决定，只能有一个。许多路由器，包括客户端和服务器端，将简单地按照它们定义的顺序处理模式。先匹配者获胜。在这种情况下，我们将匹配`/`并渲染`<Home/>`组件。绝对不是我们想要的。这些类型的路由器要求我们完美地排序我们的路由以获得预期的结果。这就是 React Router 在 v6 之前的工作方式，但现在它更加智能。

查看这些模式，您直观地知道我们要`/teams/new`匹配 URL `/teams/new`。这是一个绝配！React Router 也知道这一点。匹配时，它会根据段数、静态段、动态段、星型等对您的路线进行排名，并选择最具体的匹配项。您永远不必考虑订购路线。

### 无路径路线

您可能已经注意到之前的奇怪路线：

```javascript
<Route index element={<Home />} />
<Route index element={<LeagueStandings />} />
<Route element={<PageLayout />} />
```

他们连路都没有，怎么可能是路线呢？这就是 React Router 中“路由”这个词被随意使用的地方。`<Home/>`并且`<LeagueStandings/>`是[索引路线](https://reactrouter.com/en/main/start/concepts#index-route)并且`<PageLayout/>`是[布局路线](https://reactrouter.com/en/main/start/concepts#layout-route)。[我们将在渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分讨论它们的工作原理。两者都与匹配没有太大关系。

### 路线匹配

当路由与 URL 匹配时，它由[匹配](https://reactrouter.com/en/main/start/concepts#match)对象表示。的匹配`<Route path=":teamId" element={<Team/>}/>`看起来像这样：

```javascript
{
  pathname: "/teams/firebirds",
  params: {
    teamId: "firebirds"
  },
  route: {
    element: <Team />,
    path: ":teamId"
  }
}
pathname`保留与此路由匹配的 URL 部分（在我们的例子中是全部）。保存来自任何匹配的[动态段](https://reactrouter.com/en/main/start/concepts#dynamic-segment)`params`的解析值。请注意，参数的对象键直接映射到段的名称：成为.`:teamId``params.teamId
```

因为我们的路由是一棵树，所以单个 URL 可以匹配树的整个分支。考虑 URL `/teams/firebirds`，它将是以下路由分支：

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

[React Router 将从这些路由和 url 创建一个匹配](https://reactrouter.com/en/main/start/concepts#match)数组，以便它可以呈现与路由嵌套匹配的嵌套 UI。

```javascript
[
  {
    pathname: "/",
    params: null,
    route: {
      element: <App />,
      path: "/",
    },
  },
  {
    pathname: "/teams",
    params: null,
    route: {
      element: <Teams />,
      path: "teams",
    },
  },
  {
    pathname: "/teams/firebirds",
    params: {
      teamId: "firebirds",
    },
    route: {
      element: <Team />,
      path: ":teamId",
    },
  },
];
```

## 渲染

最后一个概念是渲染。假设您的应用程序入口如下所示：

```javascript
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
      <Route path="contact-us" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
```

让我们`/teams/firebirds`再次以 URL 为例。`<Routes>`会将[位置](https://reactrouter.com/en/main/start/concepts#location)与您的[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)相匹配，获取一组[匹配](https://reactrouter.com/en/main/start/concepts#match)项，然后像这样渲染 React 元素树：

```javascript
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

在父路由元素中呈现的每个匹配项都是一个非常强大的抽象。大多数网站和应用程序都具有此特征：框内框内框内框，每个框内都有一个导航部分，可更改页面的子部分。

### 奥特莱斯

这个嵌套元素树不会自动发生。`<Routes>`将为您呈现第一个匹配项的元素（在我们的例子中是`<App/>`）。下一个匹配的元素是`<Teams>`。为了渲染它，`App`需要渲染一个[outlet](https://reactrouter.com/en/main/start/concepts#outlet)。

```javascript
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />
      <GlobalFooter />
    </div>
  );
}
```

该`Outlet`组件将始终呈现下一个匹配项。也就是说`<Teams>`还需要一个出口来渲染`<Team/>`。

如果 URL 是`/contact-us`，元素树将更改为：

```javascript
<ContactForm />
```

因为联系表不在主`<App>`路由下。

如果 URL 是`/teams/firebirds/edit`，元素树将更改为：

```javascript
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

出口将孩子换成匹配的新孩子，但父布局仍然存在。它很微妙，但在清理组件方面非常有效。

### 索引路线

记住[路由](https://reactrouter.com/en/main/start/concepts#route-config)`/teams`配置：

```javascript
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
  <Route index element={<LeagueStandings />} />
</Route>
```

如果 URL 是`/teams/firebirds`，则元素树将是：

```javascript
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

但如果 URL 是`/teams`，则元素树将是：

```javascript
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```

联赛积分榜？到底是怎么`<Route index element={<LeagueStandings>}/>`进来的？它甚至没有路径！原因是它是一个[索引路由](https://reactrouter.com/en/main/start/concepts#index-route)。[索引路由在父路由路径的父路由出口](https://reactrouter.com/en/main/start/concepts#outlet)中呈现。

以这种方式思考，如果您不在其中一个子路由路径中，则`<Outlet>`不会在 UI 中呈现任何内容：

```javascript
<App>
  <Teams />
</App>
```

如果所有团队都在左侧的列表中，那么一个空的出口意味着您在右侧有一个空白页面！您的 UI 需要一些东西来填充空间：索引路由以进行救援。

考虑索引路由的另一种方式是，当父路由匹配但其子路由都不匹配时，它是默认的子路由。

根据用户界面的不同，您可能不需要索引路由，但如果父路由中有任何类型的持久导航，您很可能希望索引路由在用户未单击其中一项时填充空间然而。

### 布局路线

这是我们尚未匹配的路由配置的一部分：`/privacy`。让我们再次查看路由配置，突出显示匹配的路由：

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

渲染的结果元素树将是：

```javascript
<PageLayout>
  <Privacy />
</PageLayout>
```

这`PageLayout`条路线确实很奇怪。我们称它为[布局路由](https://reactrouter.com/en/main/start/concepts#layout-route)，因为它根本不参与匹配（尽管它的子级参与）。它的存在只是为了使在同一布局中包装多个子路由更简单。如果我们不允许这样做，那么您将不得不以两种不同的方式处理布局：有时您的路线会为您完成，有时您会手动完成，并在整个应用程序中重复使用大量布局组件：

你可以这样做，但我们建议使用布局路线

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route
    path="/privacy"
    element={
      <PageLayout>
        <Privacy />
      </PageLayout>
    }
  />
  <Route
    path="/tos"
    element={
      <PageLayout>
        <Tos />
      </PageLayout>
    }
  />
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

所以，是的，布局“路由”的语义有点愚蠢，因为它与 URL 匹配无关，但它太方便了，不允许。

## 导航

当[URL](https://reactrouter.com/en/main/start/concepts#url)改变时，我们称之为“导航”。在 React Router 中有两种导航方式：

- `<Link>`
- `navigate`

### 关联

这是导航的主要方式。呈现 a`<Link>`允许用户在单击它时更改 URL。React Router 将阻止浏览器的默认行为，并告诉[历史](https://reactrouter.com/en/main/start/concepts#history)将新条目推送到[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中。[位置](https://reactrouter.com/en/main/start/concepts#location)发生变化，新的匹配[项](https://reactrouter.com/en/main/start/concepts#match)将呈现。

但是，链接是可访问的，因为它们：

- 仍然呈现一个`<a href>`所以所有默认的可访问性问题都得到满足（如键盘、可聚焦性、SEO 等）
- 如果是右键单击或命令/控制单击以“在新选项卡中打开”，请不要阻止浏览器的默认行为

[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)不仅仅是关于渲染布局；他们还启用“相对链接”。考虑我们`teams`之前的路线：

```javascript
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

该`<Teams>`组件可以呈现如下链接：

```javascript
<Link to="psg" />
<Link to="new" />
```

它链接到的完整路径将是`/teams/psg`和`/teams/new`。它们继承了呈现它们的路线。这使得您的路由组件不必真正了解应用程序中其余路由的任何信息。大量的链接只会[更深](https://reactrouter.com/en/main/start/concepts#segment)一层。您可以重新安排整个[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，这些链接可能仍然可以正常工作。这在开始构建站点并且设计和布局不断变化时非常有价值。

### 导航功能

这个函数是从`useNavigate`钩子返回的，它允许你，程序员，随时更改 URL。您可以在超时时执行此操作：

```javascript
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }, 30000);
}, []);
```

或者在提交表单后：

```javascript
<form onSubmit={event => {
  event.preventDefault();
  let data = new FormData(event.target)
  let urlEncoded = new URLSearchParams(data)
  navigate("/create", { state: urlEncoded })
}}>
```

与 ,一样`Link`，`navigate`也适用于嵌套的“to”值。

```javascript
navigate("psg");
```

您应该有充分的理由使用`navigate`而不是`<Link>`. 这让我们很伤心：

```javascript
<li onClick={() => navigate("/somewhere")} />
```

除了链接和表单之外，很少有交互应该更改 URL，因为它引入了围绕可访问性和用户期望的复杂性。

## 数据访问

最后，一个应用程序会想要向 React Router 询问一些信息以构建完整的 UI。为此，React Router 有一堆钩子

```javascript
let location = useLocation();
let urlParams = useParams();
let [urlSearchParams] = useSearchParams();
```

## 审查

让我们从头开始把它们放在一起！

1. 您呈现您的应用程序：

   ```javascript
   const root = ReactDOM.createRoot(
     document.getElementById("root")
   );
   root.render(
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<App />}>
           <Route index element={<Home />} />
           <Route path="teams" element={<Teams />}>
             <Route path=":teamId" element={<Team />} />
             <Route path="new" element={<NewTeamForm />} />
             <Route index element={<LeagueStandings />} />
           </Route>
         </Route>
         <Route element={<PageLayout />}>
           <Route path="/privacy" element={<Privacy />} />
           <Route path="/tos" element={<Tos />} />
         </Route>
         <Route path="contact-us" element={<Contact />} />
       </Routes>
     </BrowserRouter>
   );
   ```

2. `<BrowserRouter>`创建一个[history](https://reactrouter.com/en/main/start/concepts#history)，将初始[位置](https://reactrouter.com/en/main/start/concepts#location)放入状态，并订阅[URL](https://reactrouter.com/en/main/start/concepts#url)。

3. `<Routes>`递归其[子路由](https://reactrouter.com/en/main/start/concepts#child-route)以构建[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，将这些路由与[位置](https://reactrouter.com/en/main/start/concepts#location)匹配，创建一些路由[匹配](https://reactrouter.com/en/main/start/concepts#match)项，并呈现第一个匹配项的路由元素。

4. [`<Outlet>`](https://reactrouter.com/en/main/start/concepts#outlet)您在每个[父路由](https://reactrouter.com/en/main/start/concepts#parent-route)中呈现一个。

5. 出口呈现路线[匹配](https://reactrouter.com/en/main/start/concepts#match)中的下一场比赛。

6. 用户点击一个链接

7. 该链接调用`navigate()`

8. 历史[更改](https://reactrouter.com/en/main/start/concepts#history)URL 并通知`<BrowserRouter>`.

9. `<BrowserRouter>`重新渲染，从 (2) 重新开始！

就是这样！我们希望本指南能帮助您更深入地了解 React Router 中的主要概念。