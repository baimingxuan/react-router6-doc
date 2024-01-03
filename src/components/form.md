# `<Form>`

类型声明

```ts
declare function Form(props: FormProps): React.ReactElement;

interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  method?: "get" | "post" | "put" | "patch" | "delete";
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  action?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  fetcherKey?: string;
  navigate?: boolean;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  unstable_viewTransition?: boolean;
}
```

`Form` 组件是对纯 HTM [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)的封装，它模拟浏览器进行客户端路由和数据突变。它不像 React 生态系统中的表单验证/状态管理库（为此，我们推荐使用浏览器内置的[HTML 表单验证](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)和后端服务器上的数据验证）。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅[选择路由](../routers/picking-a-router)。

```jsx
import { Form } from "react-router-dom";

function NewEvent() {
  return (
    <Form method="post" action="/events">
      <input type="text" name="title" />
      <input type="text" name="description" />
      <button type="submit">Create</button>
    </Form>
  );
}
```

> NOTE
>
> 确保您的输入有名称，否则 `FormData` 将不包含该字段的值。

所有这些都会触发任何已渲染[`useNavigation`](../hooks/use-navigation)钩子的状态更新，因此您可以在异步操作执行过程中构建待定指标和优化的用户界面。

如果表单*不像*导航，您可能需要 [`useFetcher`](../hooks/use-fetcher) 。

## `action`

提交表单的 URL，与[HTML 表单操作](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action)一样。唯一不同的是默认操作。对于 HTML 表单，默认为完整的 URL。对于 `<Form>` ，默认为上下文中最近路径的相对 URL。

思考以下路由和组件：

```jsx
function ProjectsLayout() {
  return (
    <>
      <Form method="post" />
      <Outlet />
    </>
  );
}

function ProjectsPage() {
  return <Form method="post" />;
}

<DataBrowserRouter>
  <Route
    path="/projects"
    element={<ProjectsLayout />}
    action={ProjectsLayout.action}
  >
    <Route
      path=":projectId"
      element={<ProjectsPage />}
      action={ProjectsPage.action}
    />
  </Route>
</DataBrowserRouter>;
```

如果当前 URL 是 `"/projects/123"` ，那么子路由 `ProjectsPage` 内的表单就会如你所想的那样有一个默认操作： `"/projects/123"` 。在这种情况下，当路由是最深匹配路由时， `<Form>` 和纯 HTML 表单的结果是一样的。

但是， `ProjectsLayout` 中的表单将指向 `"/projects"` ，而不是完整的 URL。换句话说，它指向的是渲染表单的路由中 URL 的匹配段。

如果在路由模块周围添加一些约定，这将有助于提高可移植性，并将表单及其动作处理程序放在同一位置。

如果需要发布到不同的路由，则添加一个操作属性：

```jsx
<Form action="/projects/new" method="post" />
```

**另请参阅：**

- [索引搜索参数](../guides/index-search-param)（索引与父路由消歧对比）

> NOTE
>
> 请参阅 `useResolvedPath` 文档中的 [Splat Paths](../hooks/use-resolved-path#splat-paths) 部分，了解 `future.v7_relativeSplatPath` future 标志在 `splat` 路由中相对 `useNavigate()` 的行为。

## `method`

这决定了要使用的[HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)。与纯 HTML[表单方法](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method)相似，除 "get "和 "post "外，它还支持 "put"、"patch "和 "delete"。默认为 "get"。

### GET提交

默认方法为“get”。Get 提交*不会调用`action`*。Get 提交与普通导航（用户点击链接）相同，只是用户可以提供搜索参数，从表单进入 URL。

```jsx
<Form method="get" action="/products">
  <input
    aria-label="search products"
    type="text"
    name="q"
  />
  <button type="submit">Search</button>
</Form>
```

假设用户键入“running shoes”并提交表单。React Router 模拟浏览器，将表单序列化为 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，然后将用户导航到 `"/products?q=running+shoes"` 。这就好比你以开发者的身份渲染了一个 `<Link to="/products?q=running+shoes">` ，而不是让用户动态提供查询字符串。

路由`loader`访问这些值最方便的方法是从 `request.url` 创建一个新的[`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)，然后加载数据。

```jsx
<Route
  path="/products"
  loader={async ({ request }) => {
    let url = new URL(request.url);
    let searchTerm = url.searchParams.get("q");
    return fakeSearchProducts(searchTerm);
  }}
/>
```

### 突变提交

所有其他方法都是 "突变提交"，这意味着您打算通过 POST、PUT、PATCH 或 DELETE 来更改数据。请注意，纯 HTML 表单只支持 "post "和 "get"，我们也倾向于使用这两种方法。

当用户提交表单时，React Router 会将 `action` 与应用程序的路由相匹配，并调用带有序列化[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)的 `<Route action>` 。操作完成后，页面上的所有`loader`数据将自动重新验证，以保持用户界面与数据同步。

该方法可在[`request.method`](https://developer.mozilla.org/en-US/docs/Web/API/Request/method)上调用路由操作。您可以使用该方法向您的数据抽象指示提交的意图。

```jsx
<Route
  path="/projects/:id"
  element={<Project />}
  loader={async ({ params }) => {
    return fakeLoadProject(params.id);
  }}
  action={async ({ request, params }) => {
    switch (request.method) {
      case "PUT": {
        let formData = await request.formData();
        let name = formData.get("projectName");
        return fakeUpdateProject(name);
      }
      case "DELETE": {
        return fakeDeleteProject(params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }}
/>;

function Project() {
  let project = useLoaderData();

  return (
    <>
      <Form method="put">
        <input
          type="text"
          name="projectName"
          defaultValue={project.name}
        />
        <button type="submit">Update Project</button>
      </Form>

      <Form method="delete">
        <button type="submit">Delete Project</button>
      </Form>
    </>
  );
}
```

正如您所看到的，两个表单提交到相同的路径，但您可以使用 `request.method` 来分支您打算做的事情。操作完成后， `loader` 将重新验证，用户界面将自动与新数据同步。

## `navigate`

您可以指定 `<Form navigate={false}>` ，让表单跳过导航，在内部使用[fetcher](../hooks/use-fetcher)。这基本上是 `useFetcher()` + `<fetcher.Form>` 的简写，在这种情况下，您并不关心结果数据，而只想启动提交并通过[`useFetchers()`](../hooks/use-fetchers)访问待处理状态。

## `fetcherKey`

在使用非导航 `Form` 时，也可选择通过 `<Form navigate={false} fetcherKey="my-key">` 指定自己的取值器密钥。

## `replace`

指示表格替换历史堆栈中的当前条目，而不是推送新条目。

```jsx
<Form replace />
```

默认行为以表单行为为条件：

- `method=get`表单默认为`false`

- 提交方法取决于 `formAction` 和 `action` 的行为：

  - 如果您的 `action` 抛出异常，则默认为 `false`
  - 如果您的 `action` 重定向到当前位置，则默认为 `true`
  - 如果您的 `action` 重定向到其他位置，则默认为 `false`
  - 如果您的 `formAction` 是当前位置，则默认为 `true`
  - 否则默认为 `false`

我们发现，使用 `get` 时，用户往往希望能够点击 "返回 "查看之前的搜索结果/过滤器等。但其他方法的默认值是 `true` ，以避免出现 "您确定要重新提交表单吗？"的提示。请注意，即使 `replace={false}` React Router 也不会在点击返回按钮且方法为 post、put、patch 或 delete 时重新提交表单。

换句话说，这其实只对 GET 提交有用，你要避免返回按钮显示之前的结果。

## `relative`

默认情况下，路径是相对于路由层次结构而言的，因此 `..` 会向上移动一级 `Route` 。有时，你可能会发现有一些匹配的 URL 模式没有嵌套的意义，这时你更愿意使用相对路径路由。您可以使用 `<Form to="../some/where" relative="path">`

## `reloadDocument`

指示表单跳过 React Router，使用浏览器内置行为提交表单。

```jsx
<Form reloadDocument />
```

建议使用 `<form>` ，这样可以获得默认和相对 `action` 的好处，除此之外，它与普通 HTML 表单相同。

如果没有[Remix](https://remix.run/)这样的框架，或者没有自己的服务器来处理路由的帖子，这个功能就不是很有用。

**另请参阅：**

- [`useNavigation`](../hooks/use-navigation)
- [`useActionData`](../hooks/use-action-data)
- [`useSubmit`](../hooks/use-submit)

## `state`

`state` 属性可用于为存储在[历史状态](https://developer.mozilla.org/en-US/docs/Web/API/History/state)中的新位置设置一个有状态的值。随后可通过 `useLocation()` 访问该值。

```jsx
<Form
  method="post"
  action="new-path"
  state={{ some: "value" }}
/>
```

您可以在 "新路径 "路由上访问该状态值：

```jsx
let { state } = useLocation();
```

## `preventScrollReset`

如果使用[`<ScrollRestoration>`](../components/scroll-restoration)，则可以防止在表单操作重定向到新位置时，滚动位置被重置到窗口顶部。

```jsx
<Form method="post" preventScrollReset={true} />
```

**另请参阅：**

[`<Link preventScrollReset>`](../components/link#preventscrollreset)

## `unstable_viewTransition`

`unstable_viewTransition` 属性通过在 `document.startViewTransition()` 中封装最终状态更新，为该导航启用了[视图转换](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)。如果需要为该视图转换应用特定样式，还需要利用 [`unstable_useViewTransitionState()`](../hooks/use-view-transition-state)。

> IMPORTANT
>
> 请注意，此应用程序接口标记为不稳定状态，可能会在未发布重大版本时发生破坏性更改。

# 实例

## 大型列表过滤

GET 提交的常见用例是过滤大量列表，如电子商务和旅游预订网站。

```jsx
function FilterForm() {
  return (
    <Form method="get" action="/slc/hotels">
      <select name="sort">
        <option value="price">Price</option>
        <option value="stars">Stars</option>
        <option value="distance">Distance</option>
      </select>

      <fieldset>
        <legend>Star Rating</legend>
        <label>
          <input type="radio" name="stars" value="5" />{" "}
          ★★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="4" /> ★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="3" /> ★★★
        </label>
        <label>
          <input type="radio" name="stars" value="2" /> ★★
        </label>
        <label>
          <input type="radio" name="stars" value="1" /> ★
        </label>
      </fieldset>

      <fieldset>
        <legend>Amenities</legend>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="pool"
          />{" "}
          Pool
        </label>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="exercise"
          />{" "}
          Exercise Room
        </label>
      </fieldset>
      <button type="submit">Search</button>
    </Form>
  );
}
```

当用户提交该表单时，表单将根据用户的选择以类似这样的方式序列化到 URL 中：

```jsx
/slc/hotels?sort=price&stars=4&amenities=pool&amenities=exercise
```

您可以通过 `request.url` 访问这些值。

```jsx
<Route
  path="/:city/hotels"
  loader={async ({ request }) => {
    let url = new URL(request.url);
    let sort = url.searchParams.get("sort");
    let stars = url.searchParams.get("stars");
    let amenities = url.searchParams.getAll("amenities");
    return fakeGetHotels({ sort, stars, amenities });
  }}
/>
```

**另请参阅：**

- [useSubmit](../hooks/use-submit)