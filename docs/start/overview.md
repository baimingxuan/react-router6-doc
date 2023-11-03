# 功能概览

## 客户端路由

React Router 支持 "客户端路由"。

在传统网站中，浏览器从网络服务器请求文档，下载并评估 CSS 和 JavaScript 资产，然后渲染服务器发送的 HTML。当用户点击一个链接时，新页面的流程就会重新开始。

客户端路由允许应用程序通过点击链接更新 URL，而无需再次请求服务器发送其他文档。相反，您的应用程序可以立即渲染一些新的用户界面，并通过 `fetch` 进行数据请求，以便用新信息更新页面。

这将加快用户体验，因为浏览器不需要请求一个全新的文档，也不需要为下一个页面重新评估 CSS 和 JavaScript 资源。此外，它还能通过动画等功能实现更动态的用户体验。

通过创建 `Router` 并链接/提交到带有 `Link` 和 `<Form>` 的页面，可以启用客户端路由：

```jsx
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

```

## 嵌套路由

嵌套路由是将 URL 的片段与组件层次结构和数据耦合在一起的总体思路。React Router 的嵌套路由灵感来自 2014 年左右 Ember.js 中的路由系统。Ember 团队意识到，几乎在每种情况下，URL 的片段都决定了URL的内容：

- 要在页面上呈现的布局
- 这些布局的数据依赖性

React Router 使用 API 来创建与 URL 段和数据相关联的嵌套布局，从而遵循了这一惯例。

```jsx
// Configure nested routes with JSX
createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="contact" element={<Contact />} />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          })
        }
      />
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login />}
          loader={redirectIfUser}
        />
        <Route path="logout" action={logoutUser} />
      </Route>
    </Route>
  )
);

// Or use plain objects
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: ({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          }),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            loader: redirectIfUser,
          },
          {
            path: "logout",
            action: logoutUser,
          },
        ],
      },
    ],
  },
]);
```

这种[可视化](https://remix.run/_docs/routing)可能会有所帮助。

## 动态片段

URL 片段可以是动态占位符，会被解析并提供给各种应用程序。

```jsx
<Route path="projects/:projectId/tasks/:taskId" />
```

带有 `:` 的片段是动态的，并提供给以下 API：

```jsx
// If the current location is /projects/abc/tasks/3
<Route
  // sent to loaders
  loader={({ params }) => {
    params.projectId; // abc
    params.taskId; // 3
  }}
  // and actions
  action={({ params }) => {
    params.projectId; // abc
    params.taskId; // 3
  }}
  element={<Task />}
/>;

function Task() {
  // returned from `useParams`
  const params = useParams();
  params.projectId; // abc
  params.taskId; // 3
}

function Random() {
  const match = useMatch(
    "/projects/:projectId/tasks/:taskId"
  );
  match.params.projectId; // abc
  match.params.taskId; // 3
}
```

参阅：

- [`<Route path>`](https://reactrouter.com/en/main/route/route#path)
- [`<Route loader>`](https://reactrouter.com/en/main/route/loader)
- [`<Route action>`](https://reactrouter.com/en/main/route/action)
- [`useParams`](https://reactrouter.com/en/main/hooks/use-params)
- [`useMatch`](https://reactrouter.com/en/main/hooks/use-match)

##  分级路由匹配

在将 URL 与路由匹配时，React Router 会根据片段数、静态片段、动态片段、通配符等对路由进行排序，并挑选出最匹配的路由。

例如，请看这两条路由：

```jsx
<Route path="/teams/:teamId" />
<Route path="/teams/new" />
```

现在考虑 URL 是 http://example.com/teams/new 。

尽管从技术上讲，两条路由都与 URL 匹配（ `new` 可能是 `:teamId` ），但直觉上你知道我们希望选择第二条路由（ `/teams/new` ）。React 路由器的匹配算法也知道这一点。

有了排序路由，你就不必担心路由排序问题了。

##  活动链接

大多数 `Web` 用程序的用户界面顶部、侧边栏都有持久导航部分，而且通常有多个层级。使用 `<NavLink>` 可以轻松完成活动导航项的样式设计，让用户知道他们在应用程序中的位置 ( `isActive` ) 或目的地 ( `isPending` ) 。

```jsx
<NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "red" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }}
/>
```

您还可以通过[`useMatch`](https://reactrouter.com/en/main/hooks/use-match)查看链接以外的任何其他 "活动 "指示。

```jsx
function SomeComp() {
  const match = useMatch("/messages");
  return <li className={Boolean(match) ? "active" : ""} />;
}
```

参阅：

- [`NavLink`](https://reactrouter.com/en/main/components/nav-link)
- [`useMatch`](https://reactrouter.com/en/main/hooks/use-match)

##  相对链接

与 HTML `<a href>` 一样， `<Link to>` 和 `<NavLink to>` 也可以使用相对路径，并增强了嵌套路由的行为。

给定以下路由配置：

```jsx
<Route path="home" element={<Home />}>
  <Route path="project/:projectId" element={<Project />}>
    <Route path=":taskId" element={<Task />} />
  </Route>
</Route>
```

请看 `url`  https://example.com/home/project/123 ，它呈现出以下路由组件层次结构：

```jsx
<Home>
  <Project />
</Home>
```

如果 `<Project />` 渲染以下链接，链接的 hrefs 将这样解析：

| In`<Project>`@`/home/project/123` | Resolved`<a href>`      |
| --------------------------------- | ----------------------- |
| `<Link to="abc">`                 | `/home/project/123/abc` |
| `<Link to=".">`                   | `/home/project/123`     |
| `<Link to="..">`                  | `/home`                 |
| `<Link to=".." relative="path">`  | `/home/project`         |

请注意，第一个 `..` 删除了 `project/:projectId` 路由的两个段。默认情况下，相对链接中的 `..` 会遍历路由层次结构，而不是 URL 段。在下一个示例中添加 `relative="path"` 后，就可以遍历路径段了。

相对链接总是相对于其呈现的路由路径，而不是完整的 URL。这意味着，如果用户通过 `<Link to="abc">` 深入浏览 `<Task />` 的 URL `/home/project/123/abc` ， `<Project>` 中的 hrefs 不会改变（与普通 `<a href>` 相反，这是客户端路由器的常见问题）。

## 数据加载

由于 URL 段通常映射到应用程序的持久化数据，因此 React Router 提供了传统的数据加载钩子，以便在导航过程中启动数据加载。结合嵌套路由，可以并行加载特定 URL 上多个布局的所有数据。

```jsx
<Route
  path="/"
  loader={async ({ request }) => {
    // loaders can be async functions
    const res = await fetch("/api/user.json", {
      signal: request.signal,
    });
    const user = await res.json();
    return user;
  }}
  element={<Root />}
>
  <Route
    path=":teamId"
    // loaders understand Fetch Responses and will automatically
    // unwrap the res.json(), so you can simply return a fetch
    loader={({ params }) => {
      return fetch(`/api/teams/${params.teamId}`);
    }}
    element={<Team />}
  >
    <Route
      path=":gameId"
      loader={({ params }) => {
        // of course you can use any data store
        return fakeSdk.getTeam(params.gameId);
      }}
      element={<Game />}
    />
  </Route>
</Route>
```

数据通过 `useLoaderData` 提供给您的组件。

```jsx
function Root() {
  const user = useLoaderData();
  // data from <Route path="/">
}

function Team() {
  const team = useLoaderData();
  // data from <Route path=":teamId">
}

function Game() {
  const game = useLoaderData();
  // data from <Route path=":gameId">
}
```

当用户访问或点击 https://example.com/real-salt-lake/45face3 的链接时，所有三个路由加载器都将被调用，并在该 URL 的用户界面渲染之前并行加载。

##  重定向

在加载或更改数据时，通常会将用户[重定向](https://reactrouter.com/en/main/fetch/redirect)到不同的路由。

```jsx
<Route
  path="dashboard"
  loader={async () => {
    const user = await fake.getUser();
    if (!user) {
      // if you know you can't render the route, you can
      // throw a redirect to stop executing code here,
      // sending the user to a new route
      throw redirect("/login");
    }

    // otherwise continue
    const stats = await fake.getDashboardStats();
    return { user, stats };
  }}
/>
```

```jsx
<Route
  path="project/new"
  action={async ({ request }) => {
    const data = await request.formData();
    const newProject = await createProject(data);
    // it's common to redirect after actions complete,
    // sending the user to the new record
    return redirect(`/projects/${newProject.id}`);
  }}
/>
```

参阅：

- [`redirect`](https://reactrouter.com/en/main/fetch/redirect)
- [Throwing in Loaders](https://reactrouter.com/en/main/route/loader#throwing-in-loaders)
- [`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate)

##  待定导航用户界面

当用户浏览应用程序时，下一页的数据会在页面呈现之前加载。在这段时间内提供用户反馈非常重要，这样才不会让人感觉应用程序反应迟钝。

```jsx
function Root() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" && <GlobalSpinner />}
      <FakeSidebar />
      <Outlet />
      <FakeFooter />
    </div>
  );
}
```

参阅：

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)

##  带有`<Suspense>`的骨架屏用户界面

无需等待下一页的数据，您可以[`defer`](https://reactrouter.com/en/main/utils/defer) 数据，这样用户界面就可以在加载数据的同时立即翻转到下一个屏幕，并使用占位符用户界面。

```jsx
<Route
  path="issue/:issueId"
  element={<Issue />}
  loader={async ({ params }) => {
    // these are promises, but *not* awaited
    const comments = fake.getIssueComments(params.issueId);
    const history = fake.getIssueHistory(params.issueId);
    // the issue, however, *is* awaited
    const issue = await fake.getIssue(params.issueId);

    // defer enables suspense for the un-awaited promises
    return defer({ issue, comments, history });
  }}
/>;

function Issue() {
  const { issue, history, comments } = useLoaderData();
  return (
    <div>
      <IssueDescription issue={issue} />

      {/* Suspense provides the placeholder fallback */}
      <Suspense fallback={<IssueHistorySkeleton />}>
        {/* Await manages the deferred data (promise) */}
        <Await resolve={history}>
          {/* this calls back when the data is resolved */}
          {(resolvedHistory) => (
            <IssueHistory history={resolvedHistory} />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<IssueCommentsSkeleton />}>
        <Await resolve={comments}>
          {/* ... or you can use hooks to access the data */}
          <IssueComments />
        </Await>
      </Suspense>
    </div>
  );
}

function IssueComments() {
  const comments = useAsyncValue();
  return <div>{/* ... */}</div>;
}
```

查看：

- [延迟数据指南](https://reactrouter.com/en/main/guides/deferred)
- [`defer`](https://reactrouter.com/en/main/utils/defer)
- [`Await`](https://reactrouter.com/en/main/components/await)
- [`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value)

##  数据突变

HTML 表单是导航事件，就像链接一样。React Router 通过客户端路由支持 HTML 表单工作流。

当提交表单时，正常的浏览器导航事件会被阻止，并创建一个[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)，其主体包含提交的[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。该请求将发送到与表单 `<Form action>` 匹配的 `<Route action>` 。

表单元素的 `name` 属性会提交到操作：

```jsx
<Form action="/project/new">
  <label>
    Project title
    <br />
    <input type="text" name="title" />
  </label>

  <label>
    Target Finish Date
    <br />
    <input type="date" name="due" />
  </label>
</Form>
```

正常的 HTML 文档请求会被阻止并发送至匹配路由的操作（与 `<form action>` 匹配的 `<Route path>` ），包括 `request.formData` 。

```jsx
<Route
  path="project/new"
  action={async ({ request }) => {
    const formData = await request.formData();
    const newProject = await createProject({
      title: formData.get("title"),
      due: formData.get("due"),
    });
    return redirect(`/projects/${newProject.id}`);
  }}
/>
```

##  数据重新验证

几十年前的网络惯例表明，当表单发布到服务器时，数据就会发生变化，并渲染新的页面。React Router 基于 HTML 的数据突变 API 遵循了这一惯例。

调用路由操作后，页面上所有数据的加载器将再次被调用，以确保用户界面自动保持最新数据。无需过期缓存键，无需重新加载上下文提供程序。

参阅：

- [“创建联系人”教程](https://reactrouter.com/en/main/start/tutorial#creating-contacts)

## 繁忙的指示器

当表单提交到路由操作时，您可以访问导航状态，以显示繁忙指示器、禁用字段集等。

```jsx
function NewProjectForm() {
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  return (
    <Form action="/project/new">
      <fieldset disabled={busy}>
        <label>
          Project title
          <br />
          <input type="text" name="title" />
        </label>

        <label>
          Target Finish Date
          <br />
          <input type="date" name="due" />
        </label>
      </fieldset>
      <button type="submit" disabled={busy}>
        {busy ? "Creating..." : "Create"}
      </button>
    </Form>
  );
}
```

参阅：

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)

##  优化用户界面

即使异步工作仍处于待处理状态，了解发送到 [action](https://reactrouter.com/en/main/route/action) 的[`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)通常也足以跳过繁忙指示器，立即以下一状态渲染用户界面。这就是所谓的 "优化用户界面"。

```jsx
function LikeButton({ tweet }) {
  const fetcher = useFetcher();

  // if there is `formData` then it is posting to the action
  const liked = fetcher.formData
    ? // check the formData to be optimistic
      fetcher.formData.get("liked") === "yes"
    : // if its not posting to the action, use the record's value
      tweet.liked;

  return (
    <fetcher.Form method="post" action="toggle-liked">
      <button
        type="submit"
        name="liked"
        value={liked ? "yes" : "no"}
      />
    </fetcher.Form>
  );
}
```

（是的，HTML 按钮可以有 `name` 和 `value` ）。

虽然更常见的是使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)来优化用户界面，但也可以使用[`navigation.formData`](https://reactrouter.com/en/main/hooks/use-navigation#navigationformdata) 对普通表单执行相同的操作。

##  数据 Fetchers

HTML 表单是突变的典范，但它有一个很大的局限性：一次只能有一个突变，因为表单提交就是一次导航。

大多数 Web 应用都需要允许同时发生多个突变，就像一个记录列表，每条记录都可以被独立删除、标记为完整、被收藏等。

[Fetcher](https://reactrouter.com/en/main/hooks/use-fetcher) 允许您与路由 [action](https://reactrouter.com/en/main/route/action) 和 [loader](https://reactrouter.com/en/main/route/loader) 进行交互，而不会在浏览器中导致导航，同时还能获得所有传统优势，如错误处理、重新验证、中断处理和竞争条件处理。

想象一下任务列表：

```jsx
function Tasks() {
  const tasks = useLoaderData();
  return tasks.map((task) => (
    <div>
      <p>{task.name}</p>
      <ToggleCompleteButton task={task} />
    </div>
  ));
}
```

每个任务都可以独立于其他任务被标记为已完成，并有自己的待处理状态，而且不会导致使用 [fetcher](https://reactrouter.com/en/main/hooks/use-fetcher) 进行导航：

```jsx
function ToggleCompleteButton({ task }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/toggle-complete">
      <fieldset disabled={fetcher.state !== "idle"}>
        <input type="hidden" name="id" value={task.id} />
        <input
          type="hidden"
          name="status"
          value={task.complete ? "incomplete" : "complete"}
        />
        <button type="submit">
          {task.status === "complete"
            ? "Mark Incomplete"
            : "Mark Complete"}
        </button>
      </fieldset>
    </fetcher.Form>
  );
}
```

参阅：

- [`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)

## 竞争条件处理

React Router 会取消过时的操作，只自动提交新数据。

任何时候使用异步用户界面都有发生竞争条件的风险：当异步操作在较早的操作之后开始，但在较早的操作之前完成。结果就是用户界面显示错误的状态。

考虑一个在用户输入时更新列表的搜索字段：

```bash
?q=ry    |---------------|
                         ^ commit wrong state
?q=ryan     |--------|
                     ^ lose correct state
```

尽管 `q?=ryan` 的查询较晚发出，但却较早完成。如果处理不当，查询结果会短暂地显示 `?q=ryan` 的正确值，但随后又会显示 `?q=ry` 的错误结果。仅有防抖和节流是不够的（您仍然可以中断通过的请求）。您需要取消操作。

如果使用 React Router 的数据约定，就可以完全自动地避免这个问题。

```bash
?q=ry    |-----------X
                     ^ cancel wrong state when
                       correct state completes earlier
?q=ryan     |--------|
                     ^ commit correct state
```

React Router 不仅能处理类似导航的竞争条件，还能处理许多其他情况，如加载自动完成的结果或使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher) 执行多个并发突变（及其自动并发重验证）。

## 错误处理

React Router 会自动处理应用程序中的绝大多数错误。它将捕获在以下情况下抛出的任何错误：

- 渲染
- 加载数据
- 更新数据

在实践中，除了在事件处理程序（ `<button onClick>` ）或 `useEffect` 中抛出的错误外，应用程序中几乎所有的错误都是这样。React Router 应用程序往往很少出现这两种错误。

当出现错误时，不会渲染路由的[`element`](https://reactrouter.com/en/main/route/route#element)，而是渲染[`errorElement`](https://reactrouter.com/en/main/route/error-element) 。

```jsx
<Route
  path="/"
  loader={() => {
    something.that.throws.an.error();
  }}
  // this will not be rendered
  element={<HappyPath />}
  // but this will instead
  errorElement={<ErrorBoundary />}
/>
```

如果路由没有 `errorElement` ，则错误会冒泡到最近的有 `errorElement` 的父路由：

```jsx
<Route
  path="/"
  element={<HappyPath />}
  errorElement={<ErrorBoundary />}
>
  {/* Errors here bubble up to the parent route */}
  <Route path="login" element={<Login />} />
</Route>
```

参阅：

- [`<Route errorElement>`](https://reactrouter.com/en/main/route/error-element)
- [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)

##  滚动恢复

React Router 将在导航时模拟浏览器的滚动恢复，在滚动前等待数据加载。这将确保滚动位置恢复到正确的位置。

您还可以自定义行为，根据位置以外的其他因素（如 url 路径名）进行还原，并防止在某些链接（如页面中间的标签页）上发生滚动。

参阅：

- [`<ScrollRestoration>`](https://reactrouter.com/en/main/components/scroll-restoration)

## Web 标准 API

React Router 基于 Web 标准 API 构建的。[loader](https://reactrouter.com/en/main/route/loader) 和 [action](https://reactrouter.com/en/main/route/action) 接收标准的 Web Fetch API[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)对象，并且也可以返回[`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)对象。取消操作是通过 [Abort Signals](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 完成的，搜索参数是通过[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)处理的，数据变更是通过[HTML Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) 处理的。

你熟练掌握 React Router 时，你也就熟练掌握了 Web 平台。