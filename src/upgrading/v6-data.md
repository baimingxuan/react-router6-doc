# 迁移到 RouterProvider

当我们最初开始将 [Remix Data API 移植到 React Router ](https://remix.run/blog/remixing-react-router)时，我们意识到它们带来了一种非常不同的路由结构化方式。*在 React 渲染组件树*的过程中，我们不再通过[`<Routes>`](https://baimingxuan.github.io/react-router6-doc/components/routes) 组件来实现路由，而是需要解除路由定义，以便将[获取与渲染分离开来](https://www.youtube.com/watch?v=95B8mnhzoCM)。

这带来了一个有趣的难题。我们有大量的 v6 [`BrowserRouter`](https://baimingxuan.github.io/react-router6-doc/router-components/browser-router) 应用程序在使用 `<Routes>` 组件定义路由，我们如何为它们提供平滑的升级体验，而不需要大爆炸式地迁移到新方法？这就排除了推出新版本的可能性，我们专注于以*完全向后兼容*的方式添加这些新功能，为用户提供从 [`BrowserRouter`](https://baimingxuan.github.io/react-router6-doc/router-components/browser-router) 到 [`RouterProvider`](https://baimingxuan.github.io/react-router6-doc/routers/router-provider) 的渐进升级路径。

## 差异

首先要注意的是一些新的[数据 API](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router#data-apis)，它们只能在通过新的[数据路由](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router)（即 [`createBrowserRouter` ](https://baimingxuan.github.io/react-router6-doc/routers/create-browser-router)）定义的路由上运行。其中包括几类 API：

- 路由级数据应用程序接口，如 `loader` , `action` , `shouldRevalidate` , `handle` , 和 `lazy`
- I组件内数据钩子，如 `useLoaderData` , `useActionData` , `useFetcher` , `useMatches` , `useNavigation` 等。
- 错误处理 API，如 `route.errorElement` 、 `route.ErrorBoundary` 和 `useRouteError`

`BrowserRouter` 和 `RouterProvider` 应用程序中仍可使用 6.4.0 版之前的其余 API。其中包括常用钩子/组件，如 `useNavigate` , `useLocation` , `useParams` , `<Link>` , `<Outlet />` 等。

## 迁移

我们构建了新的 `<RouterProvider>` 组件，以便在根路由器定义的路由上启用新的数据 API，同时不排除 `BrowserRouter` 应用程序中常用的后代 `<Routes>` 树。这样做的目的很明确，就是允许从一个路由器向另一个路由器增量迁移。让我们来看看如何做到这一点。

### 当前应用

假设我们当前的应用程序有两个子路由树，假设这些路由都在组件内获取数据，并呈现各自的加载和报错状态。

```jsx
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<BlogApp />} />
        <Route path="/users/*" element={<UserApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>
        Check out the <Link to="/blog">blog</Link> or the{" "}
        <Link to="users">users</Link> section
      </p>
    </>
  );
}

function BlogApp() {
  return (
    <Routes>
      <Route index element={<h1>Blog Index</h1>} />
      <Route path="posts" element={<h1>Blog Posts</h1>} />
    </Routes>
  );
}

function UserApp() {
  return (
    <Routes>
      <Route index element={<h1>Users Index</h1>} />
    </Routes>
  );
}
```

### 添加带有根 splat 路由的 RouterProvider

只需稍作改动，我们就能在 `RouterProvider` 中呈现该应用程序：

1. 将当前的 `App` 组件更改为 `Root`
2. 移除 `<BrowserRouter>` 组件
3. 创建一个数据路由器单例，并为 `Root` 元素创建一个 splat 路由
4. 添加一个新的 `App` 组件，渲染一个 `<RouterProvider>`

```jsx
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

// 4️⃣ RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}

// 1️⃣ Changed from App to Root
function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/*" element={<BlogApp />} />
      <Route path="/users/*" element={<UserApp />} />
    </Routes>
  );
}

function Home() {
  /* Unchanged */
}
function BlogApp() {
  /* Unchanged */
}
function UserApp() {
  /* Unchanged */
}
```

🥳 恭喜--你现在正在渲染一个数据路由器应用程序！但是等一下--我们还不能使用任何新东西，因为我们的路由都没有在顶部定义 `createBrowserRouter` 😢 。要访问新的 API，我们需要开始将路由逐一提升到数据路由器。

### 开始提升路由并利用数据API

让我们从 `<Home>` 组件的 `/` 路由开始。我们只需将 `<Route>` 定义上传到数据路由：

```jsx
const router = createBrowserRouter([
  { path: "/", Component: Home }, // 🆕
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      {/* ⬆️ Home route lifted up to the data router */}
      <Route path="/blog/*" element={<BlogApp />} />
      <Route path="/users/*" element={<UserApp />} />
    </Routes>
  );
}
```

现在，您可以将数据 API 添加到主页路由（ `loader` , `action` , `errorElement` ），并开始利用主页组件内的数据钩子（ `useLoaderData` , `useActionData` , `useFetcher` , `<Form>` 等）。

现在我们来看看如何将博客应用程序向上提升，但仍然是一次提升一个子路由。为了提升 `/blog` 索引路由，我们需要同时提升 `/blog/*` 拼接路由，但我们仍然可以在原处呈现 `/blog/posts` 路由，并将其分开处理。

```jsx
const router = createBrowserRouter([
  { path: "/", Component: Home },
  {
    // Lifted blog splat route
    path: "/blog/*",
    children: [
      // New blog index route
      { index: true, Component: () => <h1>Blog Index</h1> },
      // Blog subapp splat route added for /blog/posts matching
      { path: "*", Component: BlogApp },
    ],
  },
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      {/* ⬆️ Blog splat route lifted */}
      <Route path="/users/*" element={<UserApp />} />
    </Routes>
  );
}

function BlogApp() {
  return (
    <Routes>
      {/* ⬆️ Blog index route lifted */}
      <Route path="posts" element={<h1>Blog Posts</h1>} />
    </Routes>
  );
}
```

现在，你的博客索引路由可以参与数据加载了。

你可以一个路由一个路由地做下去，直到最终将所有路由都转换为数据路由，并且不再使用任何嵌套的 `<Routes>` 来定义路由树。为避免打包臃肿，建议使用 [route.lazy](https://baimingxuan.github.io/react-router6-doc/route/lazy) 属性来懒加载路由。

## FAQ

### 在 `<BrowserRouter>` 和 `<Routes>`之间学到的

许多人通过类似下面的方式在 `<Routes>` 周围渲染一个应用程序外壳：

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>My Super Cool App</h1>
        <NavMenu />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<BlogApp />} />
          <Route path="/users/*" element={<UserApp />} />
        </Routes>
      </main>
      <footer>©️ me 2023</footer>
    </BrowserRouter>
  );
}
```

如果您发现自己处于这种情况，不用担心--在开始上述迁移之前，您可以采取一种直接的解决方案。

这种情况很常见，但在上述迁移方法中却造成了问题，因为我们需要逐个路由地将东西移至 `RouterProvider` ，但这个 "应用程序外壳 "并不是路由的一部分......但也有可能是！应用程序外壳 "其实就是一个带有 `<Outlet>` 的布局路由！因此，在开始上述迁移之前，只需将这个 "应用程序外壳 "移动到路由周围的无路径布局路由中即可，如下所示：

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1️⃣ Wrap your routes in a pathless layout route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<BlogApp />} />
          <Route path="/users/*" element={<UserApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <header>
        <h1>My Super Cool App</h1>
        <NavMenu />
      </header>
      <main>
        {/* 2️⃣ Render the app routes via the Layout Outlet */}
        <Outlet />
      </main>
      <footer>©️ me 2023</footer>
    </>
  );
}
```

完成上述操作后，就可以继续执行上述迁移策略，开始将路由逐个移入 `RouterProvider` 。你可能想先移除布局路由，这样所有的子路由都可以嵌套在布局路由中。