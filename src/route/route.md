# `Route`

路由可能是 React Router 应用程序中最重要的部分。它们将 URL 段与组件、数据加载和数据突变联系在一起。通过路由嵌套，复杂的应用布局和数据依赖关系变得简单明了。

路由是传递给路由创建函数的对象：

```jsx
const router = createBrowserRouter([
  {
    // it renders this element
    element: <Team />,

    // when the URL matches this segment
    path: "teams/:teamId",

    // with this data loaded before rendering
    // 渲染前运行的加载器
    loader: async ({ request, params }) => {
      return fetch(
        `/fake/api/teams/${params.teamId}.json`,
        { signal: request.signal }
      );
    },

    // performing this mutation when data is submitted to it
    // 提交数据时执行此突变(处理重定向等副作用)
    action: async ({ request }) => {
      return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    // 发生错误时，渲染内容
    errorElement: <ErrorBoundary />,
  },
]);
```

您也可以使用[`createRoutesFromElements`](../utils/create-routes-from-elements)来编写`JSX`的方式声明路由，元素的属性与路由对象的属性相同：

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Team />}
      path="teams/:teamId"
      loader={async ({ params }) => {
        return fetch(
          `/fake/api/teams/${params.teamId}.json`
        );
      }}
      action={async ({ request }) => {
        return updateFakeTeam(await request.formData());
      }}
      errorElement={<ErrorBoundary />}
    />
  )
);
```

这两种样式都不受欢迎，其行为也完全相同。在本文档的大部分内容中，我们将使用 JSX 风格，因为在 React Router 的上下文中，大多数人都习惯使用这种风格。

> NOTE
>
> 在使用 `RouterProvider` 时，如果您不想指定 React 元素（即 `element={<MyComponent />}` ），可以指定 `Component` 代替（即 `Component={MyComponent}` ），React 路由器会在内部为您调用 `createElement` 。不过，您只能在 `RouterProvider` 应用程序中这样做，因为在 `<Routes>` 内部使用 `Component` 会降低 React 在不同渲染中重复使用所创建元素的能力。

## 类型声明

```ts
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
```

## `path`

与 URL 匹配的路径模式，以确定此路由是否匹配 URL、链接 href 或表单操作。

### 动态分段

如果路径段以 `:` 开头，则成为 "动态段"。当路由与 URL 匹配时，动态段将从 URL 中解析出来，并作为 `params` 提供给其他路由器 API。

```jsx
<Route
  // this path will match URLs like
  // 这个路径将会匹配如下内容：
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // the matching param will be available to the loader
  // 匹配到的参数将会用于loader和action中
  loader={({ params }) => {
    console.log(params.teamId); // "hotspur"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
// 也可以通过useParams访问
function Team() {
  let params = useParams();
  console.log(params.teamId); // "hotspur"
}
```

一个路由路径中可以有多个动态段：

```jsx
<Route path="/c/:categoryId/p/:productId" />;
// both will be available
params.categoryId;
params.productId;
```

动态段不能是“部分的”：

- 🚫`"/teams-:teamId"`
- ✅`"/teams/:teamId"`
- 🚫`"/:category--:productId"`
- ✅`"/:productSlug"`

您仍然可以支持像这样的 URL 模式，只是需要自己进行解析：

```jsx
function Product() {
  const { productSlug } = useParams();
  const [category, product] = productSlug.split("--");
  // ...
}
```

### 可选分段

您可以通过在段末尾添加 `?` 使路由段变为可选段。

```jsx
<Route
  // this path will match URLs like
  // - /categories
  // - /en/categories
  // - /fr/categories
  path="/:lang?/categories"
  // the matching param might be available to the loader
  loader={({ params }) => {
    console.log(params["lang"]); // "en"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Categories />}
/>;

// and the element through `useParams`
function Categories() {
  let params = useParams();
  console.log(params.lang);
}
```

您也可以选择静态片段：

```jsx
<Route path="/project/task?/:taskId" />
```

### Splats

也称为“catchall”和“star”片段。如果路由路径模式以 `/*` 结尾，则它将匹配 `/` 后面的任何字符，包括其他 `/` 字符。

```jsx
<Route
  // this path will match URLs like
  // - /files
  // - /files/one
  // - /files/one/two
  // - /files/one/two/three
  path="/files/*"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params["*"]); // "one/two"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params["*"]); // "one/two"
}
```

您可以对 `*` 进行重组，只需为其分配一个新名称。常见的名称是 `splat` ：

```jsx
let { org, "*": splat } = params;
```

### 布局路由

省略路径会使此路由成为“布局路由”。它参与用户界面嵌套，但不会在 URL 中添加任何分段。

```jsx
<Route
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
  <Route path="/" element={<h2>Home</h2>} />
  <Route path="/about" element={<h2>About</h2>} />
</Route>
```

在本例中， `<h1>Layout</h1>` 将通过布局路由的 [Outlet](../components/outlet) 与每个子路由的 `element` prop 一起呈现。

## `index`

确定路由是否为索引路由。索引路由通过父路由的 URL 呈现到父路由 [Outlet](../components/outlet) 中（就像默认的子路由）。

```jsx
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Team />} />
</Route>
```

这些特殊路线一开始可能会让人一头雾水，因此我们在这里专门为它们编写了一份指南：[索引路由](../start/concepts#index-routes)。

## `children`

>   IMPORTANT
>
> （TODO：需要讨论嵌套问题，甚至可以单独编写一份文档）

## `caseSensitive`

指示路由是否匹配大小写：

```jsx
<Route caseSensitive path="/wEll-aCtuA11y" />
```

- 将匹配`"wEll-aCtuA11y"`
- 不会匹配`"well-actua11y"`

## `loader`

路由加载器在路由渲染前被调用，并通过[`useLoaderData`](../hooks/use-loader-data)为元素提供数据。

```jsx
<Route
  path="/teams/:teamId"
  loader={({ params }) => {
    return fetchTeam(params.teamId);
  }}
/>;

function Team() {
  let team = useLoaderData();
  // ...
}
```

> IMPORTANT
>
> 如果您没有使用数据路由器（如[`createBrowserRouter`](../routers/create-browser-router)），这将毫无用处

详情请查看 [loader](../route/loader) 文档。

## `action`

当从[Form](../components/form)、[fetcher](../hooks/use-fetcher)或[submission](../hooks/use-submit) 向路由发送提交信息时，路由操作将被调用。

```jsx
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
```

> 如果您没有使用数据路由器（如 [`createBrowserRouter`](../routers/create-browser-router)），这将毫无用处
>

更多详情，请参阅 [action](../route/action) 文档。

## `element`/`Component`

当路由与 URL 匹配时要渲染的 React 元素/组件。

如果要创建 React 元素，请使用 `element` ：

```jsx
<Route path="/for-sale" element={<Properties />} />
```

否则，请使用 `Component` ，React Router 会为您创建 React 元素：

```jsx
<Route path="/for-sale" Component={Properties} />
```

> IMPORTANT
>
> 您只能通过 `RouterProvider` 选择 `Component` API 用于数据路由。在 `<Routes>` 内的 `<Route>` 上使用此 API 会降低 React 跨渲染重用已创建元素的能力。

## `errorElement`/`ErrorBoundary`

在 `loader` 或 `action` 中，当路由在渲染时抛出异常时，该 React 元素/组件将代替正常的 `element` / `Component` 进行渲染。

如果您想自己创建 React 元素来作为出现异常时的显示，请使用 `errorElement` ：

```jsx
<Route
  path="/for-sale"
  // if this throws an error while rendering
  element={<Properties />}
  // or this while loading properties
  loader={() => loadProperties()}
  // or this while creating a property
  action={async ({ request }) =>
    createProperty(await request.formData())
  }
  // then this element will render
  errorElement={<ErrorBoundary />}
/>
```

否则，请使用 `ErrorBoundary` ，React Router 会为您创建 React 元素：

```jsx
<Route
  path="/for-sale"
  Component={Properties}
  loader={() => loadProperties()}
  action={async ({ request }) =>
    createProperty(await request.formData())
  }
  ErrorBoundary={ErrorBoundary}
/>
```

> IMPORTANT
>
> 如果您没有使用数据路由器（如 [`createBrowserRouter`](../routers/create-browser-router) ），这将毫无用处

更多详情，请参阅 [errorElement](../route/error-element) 文档。

## `handle`

任何特定于应用程序的数据。有关详情和示例，请参阅 [useMatches](../hooks/use-matches) 文档。

## `lazy`

为了保持应用程序捆绑包的小巧并支持路由的代码拆分，每个路由都可以提供一个异步函数，用于解析路由定义中与路由不匹配的部分（ `loader` , `action` , `Component` / `element` , `ErrorBoundary` / `errorElement` 等）。

每个 `lazy` 函数通常都会返回动态导入的结果。

```jsx
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
```

然后在懒路由模块中，导出你想为路由定义的属性：

```jsx
export async function loader({ request }) {
  let data = await fetchData(request);
  return json(data);
}

export function Component() {
  let data = useLoaderData();

  return (
    <>
      <h1>You made it!</h1>
      <p>{data}</p>
    </>
  );
}
```

> IMPORTANT
>
> 如果您没有使用数据路由器（如 [`createBrowserRouter`](../routers/create-browser-router)），这将毫无用处

更多详情，请参阅 [lazy](../route/lazy) 文档。
