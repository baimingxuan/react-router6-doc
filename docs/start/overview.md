## 客户端路由

React Router 实现了“客户端路由”。

在传统的网站中，浏览器从 Web 服务器请求文档，下载并评估 CSS 和 JavaScript 资源，并呈现服务器发送的 HTML。当用户单击链接时，它会为新页面重新开始整个过程。

客户端路由允许您的应用程序在不从服务器请求另一个文档的情况下从链接单击更新 URL。相反，您的应用程序可以立即呈现一些新的 UI 并使用 `fetch` 进行数据请求，以使用新信息更新页面。

这使得用户体验更快，因为浏览器不需要为下一页请求完全新的文档或重新评估 CSS 和 JavaScript 资源。它还可以通过动画等方式实现更动态的用户体验。

通过创建 `Router` 并使用 `Link` 和 `<Form>` 链接/提交页面，可以启用客户端路由：

```jsx
import React from "react";
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

嵌套路由是将 URL 的片段与组件层次结构和数据耦合的一般思想。React Router 的嵌套路由受到了 Ember.js 2014 年左右的路由系统的启发。Ember 团队意识到，在几乎所有情况下，URL 的片段决定了：

- 在页面上呈现的布局
- 这些布局的数据依赖关系

React Router 使用 API 来创建与 URL 片段和数据耦合的嵌套布局，支持这种约定。

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
        <Route path="logout" />
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

这个可视化可能会有所帮助。

## 动态片段

URL 的片段可以是动态占位符，可以被解析并提供给各种 API。

```jsx
<Route path="projects/:projectId/tasks/:taskId" />
```

两个带有 `:` 的片段是动态的，并提供给以下 API：

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

查看：

- [`<Route path>`](https://reactrouter.com/en/main/route/route#path)
- [`<Route loader>`](https://reactrouter.com/en/main/route/loader)
- [`<Route action>`](https://reactrouter.com/en/main/route/action)
- [`useParams`](https://reactrouter.com/en/main/hooks/use-params)
- [`useMatch`](https://reactrouter.com/en/main/hooks/use-match)

##  排序路由匹配

在将 URL 与路由匹配时，React Router 会根据片段数、静态片段、动态片段、通配符等对路由进行排序，并选择最具体的匹配。

例如，考虑以下两个路由：

```jsx
<Route path="/teams/:teamId" />
<Route path="/teams/new" />
```

现在考虑 URL 是 http://example.com/teams/new 。

即使两个路由在技术上都匹配 URL（ `new` 可以是 `:teamId` ），你直觉上也知道我们想要选择第二个路由（ `/teams/new` ）。React Router 的匹配算法也知道这一点。

有了排序路由，您就不必担心路由顺序。

##  活动链接

大多数 Web 应用程序在 UI 顶部、侧边栏和多个级别上都有持久的导航部分。使用 `<NavLink>` 轻松地为活动导航项设置样式，以便用户知道他们在应用程序中的位置（ `isActive` ）或将要去哪里（ `isPending` ）。

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

您还可以使用[`useMatch`](https://reactrouter.com/en/main/hooks/use-match)针对链接之外的其他`"active"`指示。

```jsx
function SomeComp() {
  const match = useMatch("/messages");
  return <li className={Boolean(match) ? "active" : ""} />;
}
```

查看：

- [`NavLink`](https://reactrouter.com/en/main/components/nav-link)
- [`useMatch`](https://reactrouter.com/en/main/hooks/use-match)

##  相对链接

与 HTML 的`<a href>`一样，`<Link to>`和`<NavLink to>`也可以采用相对路径，嵌套路由可以增强其行为。

给定以下路由配置：

```jsx
<Route path="home" element={<Home />}>
  <Route path="project/:projectId" element={<Project />}>
    <Route path=":taskId" element={<Task />} />
  </Route>
</Route>
```

考虑以下 URL https://example.com/home/project/123 ，它渲染了以下路由组件层次结构：

```jsx
<Home>
  <Project />
</Home>
```

如果 `<Project />` 渲染以下链接，则链接的 href 将解析如下：

| In`<Project>`@`/home/project/123` | Resolved`<a href>`      |
| --------------------------------- | ----------------------- |
| `<Link to="abc">`                 | `/home/project/123/abc` |
| `<Link to=".">`                   | `/home/project/123`     |
| `<Link to="..">`                  | `/home`                 |
| `<Link to=".." relative="path">`  | `/home/project`         |

请注意，第一个 `..` 删除 `project/:projectId` 路由的两个段。默认情况下，相对链接中的 `..` 遍历路由层次结构，而不是 URL 段。在下一个示例中添加 `relative="path"` 允许您遍历路径段。

相对链接始终相对于它们渲染的路由路径，而不是完整的 URL。这意味着，如果用户通过 `<Link to="abc">` 导航到 `<Task />` ，在 URL `/home/project/123/abc` 中， `<Project>` 中的 href 不会改变（与纯 `<a href>` 相反，这是客户端路由器的常见问题）。

## 数据加载

因为 URL 段通常映射到应用程序的持久数据，React Router 提供了传统的数据加载钩子来在导航期间启动数据加载。结合嵌套路由，可以并行加载特定 URL 上多个布局的所有数据。

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

当用户访问或点击 https://example.com/real-salt-lake/45face3 的链接时，所有三个路由加载器都将被调用并并行加载，直到该URL的UI渲染完成。

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

查看：

- [`redirect`](https://reactrouter.com/en/main/fetch/redirect)
- [Throwing in Loaders](https://reactrouter.com/en/main/route/loader#throwing-in-loaders)
- [`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate)

##  待定导航UI

当用户在应用程序中导航时，下一页的数据会在页面呈现之前加载。在此期间提供用户反馈非常重要，以便应用程序不会感觉不响应。请在此期间提供用户反馈，以免用户感到不适。

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

查看：

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)

##  带有`<Suspense>`的骨架屏UI

不必等待下一页的数据，您可以 `defer` 数据，这样 UI 就会立即跳转到下一个屏幕，同时加载数据的同时显示占位符 UI。

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

##  数据变异

HTML表单是导航事件，就像链接一样。React Router 支持使用客户端路由的HTML表单工作流程。

当表单被提交时，阻止了正常的浏览器导航事件，并创建了一个[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)，其中包含提交的[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)的主体。该请求被发送到与表单的 `<Form action>` 匹配的 `<Route action>` 。

表单元素的 `name` 属性将被提交到操作：

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

阻止正常的 HTML 文档请求，并将其发送到匹配路由的操作（ `<Route path>` ，它匹配 `<form action>` ），包括 `request.formData` 。

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

几十年来的网络惯例表明，当表单提交到服务器时，数据正在更改并且会呈现新页面。React Router的基于HTML的数据突变API遵循这种惯例。

调用路由操作后，页面上所有数据的加载器会再次调用，以确保 UI 自动与数据保持最新。无需过期缓存键，无需重新加载上下文提供程序。

查看：

- [“创建联系人”教程](https://reactrouter.com/en/main/start/tutorial#creating-contacts)

## 繁忙的指示器

当表单提交到路由操作时，您可以访问导航状态以显示繁忙指示器、禁用字段集等。

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

查看：

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)

##  乐观UI

知道发送给 [action](https://reactrouter.com/en/main/route/action) 的[`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)通常足以跳过繁忙指示器并立即在下一个状态中渲染 UI，即使您的异步工作仍在进行中。这被称为“乐观 UI”。

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

虽然使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)更常见进行乐观 UI，但您也可以使用普通表单使用[`navigation.formData`](https://reactrouter.com/en/main/hooks/use-navigation#navigationformdata)进行相同的操作。

##  数据获取器

HTML 表单是变异的模型，但它们有一个主要限制：您一次只能有一个，因为表单提交是一种导航。

大多数 Web 应用程序需要允许同时发生多个变异，例如记录列表，其中每个记录都可以独立删除、标记为完成、喜欢等。

[Fetcher](https://reactrouter.com/en/main/hooks/use-fetcher) 允许您与路由 [action](https://reactrouter.com/en/main/route/action) 和 [loader](https://reactrouter.com/en/main/route/loader) 进行交互，而不会在浏览器中引起导航，但仍然获得所有传统的好处，如错误处理、重新验证、中断处理和竞争条件处理。

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

每个任务都可以独立完成，具有自己的待处理状态，而不会使用 [fetcher](https://reactrouter.com/en/main/hooks/use-fetcher) 进行导航：

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

查看：

- [`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)

## 竞争条件处理

React Router 将取消过时的操作并自动提交新数据。

任何时候，您都有异步 UI 的风险：当异步操作在早期操作之后开始但在其之前完成时。结果是用户界面显示错误的状态。

考虑一个搜索字段，当用户输入时更新列表：

```
?q=ry    |---------------|
                         ^ commit wrong state
?q=ryan     |--------|
                     ^ lose correct state
```

即使 `q?=ryan` 的查询稍后才发出，但它却更早地完成了。如果处理不当，结果将短暂地成为 `?q=ryan` 的正确值，然后翻转为 `?q=ry` 的错误结果。防抖和节流是不够的（您仍然可以中断通过的请求）。您需要取消操作。

如果您使用React Router的数据约定，您可以完全自动地避免这个问题。

```
?q=ry    |-----------X
                     ^ cancel wrong state when
                       correct state completes earlier
?q=ryan     |--------|
                     ^ commit correct state
```

React Router 不仅处理像这样的导航的竞争条件，还处理许多其他情况，例如使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher) 加载自动完成的结果或执行多个并发变异（及其自动并发重新验证）。

## 错误处理

React Router 会自动处理大部分应用程序错误。它会捕获在以下情况下抛出的任何错误：

- 渲染
- 加载数据
- 更新数据

实际上，这几乎包括您的应用程序中的每个错误，除了在事件处理程序 ( `<button onClick>` ) 或 `useEffect` 中抛出的错误。React Router 应用程序往往两者都很少。

当出现错误时，不会呈现路由的[`element`](https://reactrouter.com/en/main/route/route#element)，而是渲染[`errorElement`](https://reactrouter.com/en/main/route/error-element) 。

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

如果一个路由没有 `errorElement` ，错误会冒泡到最近的具有 `errorElement` 的父级路由：

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

查看：

- [`<Route errorElement>`](https://reactrouter.com/en/main/route/error-element)
- [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)

##  滚动恢复

React Router 将在导航时模拟浏览器的滚动恢复，等待数据加载完成后再滚动。这确保了滚动位置恢复到正确的位置。

您还可以通过基于其他内容（如URL路径名）进行还原并防止在某些链接（如页面中间的选项卡）上发生滚动来自定义行为。

查看：

- [`<ScrollRestoration>`](https://reactrouter.com/en/main/components/scroll-restoration)

## Web标准 API

React Router 基于 Web 标准 API 建立的。[loader](https://reactrouter.com/en/main/route/loader) 和 [action](https://reactrouter.com/en/main/route/action) 接收标准的 Web Fetch API[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)对象，并且也可以返回[`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)对象。取消操作是通过 [Abort Signals](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)完成的，搜索参数是通过[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)处理的，数据变更是通过[HTML Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)处理的。

当你变得更擅长React Router时，你也变得更擅长Web平台。