# `<Form>`

orm 组件是一个包装器，它包装了一个普通的 HTML [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)，模拟浏览器进行客户端路由和数据变更。它不是像你在 React 生态系统中习惯的表单验证/状态管理库（对于这个，我们建议使用浏览器内置的[HTML 表单验证](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)和后端服务器上的数据验证）。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)。
>

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

> 确保你的输入框有名称，否则 `FormData` 将不包括该字段的值。
>

所有这些都会触发状态更新到任何渲染的[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)钩子，因此您可以在异步操作正在进行时构建挂起指示器和乐观 UI。

如果表单不像导航，您可能想要 [`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher) 。

## `action`

表单将提交到的 URL，就像[HTML 表单操作](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action)一样。唯一的区别是默认操作。唯一的区别是默认操作。对于 HTML 表单，默认为完整 URL。对于 `<Form>` ，默认为上下文中最接近的路由的相对 URL。

考虑以下路由和组件：

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

如果当前 URL 是 `"/projects/123"` ，则子路由 `ProjectsPage` 中的表单将具有默认操作，就像您所期望的那样： `"/projects/123"` 。在这种情况下，路由是最深匹配路由， `<Form>` 和普通 HTML 表单具有相同的结果。

但是， `ProjectsLayout` 中的表单将指向 `"/projects"` ，而不是完整的 URL。换句话说，它指向在表单呈现的路由的匹配段。

这有助于可移植性以及表单和它们的操作处理程序的协同位置，当您在路由模块周围添加一些约定时。

如果您需要发布到不同的路由，则添加一个操作属性：

```jsx
<Form action="/projects/new" method="post" />
```

**另请参阅：**

- [索引搜索参数](https://reactrouter.com/en/main/guides/index-search-param)（索引与父路由消歧）

## `method`

这确定要使用的[HTTP 动词](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)。与纯 HTML[表单方法](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method)相同，除了它还支持“put”、“patch”和“delete”以外，还支持“get”和“post”。默认值为“get”。

### GET提交

默认方法为“get”。Get 提交不会调用操作。Get 提交与正常导航相同（用户单击链接），除了用户可以提供到表单的 URL 的搜索参数。

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

假设用户键入“running shoes”并提交表单。React Router 模拟浏览器，将表单序列化为[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，然后将用户导航到 `"/products?q=running+shoes"` 。就像您作为开发人员呈现了 `<Link to="/products?q=running+shoes">` 一样，但是您让用户动态提供查询字符串。

您的路由加载器可以通过从 `request.url` 创建新的[`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)加载数据来最方便地访问这些值。

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

所有其他方法都是“突变提交”，这意味着您打算使用 POST、PUT、PATCH 或 DELETE 更改有关数据的某些内容。请注意，纯 HTML 表单仅支持“post”和“get”，我们也倾向于坚持这两个。

当用户提交表单时，React Router将匹配 `action` 到应用程序的路由，并使用序列化的[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)调用 `<Route action>` 。当操作完成时，页面上的所有加载器数据将自动重新验证，以使您的UI与数据保持同步。

该方法将在调用的路由操作内部的[`request.method`](https://developer.mozilla.org/en-US/docs/Web/API/Request/method)上可用。您可以使用此功能指示数据抽象有关提交意图的信息。

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

正如您所看到的，两个表单都提交到同一个路由，但您可以使用 `request.method` 来分支处理您的意图。操作完成后， `loader` 将被重新验证，UI将自动与新数据同步。

## `replace`

指示表单替换历史堆栈中的当前条目，而不是推送新条目。

```jsx
<Form replace />
```

默认行为取决于表单行为：

- `method=get`表单默认为`false`

- 提交方法取决于 `formAction` 和 `action` 的行为：

  - 如果您的 `action` 抛出异常，则默认为 `false`
  - 如果您的 `action` 重定向到当前位置，则默认为 `true`
  - 如果您的 `action` 重定向到其他位置，则默认为 `false`
- 如果您的 `formAction` 是当前位置，则默认为 `true`
  - 否则默认为 `false`

我们发现在 `get` 中，通常希望用户能够点击“返回”以查看先前的搜索结果/筛选等。但是对于其他方法，默认情况下是 `true` ，以避免“您确定要重新提交表单吗？”提示。请注意，即使 `replace={false}` ，当单击后退按钮并且方法为post、put、patch或delete时，React Router*也不会*重新提交表单。

换句话说，这只对GET提交有用，您希望避免后退按钮显示先前的结果。

## `relative`

默认情况下，路径相对于路由层次结构，因此 `..` 将上升一个 `Route` 级别。偶尔，您可能会发现您有匹配的URL模式，这些模式不适合嵌套，并且您更喜欢使用相对*路径*路由。您可以使用 `<Form to="../some/where" relative="path">` 选择此行为。

## `reloadDocument`

指示表单跳过React Router并使用浏览器的内置行为提交表单。

```jsx
<Form reloadDocument />
```

这比 `<form>` 更推荐，因此您可以获得默认和相对 `action` 的好处，但除此之外与普通HTML表单相同。

如果没有像[Remix](https://remix.run/)这样的框架，或者您自己的服务器处理路由的帖子，那么这并没有什么用处。

**另请参阅：**

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)
- [`useActionData`](https://reactrouter.com/en/main/hooks/use-action-data)
- [`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)

## `preventScrollReset`

如果您正在使用[`<ScrollRestoration>`](https://reactrouter.com/en/main/components/scroll-restoration)，则可以防止表单操作重定向到新位置时滚动位置重置为窗口顶部。

```jsx
<Form method="post" preventScrollReset={true} />
```

**另请参阅：**

[`<Link preventScrollReset>`](https://reactrouter.com/en/main/components/link#preventscrollreset)

# 示例

## 大型列表过滤

GET提交的常见用例是过滤大型列表，例如电子商务和旅行预订网站。

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

当用户提交此表单时，表单将被序列化到URL中，类似于以下内容，具体取决于用户的选择：

```jsx
/slc/hotels?sort=price&stars=4&amenities=pool&amenities=exercise
```

您可以从 `request.url` 中访问这些值。

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

- [useSubmit](https://reactrouter.com/en/main/hooks/use-submit)