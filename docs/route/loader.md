# `loader`

每个路由都可以定义一个“加载器”函数来在渲染之前向路由元素提供数据。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
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

当用户在应用程序中导航时，下一个匹配的路由分支的加载器将被并行调用，并且它们的数据通过[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data).

## `params`

路由参数从[动态段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给您的加载程序。这对于确定要加载的资源很有用：

```javascript
createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: ({ params }) => {
      return fakeGetTeam(params.teamId);
    },
  },
]);
```

请注意，`:teamId`路径中的 被解析为`params.teamId`同名提供的。

## `request`

这是对您的应用程序发出的[获取请求](https://developer.mozilla.org/en-US/docs/Web/API/Request)实例。

```javascript
function loader({ request }) {}
```

> 一个要求？！

加载程序收到“请求”一开始可能看起来很奇怪。考虑`<Link>`执行类似于以下代码的操作并问问自己，“这里阻止了什么默认行为？”。

```javascript
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>
```

如果没有 React Router，浏览器会向您的服务器发出*请求*，但 React Router 阻止了它！React Router 将请求发送给您的加载器，而不是浏览器将请求发送到您的服务器。

最常见的用例是创建一个[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)并从中读取[URLSearchParams ：](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

```javascript
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
```

请注意，这里的 API 不是特定于 React Router 的，而是标准的 Web 对象：[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)、[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。

## 返回响应

虽然您可以从加载程序返回任何您想要的内容并从 访问它[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)，但您也可以返回一个网络[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

这可能不会立即有用，但请考虑`fetch`. 由于 的返回值`fetch`是一个 Response，并且加载器理解响应，所以许多加载器可以返回一个简单的获取！

```javascript
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

```javascript
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

React Router 会自动调用`response.json()`，所以你的组件在渲染时不需要解析它：

```javascript
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }
}
```

使用该[`json`](https://reactrouter.com/en/main/fetch/json)实用程序可以简化这一过程，因此您不必自己构建它们。下一个示例实际上与上一个示例相同：

```javascript
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}
```

如果您计划升级到 Remix，从每个加载程序返回响应将使迁移更顺利。

## 投掷装载机

你可以`throw`在你的加载器中中断当前的调用堆栈（停止运行当前代码），React Router 将沿着“错误路径”重新开始。

```javascript
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
```

有关详细信息，请阅读[`errorElement`](https://reactrouter.com/en/main/route/error-element)文档。