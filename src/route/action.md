# `action`

路由 `action` 是对路由 [loader](https://baimingxuan.github.io/react-router6-doc/route/loader) “读取”的“写入”。它们为应用程序提供了一种使用简单的 HTML 和 HTTP 语义执行数据突变的方法，而 React Router 则抽象掉了异步 UI 和重新验证的复杂性。这为您提供了 HTML + HTTP（浏览器处理异步和重新验证）的简单心理模型，以及现代 SPA 的行为和用户体验功能。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅 "[选择路由](https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router)"。

```jsx
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData();
    return fakeUpdateSong(params.songId, formData);
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId);
  }}
/>
```

每当应用程序向路由发送非获取提交（"post"、"put"、"patch"、"delete"）时，都会调用 `action`。这种情况有几种：

```jsx
// forms
<Form method="post" action="/songs" />;
<fetcher.Form method="put" action="/songs/123/edit" />;

// imperative submissions
let submit = useSubmit();
submit(data, {
  method: "delete",
  action: "/songs/123",
});
fetcher.submit(data, {
  method: "patch",
  action: "/songs/123/edit",
});
```

## `params`

路由参数会从 [动态片段 ](https://baimingxuan.github.io/react-router6-doc/route/route#dynamic-segments)中解析并传递给您的 `action`。这对于确定要更改的资源非常有用：

```jsx
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId);
  }}
/>
```

## `request`

这是发送到路由的[Fetch Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)实例。最常见的用例是从请求中解析 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

```jsx
<Route
  action={async ({ request }) => {
    let formData = await request.formData();
    // ...
  }}
/>
```

行动接收一个 "请求"，初看起来可能很奇怪。你写过这行代码吗？

```jsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    // ...
  }}
/>
```

您到底在防止什么？

如果没有 JavaScript，只有普通 HTML 和 HTTP 网络服务器，那么所阻止的默认事件实际上是非常好的。浏览器会将表单中的所有数据序列化为[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)，然后作为新请求的正文发送到服务器。与上面的代码一样，React Router[`Form`](https://baimingxuan.github.io/react-router6-doc/components/form)会阻止浏览器发送该请求，而是将请求发送到您的路由操作！这样，只需使用简单的 HTML 和 HTTP 模型，就能实现高度动态的网络应用程序。

请记住， `formData` 中的值是通过表单提交自动序列化的，因此您的输入需要 `name` 。

```jsx
<Form method="post">
  <input name="songTitle" />
  <textarea name="lyrics" />
  <button type="submit">Save</button>
</Form>;

// accessed by the same names
formData.get("songTitle");
formData.get("lyrics");
```

有关 `formData` 的更多信息，请参阅 [“使用FormData”](https://baimingxuan.github.io/react-router6-doc/guides/form-data)。

### 选择性序列化类型

请注意，使用 [`useSubmit`](https://baimingxuan.github.io/react-router6-doc/hooks/use-submit) 时，也可以通过 `encType: "application/json"` 或 `encType: "text/plain"` 将有效载荷序列化到 `request.json()` 或 `request.text()` 中。

## 返回响应

您可以从操作中返回任何想要的内容，并从[`useActionData`](https://baimingxuan.github.io/react-router6-doc/hooks/use-action-data)获取访问权限，也可以返回网络 [响应](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

更多信息，请参阅 [加载器文档](https://baimingxuan.github.io/react-router6-doc/route/loader#returning-responses)。

## 在`Action`中抛出

您可以通过 `throw` 在您的操作中跳出当前调用栈（停止运行当前代码），然后 React Router 将沿着 "错误路径 "重新开始。

```jsx
<Route
  action={async ({ params, request }) => {
    const res = await fetch(
      `/api/properties/${params.id}`,
      {
        method: "put",
        body: await request.formData(),
      }
    );
    if (!res.ok) throw res;
    return { ok: true };
  }}
/>
```

有关详细信息和扩展用例，请阅读 [errorElement](https://baimingxuan.github.io/react-router6-doc/route/error-element) 文档。

## 处理每个路由的多个操作

一个相当常见的问题是：*"如果我需要在操作中处理多个不同的行为怎么办？*有几种方法可以做到这一点，但通常最简单的方法是在 `<button type="submit">` 上设置 `name` / `value` ，并在操作中使用该属性来决定执行哪段代码（没错，提交 [按钮](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) 可以有名称/值属性！）：

```jsx
async function action({ request }) {
  let formData = await request.formData();
  let intent = formData.get("intent");

  if (intent === "edit") {
    await editSong(formData);
    return { ok: true };
  }

  if (intent === "add") {
    await addSong(formData);
    return { ok: true };
  }

  throw json(
    { message: "Invalid intent" },
    { status: 400 }
  );
}

function Component() {
  let song = useLoaderData();

  // When the song exists, show an edit form
  if (song) {
    return (
      <Form method="post">
        <p>Edit song lyrics:</p>
        {/* Edit song inputs */}
        <button type="submit" name="intent" value="edit">
          Edit
        </button>
      </Form>
    );
  }

  // Otherwise show a form to add a new song
  return (
    <Form method="post">
      <p>Add new lyrics:</p>
      {/* Add song inputs */}
      <button type="submit" name="intent" value="add">
        Add
      </button>
    </Form>
  );
}
```

如果按钮 `name` / `value` 不适合您的用例，您也可以使用隐藏输入法发送和 `intent` ，或者通过 `<Form method>` 提交不同的 HTTP 方法（ `POST` 用于添加， `PUT` / `PATCH` 用于编辑， `DELETE` 用于删除）。