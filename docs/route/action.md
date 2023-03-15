# `action`

路由操作是对路由[加载器](https://reactrouter.com/en/main/route/loader)“读取”的“写入”。它们为应用程序提供了一种使用简单的HTML和HTTP语义执行数据变异的方法，而React Router则抽象了异步UI和重新验证的复杂性。这为您提供了HTML + HTTP的简单心理模型（其中浏览器处理异步性和重新验证），同时具有现代SPAs的行为和UX功能。

> 此功能仅在使用数据路由器（如[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)）时才有效。
>

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

当应用程序向您的路由发送非获取提交（“post”，“put”，“patch”，“delete”）时，将调用操作。这可以通过以下几种方式实现：

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

路由参数从[动态段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给您的操作。这对于确定要突变的资源非常有用：

```jsx
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId);
  }}
/>
```

## `request`

这是一个[Fetch请求](https://developer.mozilla.org/en-US/docs/Web/API/Request)实例，正在发送到您的路由。最常见的用例是从请求中解析[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

```jsx
<Route
  action={async ({ request }) => {
    let formData = await request.formData();
    // ...
  }}
/>
```

起初，操作接收“请求”可能看起来很奇怪。您是否曾经编写过这行代码？

```jsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    // ...
  }}
/>
```

您到底在防止什么？

没有JavaScript，只有纯HTML和HTTP Web服务器，那个默认事件实际上非常好。浏览器将表单中的所有数据序列化为[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)并将其作为新请求的正文发送到您的服务器。与上面的代码一样，React Router[`Form`](https://reactrouter.com/en/main/components/form)防止浏览器发送该请求，而是将请求发送到您的路由操作！这使高度动态的Web应用程序具有HTML和HTTP的简单模型。

请记住， `formData` 中的值会自动从表单提交中序列化，因此您的输入需要 `name` 。

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

有关 `formData` 的更多信息，请参见[使用FormData](https://reactrouter.com/en/main/guides/form-data)。

## 返回响应

虽然您可以从操作中返回任何您想要的内容并从 [`useActionData`](https://reactrouter.com/en/main/hooks/use-action-data)，中访问它，但您还可以返回Web[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

有关更多信息，请参见[加载器文档](https://reactrouter.com/en/main/route/loader#returning-responses)。

## 在操作中抛出

您可以在您的操作中使用 `throw` 来跳出当前调用栈（停止运行当前代码），React Router 将会重新开始“错误路径”。

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

更多细节和扩展用例，请阅读[errorElement](https://reactrouter.com/en/main/route/error-element)文档。