# `Route`

路由可能是 React Router 应用程序中最重要的部分。它们将 URL 段耦合到组件、数据加载和数据突变。通过路由嵌套，复杂的应用程序布局和数据依赖变得简单和声明式。

路由是传递给路由器创建函数的对象：

```javascript
const router = createBrowserRouter([
  {
    // it renders this element
    element: <Team />,

    // when the URL matches this segment
    path: "teams/:teamId",

    // with this data loaded before rendering
    loader: async ({ request, params }) => {
      return fetch(
        `/fake/api/teams/${params.teamId}.json`,
        { signal: request.signal }
      );
    },

    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    errorElement: <ErrorBoundary />,
  },
]);
```

您还可以使用 JSX 和 声明您的路由，[`createRoutesFromElements`](https://reactrouter.com/en/main/utils/create-routes-from-elements)元素的属性与路由对象的属性相同：

```javascript
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

两种风格都没有被劝阻，行为也是相同的。对于本文档的大部分内容，我们将使用 JSX 样式，因为这是大多数人在 React Router 上下文中习惯的样式。

## 类型声明

```javascript
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
}
```

## `path`

与 URL 匹配的路径模式以确定此路由是否与 URL、链接 href 或表单操作匹配。

### 动态细分

如果路径段以 开头，`:`则它成为“动态段”。当路由与 URL 匹配时，将从 URL 解析动态段并提供`params`给其他路由器 API。

```javascript
<Route
  // this path will match URLs like
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params.teamId); // "hotspur"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params.teamId); // "hotspur"
}
```

您可以在一条路线路径中拥有多个动态段：

```javascript
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

你仍然可以支持这样的 URL 模式，你只需要做一些你自己的解析：

```javascript
function Product() {
  const { productSlug } = useParams();
  const [category, product] = productSlug.split("--");
  // ...
}
```

### 可选部分

`?`您可以通过在段的末尾添加一个来使路线段成为可选的。

```javascript
<Route
  // this path will match URLs like
  // - /categories
  // - /en/categories
  // - /fr/categories
  path="/:lang?/categories"
  // the matching param might be available to the loader
  loader={({ params }) => {
    console.log(params["*"]); // "one/two"
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

您也可以有可选的静态段：

```javascript
<Route path="/project/task?/:taskId" />
```

### 拼音

也称为“catchall”和“star”段。如果路由路径模式以`/*`then 结尾，它将匹配 之后的任何字符`/`，包括其他`/`字符。

```javascript
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

您可以解构`*`，只需为其分配一个新名称即可。一个常见的名字是`splat`：

```javascript
let { org, "*": splat } = params;
```

### 布局路线

TODO：用例子扩展

省略路径使这条路线成为“布局路线”。它参与 UI 嵌套，但不向 URL 添加任何段。

## `index`

确定路由是否为索引路由。索引路由在其父级 URL 处呈现到其父级的[Outlet](https://reactrouter.com/en/main/route/outlet)（类似于默认子路由）。

```javascript
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Team />} />
</Route>
```

这些特殊路线一开始可能难以理解，因此我们在这里专门针对它们提供了指南：[索引路线](https://reactrouter.com/en/main/start/concepts#index-routes)。

## `children`

（TODO：需要谈论嵌套，甚至可能是一个单独的文档）

## `caseSensitive`

指示路由是否匹配大小写：

```javascript
<Route caseSensitive path="/wEll-aCtuA11y" />
```

- 将匹配`"wEll-aCtuA11y"`
- 不会匹配`"well-actua11y"`

## `loader`

路由加载器在路由渲染之前被调用，并通过 为元素提供数据[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)。

```javascript
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

如果您不使用像 之类的数据路由器[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)，这将不会执行任何操作

有关更多详细信息，请参阅[加载程序](https://reactrouter.com/en/main/route/loader)文档。

## `action`

[当提交从Form](https://reactrouter.com/en/main/components/form)、[fetcher](https://reactrouter.com/en/main/hooks/use-fetcher)或[submission](https://reactrouter.com/en/main/hooks/use-submit)发送到路由时调用路由操作。

```javascript
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
```

如果您不使用像 之类的数据路由器[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)，这将不会执行任何操作

有关详细信息，请参阅[操作文档。](https://reactrouter.com/en/main/route/action)

## `element`

当路由与 URL 匹配时要呈现的元素。

```javascript
<Route path="/for-sale" element={<Properties />} />
```

## `errorElement`

当路由在渲染时抛出异常时，在 a`loader`或 an 中`action`，将渲染此元素而不是正常的`element`.

```javascript
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

如果您不使用像 之类的数据路由器[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)，这将不会执行任何操作

有关详细信息，请参阅[errorElement](https://reactrouter.com/en/main/route/error-element)文档。

## `handle`

任何特定于应用程序的数据。有关详细信息和示例，请参阅[useMatches](https://reactrouter.com/en/main/hooks/use-matches)文档。