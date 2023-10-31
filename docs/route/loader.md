# `loader`

每个路由都可以定义一个 "`loader`"函数，以便在路由元素渲染前为其提供数据。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅 ["选择路由"](https://reactrouter.com/en/main/routers/picking-a-router)。

```jsx
createBrowserRouter([
  {
    element: <Teams />,
    path: "teams",
    loader: async () => {
      return fakeDb.from("teams").select("*");
    },
    children: [
      {
        element: <Team />,
        path: ":teamId",
        loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`);
        },
      },
    ],
  },
]);
```

当用户在应用程序中导航时，下一个匹配路由分支的加载器将被并行调用，其数据将通过[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)提供给组件。

## `params`

路由参数会[动态片段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给`loader`。这对于确定要加载的资源非常有用：

```jsx
createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: ({ params }) => {
      return fakeGetTeam(params.teamId);
    },
  },
]);
```

请注意，路径中的 `:teamId` 会被解析为同名的 `params.teamId` 。

## `request`

这是向您的应用程序发出的[Fetch Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)实例。

```jsx
function loader({ request }) {}
```

一开始，`loader`接收 "请求"，这乍看起来可能有些奇怪。想想 `<Link>` 所做的类似下面的代码，然后问问自己："这里阻止了什么默认行为？

```jsx
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>
```

如果没有 React Router，浏览器本会向您的服务器发出请求，但 React Router 阻止了这一切！React 路由器不会让浏览器向服务器发送请求，而是将请求发送给`loader`。

最常见的用例是创建一个 [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) 并从中读取 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：

```jsx
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
```

请注意，这里的 API 并不是 React Router 专用的，而是标准的网络对象：[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)、[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。

## 返回响应

您可以从加载器返回任何想要的内容，并从[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)获取访问权限，也可以返回网络 Response。

这似乎不会立即派上用场，但请考虑一下 `fetch` 。由于 `fetch` 的返回值是一个 Response，而`loader`能理解 Response，因此许多加载器都能返回一个简单的 fetch！

```jsx
// an HTTP/REST API
function loader({ request }) {
  return fetch("/api/teams.json", {
    signal: request.signal,
  });
}

// or even a graphql endpoint
function loader({ request, params }) {
  return fetch("/_gql", {
    signal: request.signal,
    method: "post",
    body: JSON.stringify({
      query: gql`...`,
      params: params,
    }),
  });
}
```

您也可以自己构建响应：

```jsx
function loader({ request, params }) {
  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}
```

React Router 会自动调用 `response.json()` ，因此您的组件无需在呈现时对其进行解析：

```jsx
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }
}
```

使用[`json`](https://reactrouter.com/en/main/fetch/json)工具简化了这一过程，因此您不必亲自构建它们。下一个示例实际上与上一个示例相同：

```jsx
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}
```

如果您计划升级到 Remix，返回每个`loader`的回复会让迁移更顺利。

## 抛出`Loaders`

您可以通过 `throw` 在加载器中跳出当前调用栈（停止运行当前代码），然后 React Router 将沿着 "错误路径 "重新开始。

```jsx
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
```

有关详细信息，请阅读[`errorElement`](https://reactrouter.com/en/main/route/error-element)文档。