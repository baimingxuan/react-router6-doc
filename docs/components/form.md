# `<Form>`

Form 组件是一个纯 HTML[表单](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)的包装器，它模拟客户端路由和数据突变的浏览器。它*不是*您在 React 生态系统中可能习惯的表单验证/状态管理库（为此，我们建议在您的后端服务器上使用浏览器内置的[HTML 表单验证和数据验证）。](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
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

确保您的输入有名称，否则`FormData`将不包含该字段的值。

所有这些都会触发对任何呈现的[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)挂钩的状态更新，因此您可以在异步操作进行时构建挂起的指示器和乐观的 UI。

如果表单*不像*导航，您可能需要[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher).

## `action`

表单将提交到的 url，就像[HTML 表单操作](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action)一样。唯一的区别是默认操作。对于 HTML 表单，它默认为完整 URL。对于`<Form>`，它默认为上下文中最近路由的相对 URL。

考虑以下路线和组件：

```javascript
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
      element={<ProjectPage />}
      action={ProjectsPage.action}
    />
  </Route>
</DataBrowserRouter>;
```

如果当前 URL 是`"/projects/123"`，则子路由内的表单`ProjectsPage`将具有您可能期望的默认操作：`"/projects/123"`。在这种情况下，路由是最深的匹配路由，`<Form>`和纯 HTML 表单具有相同的结果。

但是里面的表单`ProjectsLayout`将指向`"/projects"`，而不是完整的 URL。换句话说，它指向呈现表单的路径的 URL 的匹配段。

如果您在路由模块周围添加一些约定，这有助于提高可移植性以及表单及其操作处理程序的协同定位。

如果您需要发布到不同的路线，请添加一个动作道具：

```javascript
<Form action="/projects/new" method="post" />
```

**也可以看看：**

- [Index Search Param](https://reactrouter.com/en/main/guides/index-search-param)（索引vs父路由消歧）

## `method`

这决定了要使用的[HTTP 动词。](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)与纯 HTML[表单方法](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method)相同，除了它还支持“get”和“post”之外的“put”、“patch”和“delete”。默认值为“获取”。

### 获取提交

默认方法是“获取”。获取提交*不会调用操作*。获取提交与普通导航（用户单击链接）相同，除了用户可以提供从表单转到 URL 的搜索参数。

```javascript
<Form method="get" action="/products">
  <input
    aria-label="search products"
    type="text"
    name="q"
  />
  <button type="submit">Search</button>
</Form>
```

假设用户输入“跑鞋”并提交表单。React Router 模拟浏览器并将表单序列化为[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，然后将用户导航到`"/products?q=running+shoes"`. 就好像您`<Link to="/products?q=running+shoes">`以开发人员的身份呈现了一个，而是让用户动态提供查询字符串。

[`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)您的路由加载器可以通过创建一个新的`request.url`然后加载数据来最方便地访问这些值。

```javascript
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

所有其他方法都是“突变提交”，这意味着您打算使用 POST、PUT、PATCH 或 DELETE 更改有关数据的某些内容。请注意，纯 HTML 表单仅支持“post”和“get”，我们也倾向于坚持使用这两个。

当用户提交表单时，React Router 会将 匹配`action`到应用程序的路由并调用`<Route action>`序列化的[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。操作完成后，页面上的所有加载程序数据将自动重新生效，以使您的 UI 与您的数据保持同步。

该方法将在[`request.method`](https://developer.mozilla.org/en-US/docs/Web/API/Request/method)被调用的路由操作内部可用。您可以使用它来指示有关提交意图的数据抽象。

```javascript
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

如您所见，两种形式都提交到相同的路线，但您可以使用`request.method`to 分支来处理您打算做的事情。操作完成后，`loader`将重新生效，UI 将自动与新数据同步。

## `replace`

指示表单替换历史堆栈中的当前条目，而不是推送新条目。

```javascript
<Form replace />
```

默认行为取决于表单行为：

- `method=get`表格默认为`false`

- 提交方法取决于

  ```javascript
  formAction
  ```

  和

  ```javascript
  action
  ```

  行为：

  - 如果你`action`抛出，那么它将默认为`false`
  - 如果您`action`重定向到当前位置，则默认为`true`
  - 如果您`action`重定向到其他地方，则默认为`false`
  - 如果您`formAction`是当前位置，则默认为`true`
  - 否则默认为`false`

我们发现`get`你经常希望用户能够点击“后退”以查看以前的搜索结果/过滤器等。但是对于其他方法，默认情况下是`true`避免“你确定要重新提交表单吗？ ？” 迅速的。请注意，即使`replace={false}`React Router在单击后退按钮且方法为 post、put、patch 或 delete 时*也不会重新提交表单。*

换句话说，这实际上只对 GET 提交有用，并且您希望避免后退按钮显示以前的结果。

## `relative`

默认情况下，路径是相对于路由层次结构的，因此`..`会上升`Route`一层。有时，您可能会发现匹配的 URL 模式没有嵌套的意义，并且您更喜欢使用相对*路径*路由。您可以选择加入此行为`<Form to="../some/where" relative="path">`

## `reloadDocument`

指示表单跳过 React Router 并使用浏览器的内置行为提交表单。

```javascript
<Form reloadDocument />
```

这是推荐的，`<form>`因此您可以获得 default 和 relative 的好处`action`，但在其他方面与纯 HTML 表单相同。

如果没有像[Remix](https://remix.run/)这样的框架，或者您自己的服务器处理路由的帖子，这不是很有用。

也可以看看：

- [`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)
- [`useActionData`](https://reactrouter.com/en/main/hooks/use-action-data)
- [`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)

## `preventScrollReset`

如果您正在使用[``](https://reactrouter.com/en/main/components/scroll-restoration)，这可以防止在表单操作重定向到新位置时将滚动位置重置为窗口顶部。

```javascript
<Form method="post" preventScrollReset={true} />
```

也可以看看：[``](https://reactrouter.com/en/main/components/link#preventscrollreset)

# 例子

TODO：更多示例

## 大列表过滤

GET 提交的一个常见用例是过滤大型列表，例如电子商务和旅游预订网站。

```javascript
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

当用户提交此表单时，表单将被序列化为 URL，具体取决于用户的选择：

```javascript
/slc/hotels?sort=price&stars=4&amenities=pool&amenities=exercise
```

您可以从访问这些值`request.url`

```javascript
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

**也可以看看：**

- [使用提交](https://reactrouter.com/en/main/hooks/use-submit)