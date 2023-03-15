# `Route`

路由可能是React Router应用程序中最重要的部分。它们将URL段与组件、数据加载和数据突变相结合。通过路由嵌套，复杂的应用程序布局和数据依赖关系变得简单和声明性。

路由是传递给路由器创建函数的对象：

```jsx
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

您也可以使用JSX声明路由和[`createRoutesFromElements`](https://reactrouter.com/en/main/utils/create-routes-from-elements)，元素的属性与路由对象的属性相同：

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

两种样式都没有被禁止，行为是相同的。在本文档的大部分内容中，我们将使用JSX样式，因为在React Router的上下文中，大多数人都习惯了这种样式。

> 如果您不希望指定React元素（即 `element={<MyComponent />}` ），您可以指定 `Component` （即 `Component={MyComponent}` ）而不是，React Router将在内部为您调用 `createElement` 。

## 类型声明

```tsx
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

路径模式用于匹配URL以确定此路由是否与URL、链接href或表单操作匹配。

### 动态段

如果路径段以 `:` 开头，则它变成了“动态段”。当路由与URL匹配时，动态段将从URL中解析并作为 `params` 提供给其他路由器API。

```jsx
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

您可以在一个路由路径中有多个动态段：

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

您仍然可以支持像这样的URL模式，只是需要进行一些自己的解析：

```jsx
function Product() {
  const { productSlug } = useParams();
  const [category, product] = productSlug.split("--");
  // ...
}
```

### 可选段

您可以通过在段末尾添加 `?` 使路由段变为可选。

```jsx
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

```jsx
<Route path="/project/task?/:taskId" />
```

### Splats

也称为“catchall”和“star”段。如果路由路径模式以 `/*` 结尾，则它将匹配 `/` 后面的任何字符，包括其他 `/` 字符。

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

您可以解构 `*` ，只需为其分配一个新名称。常见的名称是 `splat` ：

```jsx
let { org, "*": splat } = params;
```

### 布局路由

省略路径会使此路由成为“布局路由”。它参与UI嵌套，但不会向URL添加任何段。

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

在此示例中， `<h1>Layout</h1>` 将与每个子路由的 `element` 属性一起通过布局路由的 [Outlet](https://reactrouter.com/en/main/components/outlet) 渲染。

## `index`

确定路由是否为索引路由。索引路由在其父级的URL处呈现到其父级的[Outletz](https://reactrouter.com/en/main/route/outlet)中（如默认子路由）。

```jsx
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Team />} />
</Route>
```

这些特殊路由可能一开始很难理解，因此我们在此处专门为它们提供了指南：[索引路线](https://reactrouter.com/en/main/start/concepts#index-routes)。

## `children`

> （TODO：需要讨论嵌套，甚至可能是单独的文档）
>

## `caseSensitive`

指示路由是否匹配大小写：

```jsx
<Route caseSensitive path="/wEll-aCtuA11y" />
```

- 将匹配`"wEll-aCtuA11y"`
- 不会匹配`"well-actua11y"`

## `loader`

路由加载器在路由呈现之前调用并通过[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)为元素提供数据。

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

> 如果您没有使用像[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由，则不会执行任何操作
>

有关详细信息，请参见[加载器](https://reactrouter.com/en/main/route/loader)文档。

## `action`

当从[Form](https://reactrouter.com/en/main/components/form)、[fetcher](https://reactrouter.com/en/main/hooks/use-fetcher)或[submission](https://reactrouter.com/en/main/hooks/use-submit)发送提交到路由时，将调用路由操作。

```jsx
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
```

> 如果您没有使用像[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由器，则不会执行任何操作。
>

有关详细信息，请参见[操作](https://reactrouter.com/en/main/route/action)文档。

## `element`/`Component`

当路由与URL匹配时要呈现的React元素/组件。

如果要创建React元素，请使用 `element` ：

```jsx
<Route path="/for-sale" element={<Properties />} />
```

否则使用 `Component` ，React Router将为您创建React元素：

```jsx
<Route path="/for-sale" Component={Properties} />
```

## `errorElement`/`ErrorBoundary`

当路由在渲染时抛出异常，在 `loader` 或 `action` 中，这个 React 元素/组件将会代替正常的 `element` / `Component` 进行渲染。

如果你想自己创建 React 元素，请使用 `errorElement` ：

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

否则使用 `ErrorBoundary` ，React Router 将会为你创建 React 元素：

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

> 如果你没有使用像 [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由，这将不起作用。

请参阅[errorElement](https://reactrouter.com/en/main/route/error-element)文档以获取更多详细信息。

## `handle`

任何应用程序特定的数据。请参阅[useMatches](https://reactrouter.com/en/main/hooks/use-matches)文档以获取详细信息和示例。

## `lazy`

为了使你的应用程序包小并支持你的路由的代码分割，每个路由都可以提供一个异步函数，该函数解析你的路由定义中不匹配路由的部分 ( `loader` 、 `action` 、 `Component` / `element` 、 `ErrorBoundary` / `errorElement` 等)。

每个 `lazy` 函数通常会返回一个动态导入的结果。

```jsx
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);
```

然后在你的懒加载路由模块中，导出你想要为路由定义的属性：

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

如果你没有使用像 [`createBrowserRouter` ](https://reactrouter.com/en/main/routers/create-browser-router)这样的数据路由，这将不起作用。

请参阅 [lazy](https://reactrouter.com/en/main/route/lazy) 文档以获取更多详细信息。