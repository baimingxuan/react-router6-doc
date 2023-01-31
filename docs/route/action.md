# `action`

路由操作是路由[加载程序](https://reactrouter.com/en/main/route/loader)“读取”的“写入”。它们为应用程序提供了一种使用简单的 HTML 和 HTTP 语义执行数据突变的方法，而 React Router 抽象出异步 UI 和重新验证的复杂性。这为您提供了具有现代 SPA 的行为和 UX 功能的 HTML + HTTP（浏览器处理异步和重新验证）的简单心智模型。

此功能仅在使用数据路由器时有效[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)

```javascript
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

每当应用程序向您的路线发送非获取提交（“post”、“put”、“patch”、“delete”）时，都会调用操作。这可以通过几种方式发生：

```javascript
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

路由参数从[动态段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给您的操作。这对于确定要改变的资源很有用：

```javascript
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId);
  }}
/>
```

## `request`

这是一个发送到您的路线的[获取请求实例。](https://developer.mozilla.org/en-US/docs/Web/API/Request)最常见的用例是从请求中解析[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

```javascript
<Route
  action={async ({ request }) => {
    let formData = await request.formData();
    // ...
  }}
/>
```

> 一个要求？！

起初，操作收到“请求”似乎很奇怪。你写过这行代码吗？

```javascript
<form
  onSubmit={(event) => {
    event.preventDefault();
    // ...
  }}
/>
```

你到底在阻止什么？

没有 JavaScript，只有纯 HTML 和 HTTP Web 服务器，被阻止的默认事件实际上非常棒。浏览器会将表单中的所有数据序列化[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)，并将其作为新请求的主体发送到您的服务器。像上面的代码一样，React Router[``](https://reactrouter.com/en/main/components/form)会阻止浏览器发送该请求，而是将请求发送到您的路由操作！这使得具有简单 HTML 和 HTTP 模型的高度动态的 Web 应用成为可能。

请记住，中的值`formData`是从表单提交中自动序列化的，因此您的输入需要一个`name`.

```javascript
<Form method="post">
  <input name="songTitle" />
  <textarea name="lyrics" />
  <button type="submit">Save</button>
</Form>;

// accessed by the same names
formData.get("songTitle");
formData.get("lyrics");
```

有关更多信息，`formData`请参阅[使用 FormData](https://reactrouter.com/en/main/guides/form-data)。

## 返回响应

虽然您可以从操作中返回任何您想要的内容并从中访问它[`useActionData`](https://reactrouter.com/en/main/hooks/use-action-data)，但您也可以返回一个 Web [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

有关详细信息，请参阅[加载程序文档](https://reactrouter.com/en/main/route/loader#returning-responses)。

## 投入行动

您可以`throw`在操作中中断当前调用堆栈（停止运行当前代码），React Router 将沿着“错误路径”重新开始。

```javascript
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

有关更多详细信息和扩展用例，请阅读[errorElement](https://reactrouter.com/en/main/route/error-element)文档。