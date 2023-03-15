# `loader`

每个路由都可以定义一个“加载器”函数，在渲染路由元素之前提供数据。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)
>

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

当用户在应用程序中导航时，将并行调用下一个匹配路由分支的加载器，并通过[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)将其数据提供给组件。

## `params`

路由参数从[动态段](https://reactrouter.com/en/main/route/route#dynamic-segments)中解析并传递给您的加载器。这对于确定要加载的资源非常有用：

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

请注意，路径中的 `:teamId` 被解析为由相同名称提供的 `params.teamId` 。

## `request`

这是一个[Fetch请求](https://developer.mozilla.org/en-US/docs/Web/API/Request)实例，正在向您的应用程序发出请求。

```javascript
function loader({ request }) {}
```

一开始，加载器接收“请求”可能看起来很奇怪。考虑 `<Link>` 执行以下代码并问自己，“这里防止了什么默认行为？”。

```jsx
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>
```

如果没有React Router，浏览器将向您的服务器发出请求，但React Router阻止了它！React Router将请求发送到您的加载器，而不是浏览器将请求发送到您的服务器。

最常见的用例是创建[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)并从中读取[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：

```jsx
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
```

请注意，这里的API不是React Router特定的，而是标准的Web对象：[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)、[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)、[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。

## 返回响应

虽然您可以从加载器返回任何您想要的内容并从[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)访问它，但您也可以返回Web[响应](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

这可能一开始看起来并不是很有用，但考虑 `fetch` 。由于 `fetch` 的返回值是一个 Response，而加载器可以理解响应，因此许多加载器可以返回一个简单的 fetch！

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

React Router 将自动调用 `response.json()` ，因此您的组件在渲染时不需要解析它：

```jsx
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }
}
```

使用[`json`](https://reactrouter.com/en/main/fetch/json)工具可以简化这个过程，这样您就不必自己构建它们。下一个示例与上一个示例实际上是相同的：

```jsx
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}
```

如果您计划升级到Remix，从每个加载器返回响应将使迁移更加顺畅。

## 抛入加载器

您可以在加载器中使用 `throw` 来跳出当前调用堆栈（停止运行当前代码），React Router 将重新开始沿着“错误路径”进行。

```jsx
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
```

要了解更多详情，请阅读[`errorElement`](https://reactrouter.com/en/main/route/error-element)文档。