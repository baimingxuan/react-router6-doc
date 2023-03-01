## 客户端路由

React Router 启用“客户端路由”。

在传统网站中，浏览器从 Web 服务器请求文档，下载和解析 CSS 和 JavaScript 资源，并渲染从服务器发送的 HTML。当用户单击链接时，它会为新页面重新开始这个过程。

客户端路由允许您的应用通过链接点击更新 URL，而无需从服务器再次请求另一个文档。相反，您的应用程序可以立即渲染一些新的 UI ，并使用`fetch`进行数据请求，用新数据更新页面。

这可以实现更快的用户体验，因为浏览器不需要请求全新的文档，也不用重新解析 CSS 和 JavaScript 资源。它还通过动画等方式实现更动态的用户体验。

客户端路由是通过创建`Router`来实现的，并使用`Link`和`<Form>`来链接/提交页面：

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

嵌套路由是将 URL 片段耦合到组件层次结构和数据的一种思想。React Router 的嵌套路由的灵感来自于 2014 年左右的 Ember.js 中的路由系统。Ember 团队意识到，几乎在每种情况下，URL 的片段都会确定：

- 要在页面上渲染的布局
- 这些布局的数据依赖关系

React Router 将此约定与 API 结合起来，用于创建与 URL 段和数据耦合的嵌套布局。

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

这种[可视化](https://remix.run/_docs/routing)可能会有所帮助。

## 动态片段

URL 的片段可以是被解析并提供给各种 api 的动态占位符。

```jsx
<Route path="projects/:projectId/tasks/:taskId" />
```

这两个带`:`的片段是动态的，并提供给以下 API：

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

##  分级路由匹配

在将 URL 匹配到路由时，React Router 会根据片段数、静态段、动态段、分段等对路由进行分级，并选择*最具体*的匹配项。

例如，思考这两条路由：

```jsx
<Route path="/teams/:teamId" />
<Route path="/teams/new" />
```

现在思考的 URL 是http://example.com/teams/new。

即使两条路由在技术上都匹配 URL（`new`可能是`:teamId`），但您直观地知道我们希望选择第二条路由（`/teams/new`）。React Router 的匹配算法也知道这一点。

使用分级路由，您就不必担心路由排序了。

##  活动链接

大多数 Web 应用程序在 UI 顶部、侧边栏和通常的多个级别都有持久的导航部分。样式化活动导航项，使用`<NavLink>`可以很容易让用户知道它们在应用程序中的位置 ( `isActive`) 或它们要去的位置 ( `isPending`) 。

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

您还可以使用[`useMatch`](https://reactrouter.com/en/main/hooks/use-match)针对链接之外的任何其他`"active"`指示。

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

与 HTML 的`<a href>`一样，`<Link to>`和`<NavLink to>`也可以采用相对路径，并具有嵌套路由的增强行为。

给定以下路由配置：

```jsx
<Route path="home" element={<Home />}>
  <Route path="project/:projectId" element={<Project />}>
    <Route path=":taskId" element={<Task />} />
  </Route>
</Route>
```

思考 https://example.com/home/project/123，它渲染以下路由组件层次结构：

```jsx
<Home>
  <Project />
</Home>
```

如果`<Project />`渲染以下链接，链接的超链接将像这样解析：

| In`<Project>`@`/home/project/123` | Resolved`<a href>`      |
| --------------------------------- | ----------------------- |
| `<Link to="abc">`                 | `/home/project/123/abc` |
| `<Link to=".">`                   | `/home/project/123`     |
| `<Link to="..">`                  | `/home`                 |
| `<Link to=".." relative="path">`  | `/home/project`         |

请注意，第一个`..`删除`project/:projectId`路由的两个片段。默认情况下，`..`相对链接遍历路由层次结构，而不是 URL 段。在下一个示例中添加`relative="path"`可以让您遍历路径段。

相对链接总是相对于*展示*它们的路由路径，而不是完整的 URL。这意味着如果用户在 URL `/home/project/123/abc` 中使用`<Link to="abc">`到`<Task />`更深的导航，则在`<Project>`的超链接将不会改变（与普通的`<a href>`相反，这是客户端路由的常见问题）。

## 数据加载

由于 URL 片段通常映射到您应用程序的持久数据，因此 React Router 提供了传统的数据加载钩子以在导航期间启动数据加载。结合嵌套路由，在特定`URL`上的多个布局的所有数据都可以并行加载。

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

数据通过`useLoaderData`提供给您的组件。

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

当用户访问或单击指向https://example.com/real-salt-lake/45face3的链接时，将在该 URL 的 UI 渲染之前并行调用和加载所有三个路由加载器。

##  重定向

在加载或更改数据时，通常会将用户[重定向](https://reactrouter.com/en/main/fetch/redirect)到不同的路径。

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

当用户在应用程序中导航时，下一页的数据会在页面渲染之前加载。在此期间提供用户反馈很重要，这样应用程序才不会感觉没有响应。

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

##  使用`<Suspense>`的骨架UI

不必等待下一页的数据，您可以 [`defer`](https://reactrouter.com/en/main/utils/defer) 数据，以便UI在数据加载时立即切换到带有占位符UI的下一个屏幕。

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

HTML 表单是导航事件，就像链接一样。React Router 支持带有客户端路由的 HTML 表单工作流。

提交表单时，将阻止正常的浏览器导航事件，并创建一个包含[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)提交内容的正文的[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)。此请求将发送到`<Route action>`与表单的匹配的`<Form action>`。

表单元素的`name`属性被提交给 action：

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

正常的 HTML 文档请求被阻止，并发送到匹配路由的操作（匹配`<form action>`的`<Route path>`），包括`request.formData`.

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

几十年的`web`惯例表明，当一个表单被提交到服务器时，数据会发生变化，并渲染一个新页面。React Router的基于html的数据突变api遵循了这个约定。

在调用路由操作之后，将再次调用页面上所有数据的加载器，以确保UI自动与数据保持最新。没有要过期的缓存键，没有要重新加载的上下文提供程序。

查看：

- [“创建联系人”教程](https://reactrouter.com/en/main/start/tutorial#creating-contacts)

## 繁忙的指示器

将表单提交给路由操作时，您可以访问导航状态以显示忙碌指示器、禁用字段集等。

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

##  乐观的UI

知道发送给[action](https://reactrouter.com/en/main/route/action)的[`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)通常足以跳过忙碌指示器，并立即渲染下一个状态的UI，即使异步工作仍未完成。这就是所谓的“乐观UI”。

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

（是的，HTML 按钮可以有一个`name`和`value`）。

虽然使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)来实现乐观 UI 更为常见，但您也可以使用[`navigation.formData`](https://reactrouter.com/en/main/hooks/use-navigation#navigationformdata)对普通表单进行同样的操作。

##  数据获取器

HTML 表单是突变的模型，但它们有一个主要限制：一次只能有一个表单，因为表单提交是一种导航。

大多数web应用程序需要允许多个突变同时发生，就像一个记录列表，每个记录都可以被独立删除、标记完成、点赞等。

[Fetcher](https://reactrouter.com/en/main/hooks/use-fetcher)允许您与路由[action](https://reactrouter.com/en/main/route/action)和[loader](https://reactrouter.com/en/main/route/loader)交互，而不会在浏览器中引起导航，但仍然可以获得所有传统的好处，如错误处理、重新验证、中断处理和竞争条件处理。

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

每个任务都可以独立于其他任务标记为完成，具有自己的挂起状态，并且不需要使用[fetcher](https://reactrouter.com/en/main/hooks/use-fetcher)进行导航：

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

React Router 将取消过时的操作，只自动提交新数据。

任何时候你使用异步 UI，你都有竞争条件的风险：当一个异步操作开始后，但在一个更早的操作之前完成。结果是一个显示错误状态的用户界面。

考虑一个在用户键入时更新列表的搜索字段：

```
?q=ry    |---------------|
                         ^ commit wrong state
?q=ryan     |--------|
                     ^ lose correct state
```

尽管`q?=ryan`的查询开始较晚，但它较早完成。如果处理不当，结果将暂时是`?q=ryan`的正确值，但随后会推翻`?q=ry`的错误结果。节流和防抖是不够的（你仍然可以中断通过的请求）。你需要取消。

如果你使用 React Router 的数据约定，你可以完全自动地避免这个问题。

```
?q=ry    |-----------X
                     ^ cancel wrong state when
                       correct state completes earlier
?q=ryan     |--------|
                     ^ commit correct state
```

React Router 不仅像这样处理导航的竞争条件，它还处理许多其他情况，例如使用[`fetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)自动完成加载结果或执行多个并发突变（及其自动化的、并发的重新验证）。

## 错误处理

绝大多数应用程序错误都由 React Router 自动处理。它将捕获在以下情况下抛出的任何错误：

- 渲染
- 加载数据中
- 更新数据

实际上，这几乎是应用程序中的所有错误，除了事件处理程序 ( `<button onClick>`) 或`useEffect`抛出的错误。React Router 应用程序往往很少有这两种功能。

当一个错误被抛出时，不会渲染路由的[`element`](https://reactrouter.com/en/main/route/route#element)，而是渲染[`errorElement`](https://reactrouter.com/en/main/route/error-element) 。

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

如果路由没有`errorElement`，错误将冒泡到最近的父路由，并带有一个`errorElement`：

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

React Router 会在导航时模拟浏览器的滚动还原，等待数据加载后再滚动。这确保滚动位置恢复到正确的位置。

您还可以通过基于位置以外的其他内容（如 url 路径名）恢复并防止滚动发生在某些链接（如页面中间的选项卡）来自定义行为。

查看：

- [`<ScrollRestoration>`](https://reactrouter.com/en/main/components/scroll-restoration)

## Web标准 API

React Router 基于 Web 标准 API 构建的。[loader](https://reactrouter.com/en/main/route/loader)和[action](https://reactrouter.com/en/main/route/action)接收标准的 Web Fetch API[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)对象，也可以返回[`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)对象。取消是通过[Abort Signals](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)完成的，搜索参数是通过[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)处理的，数据突变是通过[HTML Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)处理的。

当你在 React Router 上做得更好时，你在 Web 平台上也会做得更好。