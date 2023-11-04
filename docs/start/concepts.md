# 主要概念

> IMPORTANT
>
> 本文档需要针对 6.4 数据 API 进行更新

> IMPORTANT
>
> 本文档深入探讨了在 React Router 中实现路由的核心概念。由于篇幅较长，如果您需要更实用的指南，请查看我们的[快速入门教程](https://reactrouter.com/en/main/start/tutorial)。

您可能想知道 React Router 究竟是做什么的。它如何帮助您构建应用程序？**路由**到底是什么？

如果你曾有过这些疑问，或者你只是想深入了解路由的基本原理，那你就找对地方了。本文档详细解释了 React Router 中实现的路由背后的所有核心概念。

请不要对本文档感到不知所措！对于日常使用来说，React Router 非常简单。你不需要深入研究才能使用它。

React Router 不仅仅是将 URL 与函数或组件进行匹配：它还要构建一个映射到 URL 的完整用户界面，因此其中的概念可能比你习惯的要多。我们将详细介绍 React Router 的三项主要工作：

1. 订阅和操作[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)
2. 将[URL](https://reactrouter.com/en/main/start/concepts#url)与[路由](https://reactrouter.com/en/main/start/concepts#route-config)相匹配
3. 通过[路由匹配](https://reactrouter.com/en/main/start/concepts#matches)渲染嵌套的用户界面

## 定义

但首先，我们需要了解一些定义！围绕路由，前后端框架有很多不同的想法。有时，一个词在一种语境中的含义可能与另一种语境不同。

以下是我们在谈论 React 路由器时经常用到的一些词。本指南的其余部分将详细介绍每一个词。

- **URL** - 地址栏中的 URL。很多人将 "URL "和 "路由 "互换使用，但在 React Router 中这不是路由，它只是一个 URL。
- **Location** - 这是一个基于内置浏览器 `window.location` 对象的 React Router 专用对象。它表示 "用户所在的位置"。它主要是 URL 的对象表示，但也有一些其他的含义。
- **Location状态** - 与[URL](https://reactrouter.com/en/main/start/concepts#url)中未编码的[位置](https://reactrouter.com/en/main/start/concepts#location)一起持续存在的值。与哈希或搜索参数（在URL中编码的数据）类似，但存储在浏览器内存中，不可见。
- **历史记录堆栈** - 当用户浏览时，浏览器会在堆栈中记录每个[位置](https://reactrouter.com/en/main/start/concepts#location)。如果在浏览器中点击并按住后退按钮，就能看到浏览器的历史记录堆栈。
- **客户端路由 (CSR)** - 纯 HTML 文档可以链接到其他文档，而浏览器会自行处理[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。客户端路由使开发人员无需向服务器发出文档请求就能操作浏览器的历史堆栈。
- **历史记录** - 一种允许 React Router 订阅 [URL](https://reactrouter.com/en/main/start/concepts#url) 变化的对象，同时还提供了以编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)的API。
- **历史记录操作**-`POP` 、 `PUSH` 或 `REPLACE` 中的一个。用户访问 URL 的原因有以下三种。新条目添加到历史记录堆栈时的`PUSH`（通常是链接点击或程序员强制导航）。`Replace`与此类似，只是替换的是堆栈中的当前条目，而不是推送新条目。最后，当用户点击浏览器 Chrome 浏览器中的 "后退 "或 "前进 "按钮时，就会发生 "弹出"。
- **段**- [URL](https://reactrouter.com/en/main/start/concepts#url) 或[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)中介于`/`字符之间的部分。例如，“/users/123”有两个片段。
- **路径模式**- 它们看起来像 URL，但可以包含特殊字符，用于将 URL 与路由相匹配，如**动态段** ( `"/users/:userId"` ) 或**星号段** ( `"/docs/*"` )。它们不是 URL，而是 React 路由器将匹配的模式。
- **动态段**- 路径模式中的动态段，即可以匹配段中的任何值。例如，模式 `/users/:userId` 将匹配 `/users/123`。
- **URL 参数**- 匹配动态段的 URL 的解析值。
- **Router**- 有状态的顶层组件，使所有其他组件和钩子都能工作。
- **路由配置** -一棵路由对象树，这些路由对象将根据当前位置进行排序和匹配（嵌套），以创建**路由匹配**分支。
- **Route**- 通常为 `{ path, element }` 或 `<Route path element>` 形状的对象或路由元素。 `path` 是一种路径模式。当路径模式与当前 URL 匹配时，将呈现该元素。
- **路由元素**- 或**`<Route>`**。通过 `<Routes>` 读取该元素的道具来创建[路由](https://reactrouter.com/en/main/start/concepts#route)，除此之外什么也不做。
- **嵌套路由**- 因为路由可以有子路由，而且每个路由通过[ 段 ](https://reactrouter.com/en/main/start/concepts#segment)定义 [URL](https://reactrouter.com/en/main/start/concepts#url) 的一部分，因此单个 URL 可以与树的嵌套 "分支 "中的多个路由匹配。这样就可以 [outlet](https://reactrouter.com/en/main/start/concepts#outlet)、[相对链接](https://reactrouter.com/en/main/start/concepts#relative-links)等实现自动布局嵌套。
- **相对链接**- 不以 `/` 开头的链接将继承其呈现的最近路径。这样就可以轻松链接到更深的 URL，而无需了解和建立整个路径。
- **匹配**- 一个对象，用于保存路由与 URL 匹配时的信息，如匹配的 [URL参数](https://reactrouter.com/en/main/start/concepts#url-params)和路径名。
- **匹配项**-与当前[位置](https://reactrouter.com/en/main/start/concepts#location)匹配的路由数组（或[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)的分支）。这种结构可以[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)。
- **父路由**- 具有子路由的路由。
- **Outlet** - 在一组匹配中渲染下一个[匹配项](https://reactrouter.com/en/main/start/concepts#match)的组件。
- **索引路由** - 没有路径的子路由，在父路由的 [Outlet](https://reactrouter.com/en/main/start/concepts#outlet) 中渲染父路由[URL](https://reactrouter.com/en/main/start/concepts#url)。
- **布局路由**- 没有路径的**父路由**，专门用于将子路由分组到特定布局中。

## 历史堆栈和位置

在 React Router 做任何事情之前，它必须能够订阅浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的变化。

浏览器会在用户浏览时维护自己的历史记录堆栈。这就是后退和前进按钮的工作原理。在传统网站（不含 JavaScript 的 HTML 文档）中，每次用户点击链接、提交表单或点击后退和前进按钮时，浏览器都会向服务器发出请求。

例如，假设用户：

1. 点击链接`/dashboard`
2. 点击链接`/accounts`
3. 点击链接`/customers/123`
4. 点击返回按钮
5. 点击链接`/dashboard`

历史记录堆栈将发生如下变化，其中**粗体**条目表示当前 [URL](https://reactrouter.com/en/main/start/concepts#url)：

1. **`/dashboard`**
2. `/dashboard`,**`/accounts`**
3. `/dashboard`, `/accounts`,**`/customers/123`**
4. `/dashboard`, **`/accounts`**,`/customers/123`
5. `/dashboard`, `/accounts`,**`/dashboard`**

### 历史记录对象

有了**客户端路由**，开发人员就能以编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。例如，我们可以编写这样的代码来更改[`URL`](https://reactrouter.com/en/main/start/concepts#url)，而无需使用浏览器向服务器发出请求的默认行为：

```js
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

> IMPORTANT
>
> 仅供参考，请勿在 React 路由器中直接使用 `window.history.pushState`。

这段代码改变了[URL](https://reactrouter.com/en/main/start/concepts#url)，但对用户界面没有任何作用。我们需要编写更多代码，改变某个地方的状态，才能让用户界面切换到联系页面。问题是，浏览器并没有提供 "监听 URL "和订阅此类更改的方法。

其实也不尽然。我们可以通过 [pop](https://reactrouter.com/en/main/start/concepts#history-actions) 事件监听 URL 的变化：

```js
window.addEventListener("popstate", () => {
  // URL changed!
});
```

但这只有在用户点击后退或前进按钮时才会触发。程序员调用 `window.history.pushState` 或 `window.history.replaceState` 时并没有事件发生。

这就是 React Router 特有的 `history` 对象发挥作用的地方。它提供了一种“监听 [URL](https://reactrouter.com/en/main/start/concepts#url) ”变化的方法，无论[历史记录操作](https://reactrouter.com/en/main/start/concepts#history-actions)是 **push**、**pop** 还是 **replace**。

```js
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

应用程序无需设置自己的历史对象，那是 `<Router>` 的工作。它会设置其中一个对象，订阅[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的变化，最后在 [URL](https://reactrouter.com/en/main/start/concepts#url) 发生变化时更新其状态。这将导致应用程序重新渲染并显示正确的用户界面。它唯一需要放在状态中的是一个 `location` ，其他所有操作都是通过这个单一对象完成的。

### 位置

浏览器在 `window.location` 上有一个位置对象。它能告诉你有关 [URL](https://reactrouter.com/en/main/start/concepts#url) 的信息，但也有一些更改 URL 的方法：

```js
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh w/ the server
// and a lot more
```

> IMPORTANT
>
> 举例说明。您通常不会在 React Router 应用程序中使用 `window.location`

与使用 `window.location` 不同，React Router 有一个[位置](https://reactrouter.com/en/main/start/concepts#location)的概念，其模式与 `window.location` 相同，但要简单得多。它看起来像这样:

```js
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

前三个： `{ pathname, search, hash }` 与 `window.location` 完全相同。如果把这三个加起来，就能得到用户在浏览器中看到的 [URL](https://reactrouter.com/en/main/start/concepts#url):

```js
location.pathname + location.search + location.hash;
// /bbq/pig-pickins?campaign=instagram#menu
```

后两个 `{ state, key }` 是 React Router 专用的。

**位置路径名**

这是 [URL](https://reactrouter.com/en/main/start/concepts#url) 起源之后的部分，因此 `https://example.com/teams/hotspurs` 的路径名是 `/teams/hotspurs` 。这是路由匹配的唯一位置部分。

**位置搜索**

人们对 [URL](https://reactrouter.com/en/main/start/concepts#url) 的这个部分使用了很多不同的术语：

- 位置搜索
- 搜索参数
- URL 搜索参数
- 查询字符串

在 React Router 中，我们称之为 "位置搜索"。不过，位置搜索是[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)的序列化版本。因此，有时我们也会称其为 "URL search params"。

```js
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
params.toString(); // "campaign=instagram&popular=true"
```

为了准确起见，我们将序列化的字符串版本称为 "search"，将解析后的版本称为 "search params"，但在准确性并不重要的情况下，我们通常会交替使用这两个术语。

**位置哈希**

URL 中的哈希值表示*当前页面的* 滚动位置。 在 `window.history.pushState` API 推出之前，网络开发人员只使用 [URL](https://reactrouter.com/en/main/start/concepts#url) 的哈希值部分进行客户端路由，这是我们唯一可以在不向服务器发出新请求的情况下进行操作的部分。不过，如今我们可以将其用于设计目的。

**位置状态**

您可能想知道为什么 `window.history.pushState()` API 被称为 "推送状态"。状态？我们不就是换了个 [URL](https://reactrouter.com/en/main/start/concepts#url) 吗？不应该是 `history.push` 吗？设计 API 时我们并不在场，所以我们也不清楚为什么 "状态 "是重点，但它确实是浏览器的一项很酷的功能。

浏览器通过向 `pushState` 传递一个值，让我们持久保存导航信息。当用户点击返回时， `history.state` 上的值就会变成之前 "推送 "的值。

```js
window.history.pushState("look ma!", undefined, "/contact");
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

> IMPORTANT
>
> 举例说明。在 React Router 应用程序中不能直接读取 `history.state`。

eact Router 利用了浏览器的这一特性，对其进行了一些抽象，并在 `location` 而不是 `history` 上显示值。

你可以把 `location.state` 想象成 `location.hash` 或 `location.search` ，只不过它不是把值放在 URL 中，而是隐藏起来--就像 [URL](https://reactrouter.com/en/main/start/concepts#url) 中只有程序员知道的一个超级秘密部分。

位置状态的几个重要用例是：

- 告诉下一页用户从哪里来，并分支用户界面。这里最流行的实现方式是，如果用户点击了网格视图中的项目，则在模态中显示记录；但如果用户直接显示 URL，则在其自己的布局（pinterest、旧版 instagram）中显示记录。
- 将列表中的部分记录发送到下一个屏幕，以便立即呈现部分数据，然后再获取其余数据。

设置位置状态有两种方式： `<Link>` 或 `navigate` ：

```js
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

在下一页，您可以通过 `useLocation` 进行访问：

```js
let location = useLocation();
location.state;
```

> NOTE
>
> 位置状态值将被序列化，因此像 `new Date()` 这样的值将被转化为字符串。

**位置键**

每个位置都有一个唯一的密钥。这对基于位置的滚动管理、客户端数据缓存等高级应用非常有用。由于每个新位置都有一个唯一的键，因此您可以构建抽象，将信息存储在普通对象、 `new Map()` ，甚至 `locationStorage` 中。

例如，一个非常基本的客户端数据缓存可以按位置键（和获取 [URL](https://reactrouter.com/en/main/start/concepts#url)）存储值，并在用户点击返回时跳过获取数据：

```js
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

在初始渲染时，以及当[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)发生变化时，React Router 会将[位置](https://reactrouter.com/en/main/start/concepts#location)与[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)进行匹配，从而得出一组要呈现的[匹配](https://reactrouter.com/en/main/start/concepts#match)结果。

### 定义路由

路由配置是一棵[路由](https://reactrouter.com/en/main/start/concepts#route)树，看起来像这样：

```jsx
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

`<Routes>` 组件会遍历其 `props.children` ，剥离它们的属性，然后生成一个类似这样的对象：

```jsx
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

事实上，您可以使用钩子 `useRoutes(routesGoHere)` 来代替 `<Routes>` 。这就是 `<Routes>` 的全部功能。

如你所见，路由可以定义多个[片段](https://reactrouter.com/en/main/start/concepts#segment)，如`:teamId/edit`，也可以只定义一个，如 `:teamId` 。[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)分支下的所有片段都会加在一起，形成路由的最终[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)。

### 匹配参数

请注意`:teamId`段。这就是我们所说的[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)的[动态段](https://reactrouter.com/en/main/start/concepts#dynamic-segment)，也就是说，它不是静态匹配 URL（实际字符），而是动态匹配。任何值都可以填充 `:teamId` 。 `/teams/123` 或 `/teams/cupcakes` 都能匹配。我们将解析后的值称为[URL 参数](https://reactrouter.com/en/main/start/concepts#url-params)。因此，在本例中，我们的 `teamId` 参数将是 `"123"` 或 `"cupcakes"` 。我们将在[渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分了解如何在应用程序中使用它们。

### 路由排序

如果我们把[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)中所有分支的所有片段加起来，就会得到应用程序响应的以下路径模式：

```js
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

这才是真正有趣的地方。请看 [URL](https://reactrouter.com/en/main/start/concepts#url) `/teams/new`。列表中哪个模式与 URL 匹配？

没错，是两个！

```js
/teams/new
/teams/:teamId
```

React Router 必须在此做出决定，而且只能有一个决定。许多路由，无论是客户端还是服务器端，都会按照模式定义的顺序进行处理。先匹配者获胜。在这种情况下，我们将匹配 `/` 并呈现 `<Home/>` 组件。这绝对不是我们想要的结果。这类路由要求我们对路由进行完美排序，以获得预期结果。这就是 React 路由在 v6 之前的工作方式，但现在它变得更加智能了。

通过观察这些模式，您可以直观地了解到，我们希望 `/teams/new` 与 URL `/teams/new` 匹配。这是一个完美的匹配！React Router 也知道这一点。在匹配时，它会根据片段数量、静态片段、动态网片段、星号模式等对路由进行排序，并挑选出最匹配的路由。你再也不用考虑路由排序的问题了。

### 无路径路由

你可能已经注意到了前面的奇怪路由：

```jsx
<Route index element={<Home />} />
<Route index element={<LeagueStandings />} />
<Route element={<PageLayout />} />
```

它们连路径都没有，怎么能成为路由呢？在 React Router 中，"路由 "一词的用法非常宽泛。 `<Home/>` 和 `<LeagueStandings/>` 是[索引路由](https://reactrouter.com/en/main/start/concepts#index-route)，`<PageLayout/>`是[布局路由](https://reactrouter.com/en/main/start/concepts#layout-route)。我们将在[渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分讨论它们是如何工作的。这两个路由实际上都与匹配关系不大。

### 路由匹配

当路由与 URL 匹配时，它将由一个[匹配](https://reactrouter.com/en/main/start/concepts#match)对象来表示。 `<Route path=":teamId" element={<Team/>}/>` 的匹配结果如下：

```jsx
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
```

`pathname` 保存了与此路由匹配的 URL 部分（在我们的情况下是全部）。 `params` 保存了与任何匹配的[动态片段](https://reactrouter.com/en/main/start/concepts#dynamic-segment)解析值。请注意，参数对象键直接映射到片段的名称： `:teamId` 变成了 `params.teamId` 。

因为我们的路由是一棵树，所以一个 URL 可以匹配树的整个分支。考虑一下 URL `/teams/firebirds` ，它将是下面的路由分支：

```jsx
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

React Router 将根据这些路由和 URL 创建一个[匹配](https://reactrouter.com/en/main/start/concepts#match)数组，这样它就可以呈现一个与路由嵌套相匹配的嵌套用户界面。

```jsx
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

最后一个概念是渲染。假设您的应用程序的入口是这样的：

```jsx
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

让我们再以 `/teams/firebirds` URL 为例。 `<Routes>` 会将[位置](https://reactrouter.com/en/main/start/concepts#location)与[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)进行匹配，得到一组[匹配](https://reactrouter.com/en/main/start/concepts#match)结果，然后像这样呈现 React 元素树：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

在父路由元素中呈现的每个匹配都是一个非常强大的抽象。大多数网站和应用程序都有这样的特点：盒子中的盒子，每个盒子都有一个导航部分，可以改变页面的子部分。

### Outlets

`<Routes>` 会为您渲染第一个匹配元素（在我们的例子中是 `<App/>` ）。下一个匹配元素是 `<Teams>` 。为了呈现该元素， `App` 需要渲染一个 [outlet](https://reactrouter.com/en/main/start/concepts#outlet)。

```jsx
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

`Outlet` 组件将始终呈现下一个匹配。这意味着 `<Teams>` 也需要一个出口来呈现 `<Team/>` 。

如果 URL 是 `/contact-us` ，元素树将变为：

```jsx
<ContactForm />
```

因为联系表单不在 `<App>` 主路由之下。

如果 URL 是 `/teams/firebirds/edit` ，元素树将变为：

```jsx
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

Outlet 会将子元素替换为匹配的新子元素，但父元素的布局仍会保留。它很微妙，但对清理组件非常有效。

### 索引路由

请记住 `/teams` 的[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)：

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
  <Route index element={<LeagueStandings />} />
</Route>
```

如果 URL 是 `/teams/firebirds` ，那么元素树将是：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

但如果URL是 `/teams` ，元素树就会是这样：

```jsx
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```

联赛排名？ `<Route index element={<LeagueStandings>}/>` 怎么会出现在这里？它甚至没有路径！原因在于这是[索引路由](https://reactrouter.com/en/main/start/concepts#index-route)。索引路由在其父路由的 [outlet](https://reactrouter.com/en/main/start/concepts#outlet) 处以父路由的路径呈现。

这样想吧，如果你不在子路径的路径上， `<Outlet>` 就不会在用户界面上显示任何内容：

```jsx
<App>
  <Teams />
</App>
```

如果所有的团队都在左边的列表中，那么一个空的出口就意味着右边是一个空白页！你的用户界面需要一些东西来填补这个空白：索引路由来帮忙了。

另一种理解索引路由的方式是，当父路由匹配但其子路由都不匹配时，它就是默认的子路由。

根据用户界面的不同，您可能不需要索引路由，但如果父路由中存在任何形式的持续导航，您很可能需要索引路由来填补用户尚未点击其中一个项目时的空间。

### 布局路由

下面是路由配置中尚未匹配的部分： `/privacy` 。让我们再次查看路由配置，突出显示已匹配的路由：

```jsx
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

最终呈现的元素树将是：

```jsx
<PageLayout>
  <Privacy />
</PageLayout>
```

> IMPORTANT
>
> 不要忘记在布局中添加一个 `<Outlet>` ，以便渲染子路由元素。使用 `{children}` 将无法达到预期效果。

`PageLayout` 路由确实很奇怪。我们称其为[布局路由](https://reactrouter.com/en/main/start/concepts#layout-route)，是因为它根本不参与匹配（尽管其子路由参与了匹配）。它的存在只是为了简化在同一布局中封装多个子路由的过程。如果我们不允许这样做，那么你就必须用两种不同的方式来处理布局：有时你的路由会帮你处理，有时你需要在整个应用中手动重复大量的布局组件：

> DANGER
>
> 您可以这样做，但我们建议您使用布局路线

这是一个错误的示例：

```jsx
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

所以，是的，布局“路由”的语义有点傻，因为它与URL匹配无关，但这太方便了，无法拒绝。

## 导航

当 [URL](https://reactrouter.com/en/main/start/concepts#url) 发生变化时，我们称之为 "导航"。在 React Router 中有两种导航方式：

- `<Link>`
- `navigate`

### Link

这是主要的导航手段。渲染 `<Link>` 允许用户在点击时更改 URL。React Router 将阻止浏览器的默认行为，并告诉[历史记录](https://reactrouter.com/en/main/start/concepts#history)将新条目推送到[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。[位置](https://reactrouter.com/en/main/start/concepts#location)改变后，新的[匹配项](https://reactrouter.com/en/main/start/concepts#match)就会渲染。

不过，链接是可以访问的：

- 仍可渲染 `<a href>` ，以满足所有默认的可访问性要求（如键盘、可聚焦性、SEO等）。
- 如果右键或命令/控制键点击 "在新标签页中打开"，则不要阻止浏览器的默认行为。

[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)不仅可以呈现布局，还可以实现 "相对链接"。请看我们之前的 `teams` 路由：

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

`<Teams>` 组件可以呈现类似的链接，例如：

```jsx
<Link to="psg" />
<Link to="new" />
```

它链接的完整路径将是 `/teams/psg` 和 `/teams/new` 。它们继承了渲染它们的路由。这样，您的路由组件就不必真正了解应用程序中的其他路由。大量链接只需再深入一个环节即可。您可以重新整理整个[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，这些链接仍能正常工作。这在网站建设初期，设计和布局发生变化时非常有价值。

### 导航函数

函数从 `useNavigate` 钩子返回，允许程序员随时更改 URL。您可以在超时时更改：

```js
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }, 30000);
}, []);
```

或者在提交表单后：

```jsx
<form onSubmit={event => {
  event.preventDefault();
  let data = new FormData(event.target)
  let urlEncoded = new URLSearchParams(data)
  navigate("/create", { state: urlEncoded })
}}>
```

像 `Link` 一样， `navigate` 也可以处理嵌套的“to”值。

```jsx
navigate("psg");
```

您应该有充分的理由使用 `navigate` 而不是 `<Link>` 。这让我们非常难过：

这是一个错误的示例：

```jsx
<li onClick={() => navigate("/somewhere")} />
```

除了链接和表单之外，很少有交互应该改变 URL，因为这会带来可访问性和用户期望方面的复杂性。

## 数据访问

后，应用程序需要向 React Router 请求一些信息，以便构建完整的用户界面。为此，React Router 提供了大量钩子。

```jsx
let location = useLocation();
let urlParams = useParams();
let [urlSearchParams] = useSearchParams();
```

## 回顾

让我们从头开始！

1. 渲染应用程序：

   ```jsx
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

2. `<BrowserRouter>`创建[历史记录](https://reactrouter.com/en/main/start/concepts#history)，将初始[位置](https://reactrouter.com/en/main/start/concepts#location)置于状态中，并订阅 [URL](https://reactrouter.com/en/main/start/concepts#url)。

3. `<Routes>`会遍历其[子路由](https://reactrouter.com/en/main/start/concepts#child-route)以创建[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，将这些路由与[位置](https://reactrouter.com/en/main/start/concepts#location)相匹配，创建一些路由[匹配](https://reactrouter.com/en/main/start/concepts#match)项，并渲染第一个匹配项的路由元素。

4. 你可以在每个[父路由](https://reactrouter.com/en/main/start/concepts#parent-route)中渲染一个[`<Outlet>`](https://reactrouter.com/en/main/start/concepts#outlet)。

5. outlet 在路由[匹配](https://reactrouter.com/en/main/start/concepts#match)中渲染下一个匹配项。

6. 用户点击链接

7. 链接调用`navigate()`

8. [历史记录](https://reactrouter.com/en/main/start/concepts#history)会更改 URL 并通知 `<BrowserRouter>` 

9. `<BrowserRouter>`重新渲染，从 (2) 重新开始！

就是这样！希望本指南能帮助您更深入地理解 React Router 的主要概念。