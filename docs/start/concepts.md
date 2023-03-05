#  主要概念

> 此文档需要更新为 6.4 数据 `API`
>
> 本文档深入探讨了React Router实现的路由核心概念。它相当长，如果您正在寻找更实用的指南，请查看我们的[快速入门教程](https://reactrouter.com/en/main/start/tutorial)。
>

您可能想知道 React Router 到底是做什么的。它如何帮助您构建应用程序？到底什么是**路由**？

如果您曾经有过这些问题，或者您只是想深入了解路由的基本组成部分，那么您来对地方了。本文档详细解释了 React Router 实现的所有路由核心概念。

请不要让本文档让您感到不知所措！对于日常使用，React Router 非常简单。您不需要深入了解它。

React Router 不仅仅是将 URL 与函数或组件匹配：它还涉及构建与 URL 相对应的完整用户界面，因此它可能比您想象的概念更多。我们将详细介绍 React Router 的三个主要任务：

1. 订阅和操作[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)
2. 将[URL](https://reactrouter.com/en/main/start/concepts#url)与您的[路由](https://reactrouter.com/en/main/start/concepts#route-config)匹配
3. 从[路由匹配中](https://reactrouter.com/en/main/start/concepts#matches)渲染嵌套的 UI

## 定义

但首先，先来一些定义！关于后端和前端框架的路由有很多不同的想法。有时，一个词在一个上下文中可能与另一个上下文中的意义不同。

以下是我们在谈论 React Router 时经常使用的一些词语。本指南的其余部分将详细介绍每个词语。

- **URL** - 地址栏中的URL。很多人将“URL”和“路由”视为可互换使用的术语，但在 React Router 中，这不是路由，它只是一个URL。
- **位置** - 这是一个基于内置浏览器 `window.location` 对象的 React Router 特定对象。它表示“用户所在的位置”。它主要是URL的对象表示，但比URL多一些。
- **位置状态** - 与未在[URL](https://reactrouter.com/en/main/start/concepts#url)中编码的[位置](https://reactrouter.com/en/main/start/concepts#location)一起持久存在的值。与哈希或搜索参数（在URL中编码的数据）类似，但在浏览器的内存中隐式存储。
- **历史堆栈** - 当用户导航时，浏览器会在堆栈中跟踪每个[位置](https://reactrouter.com/en/main/start/concepts#location)。如果在浏览器中单击并按住后退按钮，则可以在那里看到浏览器的历史堆栈。
- **客户端路由 (CSR)** - 普通的HTML文档可以链接到其他文档，浏览器自己处理[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。客户端路由使开发人员能够在不向服务器发出文档请求的情况下操作浏览器历史堆栈。
- **历史记录** - 一个对象，允许 React Router 订阅[URL](https://reactrouter.com/en/main/start/concepts#url)的更改，并提供编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)的API。
- **历史记录操作**-其中之一为`POP`、`PUSH`或`REPLACE`。用户可能因以下三种原因之一而到达[URL](https://reactrouter.com/en/main/start/concepts#url)。当向历史记录堆栈添加新条目时进行推送（通常是链接单击或程序员强制导航）。替换类似，只是替换堆栈上的当前条目而不是推送新条目。最后，当用户在浏览器 Chrome 中单击后退或前进按钮时，会发生弹出。
- **段**-[URL](https://reactrouter.com/en/main/start/concepts#url)或[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)中`/`字符之间的部分。例如，“/users/123”有两个段。
- **路径模式**- 它们看起来像URL，但可以具有用于将URL与路由匹配的特殊字符，如**动态段**(`"/users/:userId"`) 或**星号段**(`"/docs/*"`)。它们不是URL，而是 React Router 将匹配的模式。
- **动态段**- 路径模式的一部分，是动态的，意味着它可以匹配段中的任何值。例如，模式 `/users/:userId` 将匹配像 `/users/123` 这样的URL。
- **URL 参数**- 与动态段匹配的 URL 的解析值。
- **Router**- 有状态的顶级组件，使所有其他组件和钩子工作。
- **路由配置** -一组路由对象的树，将与当前位置进行排名和匹配（嵌套）以创建**路由匹配**的分支。
- **路由**- 一个对象或路由元素，通常具有形状 `{ path, element }` 或 `<Route path element>` 。 `path` 是路径模式。当路径模式与当前 URL 匹配时，该元素将被渲染。
- **路由元素**- 或者**`<Route>`**。该元素的`props`被读取以通过`<Routes>`创建[路由](https://reactrouter.com/en/main/start/concepts#route)，但除此之外不起作用。
- **嵌套路由**- 因为路由可以有子路由，并且每个路由通过[ 段 ](https://reactrouter.com/en/main/start/concepts#segment)定义[URL](https://reactrouter.com/en/main/start/concepts#url)的一部分，所以单个 URL 可以在树的嵌套“分支”中匹配多个路由。这使得通过 [outlet](https://reactrouter.com/en/main/start/concepts#outlet)、[ 相对链接](https://reactrouter.com/en/main/start/concepts#relative-links)等实现自动布局嵌套成为可能。
- **相对链接**- 不以 '/' 开头的链接将继承它们呈现的最近的路由。这使得在不必知道和构建整个路径的情况下链接到更深的 URL 变得容易。
- **匹配**- 一个对象，它在路由匹配 URL 时保存信息，例如匹配的[URL参数](https://reactrouter.com/en/main/start/concepts#url-params)和路径名。
- **匹配项**-与当前[位置](https://reactrouter.com/en/main/start/concepts#location)匹配的路由数组（或[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)的分支）。此结构使[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)成为可能。
- **父路由**- 具有子路由的路由。
- **Outlet** - 在一组匹配项中渲染下一个[匹配项](https://reactrouter.com/en/main/start/concepts#match)的组件。
- **索引路由** - 没有路径的子路由，在父路由的[URL](https://reactrouter.com/en/main/start/concepts#url)上父路由的[Outlet](https://reactrouter.com/en/main/start/concepts#outlet)处渲染。
- **布局路由**- 没有路径的**父路由**，专门用于在特定布局内分组子路由。

## 历史和位置

在 React Router 可以执行任何操作之前，它必须能够订阅浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的更改。

浏览器在用户浏览时维护自己的历史记录堆栈。这就是后退和前进按钮可以工作的原因。在传统网站（没有 JavaScrip `的 HTML 文档）中，浏览器每次用户点击链接、提交表单或点击后退和前进按钮时都会向服务器发出请求。

例如，考虑用户：

1. 点击链接`/dashboard`
2. 点击链接`/accounts`
3. 点击链接`/customers/123`
4. 点击后退按钮
5. 点击链接`/dashboard`

历史记录堆栈将按以下方式更改，其中**粗体**条目表示当前 [URL](https://reactrouter.com/en/main/start/concepts#url)：

1. **`/dashboard`**
2. `/dashboard`,**`/accounts`**
3. `/dashboard`, `/accounts`,**`/customers/123`**
4. `/dashboard`, **`/accounts`**,`/customers/123`
5. `/dashboard`, `/accounts`,**`/dashboard`**

### 历史记录对象

通过**客户端路由**，开发人员能够以编程方式操作浏览器[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。我们可以编写以下代码来更改[URL](https://reactrouter.com/en/main/start/concepts#url)，而不会触发浏览器默认行为，即向服务器发出请求：

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

这段代码改变了[URL](https://reactrouter.com/en/main/start/concepts#url)，但对`UI`没有任何影响。我们需要编写更多的代码，在某个地方更改一些状态，以使 UI 更改为联系人页面。问题是，浏览器没有提供一种“监听 URL”并订阅此类变化的方法。

好吧，那不是完全正确的。我们可以通过[pop](https://reactrouter.com/en/main/start/concepts#history-actions)事件监听 URL 的变化：

```jsx
window.addEventListener("popstate", () => {
  // URL changed!
});
```

但是这只有在用户点击“后退”或“前进”按钮时才会触发。当程序员调用 `window.history.pushState` 或 `window.history.replaceState` 时，没有事件。

这就是 React Router 特定的 `history` 对象发挥作用的地方。它提供了一种方式来“监听 [URL](https://reactrouter.com/en/main/start/concepts#url) ”更改，无论[历史记录操作](https://reactrouter.com/en/main/start/concepts#history-actions)是 **push**、**pop** 还是 **replace**。

```jsx
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

应用程序不需要设置自己的历史记录对象——这是 `<Router>` 的工作。它设置了其中一个对象，订阅[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)中的更改，最后在[URL](https://reactrouter.com/en/main/start/concepts#url)更改时更新其状态。这会导致应用程序重新渲染并显示正确的 UI。它需要将一个 `location` 放在状态上，其他所有内容都从这个单一对象中工作。

### 位置

浏览器在 `window.location` 上有一个位置对象。它可以告诉您有关[URL](https://reactrouter.com/en/main/start/concepts#url)的信息，但也有一些方法可以更改它：

```jsx
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh w/ the server
// and a lot more
```

> 作为说明。在 React Router 应用程序中，您通常不使用 `window.location` 。
>

不使用 `window.location` ，React Router 有一个基于 `window.location` 的概念，但更简单的[位置](https://reactrouter.com/en/main/start/concepts#location)。它看起来像这样：

```jsx
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

前三个： `{ pathname, search, hash }` 与 `window.location` 完全相同。如果您将这三个相加，您将得到用户在浏览器中看到的[URL](https://reactrouter.com/en/main/start/concepts#url):

```jsx
location.pathname + location.search + location.hash;
// /bbq/pig-pickins?campaign=instagram#menu
```

最后两个， `{ state, key }` ，是React Router特定的。

**位置路径名**

这是[URL](https://reactrouter.com/en/main/start/concepts#url)原点后的部分，因此对于 `https://example.com/teams/hotspurs` ，路径名是 `/teams/hotspurs` 。这是路由匹配的唯一部分。

**位置搜索**

人们对[URL](https://reactrouter.com/en/main/start/concepts#url)的这个部分使用了很多不同的术语：

- 位置搜索
- 搜索参数
- URL 搜索参数
- 查询字符串

在 React Router 中，我们称之为“位置搜索”。但是，位置搜索是[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)的序列化版本。因此，有时我们也可能称其为“URL搜索参数”。

```jsx
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

当需要精确时，将序列化字符串版本称为“搜索”，将解析版本称为“搜索参数”，但在不需要精确时，通常可以交替使用这些术语。

**位置哈希**

URL 中的哈希标识了*当前页面的* 滚动位置。在引入 `window.history.pushState` API 之前，Web开发人员仅使用[URL](https://reactrouter.com/en/main/start/concepts#url)的哈希部分进行客户端路由，因为这是我们可以在不向服务器发出新请求的情况下操纵的唯一部分。然而，今天我们可以将其用于其设计目的。

**位置状态**

您可能会想知道为什么 `window.history.pushState()` API 被称为“push state”。状态？我们不只是改变了[URL](https://reactrouter.com/en/main/start/concepts#url)吗？它不应该是 `history.push` 吗？好吧，我们不确定为什么“状态”是重点，因为我们不在设计 API 的房间里，但它仍然是浏览器的一个很酷的功能。

浏览器允许我们通过将值传递给 `pushState` 来保存有关导航的信息。当用户单击“返回”时， `history.state` 上的值将更改为之前“推送”的任何内容。

```jsx
window.history.pushState("look ma!", undefined, "/contact");
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

> 作为说明。在 React Router 应用程序中，您不能直接读取 `history.state` 。
>

React Router 利用了这个浏览器特性，稍微进行了抽象，并将这些值呈现在 `location` 上，而不是 `history` 。

你可以把 `location.state` 理解为 `location.hash` 或 `location.search` ，只不过它不像把值放在[URL](https://reactrouter.com/en/main/start/concepts#url)中那样显而易见，而是隐藏起来的--就像 URL 中只有程序员知道的超级秘密一样。

位置状态的几个很好的用例是：

- 告诉下一页用户来自哪里并分支UI。这里最流行的实现是，如果用户在网格视图中单击了项目，则在模态中显示记录，但如果他们直接显示到URL，则在其自己的布局中显示记录（Pinterest，旧版Instagram）。
- 将列表中的部分记录发送到下一个屏幕，以便立即呈现部分数据，然后再获取其余数据。

您可以通过两种方式设置位置状态：在 `<Link>` 上或在 `navigate` 上：

```jsx
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

并且在下一页，您可以通过 `useLocation` 访问它：

```jsx
let location = useLocation();
location.state;
```

> 位置状态值将被序列化，因此像 `new Date()` 这样的内容将被转换为字符串。
>

**位置键**

每个位置都有一个唯一的键。这对于高级用例非常有用，例如基于位置的滚动管理、客户端数据缓存等等。因为每个新位置都有一个唯一的键，所以您可以构建抽象，将信息存储在一个普通对象 `new Map()` 中，甚至是 `locationStorage` 中。

例如，一个非常基本的客户端数据缓存可以通过位置键（和获取[URL](https://reactrouter.com/en/main/start/concepts#url)）存储值，并在用户再次点击时跳过获取数据：

```jsx
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

在初始渲染时，以及[历史堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)发生变化时，React Router 将根据您的[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)将[位置](https://reactrouter.com/en/main/start/concepts#location)与匹配项进行匹配，以便生成一组[匹配项](https://reactrouter.com/en/main/start/concepts#match)进行渲染。

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

`<Routes>` 组件递归其 `props.children` ，剥离它们的 props，并生成如下对象：

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

实际上，您可以使用钩子 `useRoutes(routesGoHere)` 代替 `<Routes>` 。这就是 `<Routes>` 所做的全部。

如您所见，路由可以定义多个[段](https://reactrouter.com/en/main/start/concepts#segment)，例如`:teamId/edit`，也可以只定义一个段，例如 `:teamId` 。[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)中的所有分支段都会被加在一起，以创建路由的最终[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)。

### 匹配参数

请注意`:teamId`段。这就是我们所说的[路径模式](https://reactrouter.com/en/main/start/concepts#path-pattern)的[动态段](https://reactrouter.com/en/main/start/concepts#dynamic-segment)，这意味着它不会静态地匹配 URL（实际字符），而是动态地匹配它。任何值都可以填充 `:teamId` 。 `/teams/123` 或 `/teams/cupcakes` 都将匹配。我们称解析后的值称为[URL 参数](https://reactrouter.com/en/main/start/concepts#url-params)。因此，在这种情况下，我们的 `teamId` 参数将是 `"123"` 或 `"cupcakes"` 。我们将在[渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分中看到如何在您的应用程序中使用它们。

### 路由排序

如果我们将[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)中所有分支的所有段相加，我们最终得到以下路径模式，这些模式是我们的应用程序响应的：

```jsx
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

现在事情变得非常有趣。考虑这个[URL](https://reactrouter.com/en/main/start/concepts#url) `/teams/new`。在该列表中，哪个模式与该 URL 匹配？

没错，有两个！

```jsx
/teams/new
/teams/:teamId
```

React Router 在这里必须做出决定，只能有一个。许多路由器，无论是客户端还是服务器端，都会按照定义的顺序处理模式。第一个匹配成功的获胜。在这种情况下，我们将匹配 `/` 并渲染 `<Home/>` 组件。绝对不是我们想要的结果。这些类型的路由器要求我们完美地排序路由以获得预期的结果。这是 React Router 在 v6 之前的工作方式，但现在它更加智能。

看着这些模式，你直觉地知道我们想要 `/teams/new` 与 URL `/teams/new` 匹配。这是完美的匹配！React Router 也知道这一点。在匹配时，它会根据段数、静态段、动态段、星号模式等对你的路由进行排名，并选择最具体的匹配。你永远不必考虑路由的顺序。

### 无路径路由

您可能已经注意到了之前的奇怪路线：

```jsx
<Route index element={<Home />} />
<Route index element={<LeagueStandings />} />
<Route element={<PageLayout />} />
```

他们甚至没有路径，怎么能成为一条路由呢？这就是 React Router 中“路由”一词使用得相当宽泛的地方。 `<Home/>` 和 `<LeagueStandings/>`是[索引路由](https://reactrouter.com/en/main/start/concepts#index-route)，`<PageLayout/>`是[布局路由](https://reactrouter.com/en/main/start/concepts#layout-route)。我们将在[渲染](https://reactrouter.com/en/main/start/concepts#rendering)部分讨论它们的工作原理。它们都与匹配关系不太相关。

### 路由匹配

当路由与 URL 匹配时，它会被表示为一个[匹配](https://reactrouter.com/en/main/start/concepts#match)对象。 `<Route path=":teamId" element={<Team/>}/>` 的匹配结果可能如下所示：

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

因为我们的路由是一棵树，一个URL可以匹配整个树的一个分支。考虑URL `/teams/firebirds` ，它将是以下路由分支：

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

React Router 将从这些路由和 URL 创建一个[匹配](https://reactrouter.com/en/main/start/concepts#match)数组，以便呈现与路由嵌套匹配的嵌套 UI。

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

最终的概念是渲染。考虑到您的应用程序入口看起来像这样：

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

让我们再次以 `/teams/firebirds` URL 为例。 `<Routes>` 将匹配[位置](https://reactrouter.com/en/main/start/concepts#location)到您的[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，获取一组[匹配](https://reactrouter.com/en/main/start/concepts#match)，然后渲染如下的 React 元素树：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

每个在父路由元素内呈现的匹配都是一个非常强大的抽象。大多数网站和应用程序都具有这种特征：盒子内的盒子内的盒子，每个盒子都有一个导航部分，可以更改页面的子部分。

### Outlets

这个嵌套元素树不会自动发生。 `<Routes>` 会为您呈现第一个匹配元素（在我们的情况下，那是 `<App/>` ）。下一个匹配元素是 `<Teams>` 。为了呈现它， `App` 需要渲染一个[outlet](https://reactrouter.com/en/main/start/concepts#outlet)。

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

`Outlet` 组件将始终呈现下一个匹配项。这意味着 `<Teams>` 也需要一个出口来呈现 `<Team/>` 。

如果 URL 是 `/contact-us` ，元素树将会变成：

```jsx
<ContactForm />
```

因为联系表格不在主 `<App>` 路由下。

如果 URL 是 `/teams/firebirds/edit` ，元素树将会变成：

```jsx
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

Outlet 会将子路由替换为匹配新的子路由，但父布局仍然存在。这很微妙，但非常有效地清理了您的组件。

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

但如果URL是 `/teams` ，元素树将是：

```jsx
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```

联赛排名？ `<Route index element={<LeagueStandings>}/>` 怎么会出现在那里？它甚至没有路径！原因是它是一个[索引路由](https://reactrouter.com/en/main/start/concepts#index-route)。索引路由在其父路由的[outlet](https://reactrouter.com/en/main/start/concepts#outlet)处以父路由的路径呈现。

这样想，如果您不在任何子路由的路径中， `<Outlet>` 将不会在用户界面中呈现任何内容：

```jsx
<App>
  <Teams />
</App>
```

如果所有的团队都在左侧的列表中，那么空的 outlet 意味着右侧有一个空白页面！您的 UI 需要填充空间：索引路由来拯救。

另一种思考索引路由的方式是，当父路由匹配但没有子路由匹配时，它是默认的子路由。

根据用户界面的不同，您可能不需要索引路由，但如果父路由中有任何形式的持久导航，您很可能希望使用索引路由来填充空间，以便在用户尚未点击其中任何项目时使用。

### 布局路由

这是我们尚未匹配的路由配置的一部分： `/privacy` 。让我们再次查看路由配置，突出显示匹配的路由：

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

渲染后的元素树如下所示：

```jsx
<PageLayout>
  <Privacy />
</PageLayout>
```

> 不要忘记在您希望渲染子路由元素的布局中添加 `<router-view>`。使用 `children` 将无法按预期工作。

`PageLayout` 路由确实很奇怪。我们称之为[布局路由](https://reactrouter.com/en/main/start/concepts#layout-route)，因为它根本不参与匹配（尽管它的子路由会）。它只是为了使在同一个布局中包装多个子路由更简单。如果我们不允许这样做，那么您将不得不以两种不同的方式处理布局：有时您的路由会为您处理，有时您需要在整个应用程序中手动重复使用许多布局组件：

> 你可以这样做，但我们建议使用布局路由。
>
> 这是个错误的示例：

> ```jsx
> <Routes>
>   <Route path="/" element={<App />}>
>     <Route index element={<Home />} />
>     <Route path="teams" element={<Teams />}>
>       <Route path=":teamId" element={<Team />} />
>       <Route path=":teamId/edit" element={<EditTeam />} />
>       <Route path="new" element={<NewTeamForm />} />
>       <Route index element={<LeagueStandings />} />
>     </Route>
>   </Route>
>   <Route
>     path="/privacy"
>     element={
>       <PageLayout>
>         <Privacy />
>       </PageLayout>
>     }
>   />
>   <Route
>     path="/tos"
>     element={
>       <PageLayout>
>         <Tos />
>       </PageLayout>
>     }
>   />
>   <Route path="contact-us" element={<Contact />} />
> </Routes>
> ```
>

所以，是的，布局“路由”的语义有点愚蠢，因为它与URL匹配无关，但是禁止它太不方便了。

## 导航

当[URL](https://reactrouter.com/en/main/start/concepts#url)改变时，我们称之为“导航”。在 React Router 中，有两种导航方式：

- `<Link>`
- `navigate`

### Link

这是主要的导航方式。渲染一个 `<Link>` 允许用户在单击时更改URL。React Router将阻止浏览器的默认行为，并告诉[历史记录将新条目推入[历史记录堆栈](https://reactrouter.com/en/main/start/concepts#history-stack)。[位置](https://reactrouter.com/en/main/start/concepts#location)更改并且新的[匹配项](https://reactrouter.com/en/main/start/concepts#match)匹配项将被渲染。

然而，链接是可访问的，因为它们：

- 仍然渲染 `<a href>` ，以满足所有默认的可访问性问题（如键盘、焦点、SEO等）。
- 如果是右键或命令/控制键单击以“在新标签页中打开”，请不要阻止浏览器的默认行为。

[嵌套路由](https://reactrouter.com/en/main/start/concepts#nested-routes)不仅仅是渲染布局，它们还可以启用“相对链接”。考虑我们之前的 `teams` 路由：

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

`<Teams>` 组件可以呈现链接，例如：

```jsx
<Link to="psg" />
<Link to="new" />
```

它链接到的完整路径将是 `/teams/psg` 和 `/teams/new` 。它们继承了它们呈现的路由。这使得您的路由组件不必真正了解应用程序中的其他路由。非常多的链接只需要再深入一个[“段”](https://reactrouter.com/en/main/start/concepts#segment)。您可以重新排列整个[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，这些链接可能仍然可以正常工作。当在开始构建站点并且设计和布局在变化时，这非常有价值。

### 导航函数

此函数从 `useNavigate` 钩子返回，允许您作为程序员随时更改URL。您可以在超时时执行此操作：

```jsx
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

除了链接和表单之外，很少有交互应该更改URL，因为这会引入可访问性和用户期望方面的复杂性。

## 数据访问

最后，一个应用程序将要求React Router提供一些信息，以便构建完整的UI。为此，React Router有一堆钩子。

```jsx
let location = useLocation();
let urlParams = useParams();
let [urlSearchParams] = useSearchParams();
```

## 回顾

让我们从顶部开始把所有东西放在一起吧！

1. 您渲染您的应用程序：

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

2. `<BrowserRouter>`创建一个[历史记录](https://reactrouter.com/en/main/start/concepts#history)，将初始[位置](https://reactrouter.com/en/main/start/concepts#location)放入状态中，并订阅[URL](https://reactrouter.com/en/main/start/concepts#url)。

3. `<Routes>`递归其[子路由](https://reactrouter.com/en/main/start/concepts#child-route)以构建[路由配置](https://reactrouter.com/en/main/start/concepts#route-config)，将这些路由与[位置](https://reactrouter.com/en/main/start/concepts#location)匹配，创建一些路由[匹配](https://reactrouter.com/en/main/start/concepts#match)，并呈现第一个匹配项的路由元素。

4. 您将在每个[父路由](https://reactrouter.com/en/main/start/concepts#parent-route)中渲染一个[`<Outlet>`](https://reactrouter.com/en/main/start/concepts#outlet)。

5. outlet 渲染路由[匹配](https://reactrouter.com/en/main/start/concepts#match)中的下一个匹配项。

6. 用户单击链接

7. 该链接调用`navigate()`

8. [历史记录](https://reactrouter.com/en/main/start/concepts#history)更改URL 并通知`<BrowserRouter>`.

9. `<BrowserRouter>`重新渲染，从 (2) 重新开始！

就是这样！我们希望这个指南能够帮助您更深入地了解 React Router 的主要概念。