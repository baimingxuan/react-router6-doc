# `errorElement`

当[加载器](https://reactrouter.com/en/main/route/loader)、[操作](https://reactrouter.com/en/main/route/action)或组件渲染中抛出异常时，您的路由的正常渲染路径（ `<Route element>` ）将被替换为错误路径（ `<Route errorElement>` ），并且错误将通过 [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)提供。

> 如果您不想指定一个 React 元素（即， `errorElement={<MyErrorBoundary />}` ），您可以指定一个 `ErrorBoundary` 组件（即， `ErrorBoundary={MyErrorBoundary}` ），React Router 将在内部为您调用 `createElement` 。

> 此功能仅在使用数据路由器（如[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)）时才有效。
>

```jsx
<Route
  path="/invoices/:id"
  // if an exception is thrown here
  loader={loadInvoice}
  // here
  action={updateInvoice}
  // or here
  element={<Invoice />}
  // this will render instead of `element`
  errorElement={<ErrorBoundary />}
/>;

function Invoice() {
  return <div>Happy {path}</div>;
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
```

## 冒泡

当路由没有 `errorElement` 时，错误将通过父路由冒泡。这使您可以像您喜欢的那样细化或通用化。

在您的路由树顶部放置一个 `errorElement` 并在一个地方处理几乎所有应用程序中的错误。或者，在所有路由上放置它们，并允许没有错误的应用程序部分继续正常呈现。这为用户提供了更多从错误中恢复的选项，而不是强制刷新和 🤞。

### 默认错误元素

> 我们建议在将应用程序发布到生产之前始终提供至少一个根级 `errorElement` ，因为默认 `errorElement` 的 UI 很丑，不适合最终用户使用。
>

如果您在路由树中没有提供一个 `errorElement` 来处理给定的错误，错误将会冒泡并由默认的 `errorElement` 处理，该处理程序将打印错误消息和堆栈跟踪。有些人质疑为什么堆栈跟踪会出现在生产构建中。通常，出于安全原因，您不希望在生产站点上公开堆栈跟踪。然而，这更适用于服务器端错误（Remix确实从服务器端加载器/操作响应中剥离堆栈跟踪）。在客户端 `react-router-dom` 应用程序的情况下，代码已经在浏览器中可用，因此任何隐藏都只是通过模糊不清来实现安全。此外，我们仍然希望在控制台中显示错误，因此从UI显示中删除它仍然不会隐藏有关堆栈跟踪的任何信息。不在UI中显示它并且不将其记录到控制台中意味着应用程序开发人员完全没有有关生产错误的任何信息，这会带来自己的一系列问题。因此，我们建议您在部署网站到生产环境之前始终添加根级 `errorElement` ！

## 手动抛出

虽然 `errorElement` 处理意外错误，但它也可以用于处理您预期的异常。

特别是在加载器和操作中，您使用不受控制的外部数据，您不能总是计划数据存在，服务可用或用户可以访问它。在这些情况下，您可以 `throw` 自己的异常。

这是一个[加载器](https://reactrouter.com/en/main/route/loader)中的“未找到”情况：

```jsx
<Route
  path="/properties/:id"
  element={<PropertyForSale />}
  errorElement={<PropertyError />}
  loader={async ({ params }) => {
    const res = await fetch(`/api/properties/${params.id}`);
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const home = await res.json();
    const descriptionHtml = parseMarkdown(
      data.descriptionMarkdown
    );
    return { home, descriptionHtml };
  }}
/>
```

一旦您知道无法使用加载的数据渲染路由，您可以抛出以中断调用堆栈。当不存在时，您不必担心加载程序中的其余工作（例如解析用户的Markdown简介）。只需抛出并离开即可。

这也意味着您不必担心路由组件中的大量错误分支代码，如果您在加载程序或操作中抛出，则它甚至不会尝试呈现，而是呈现您的 `errorElement` 。

您可以像返回任何内容一样从加载程序或操作中抛出任何内容：响应（如前面的示例），错误或普通对象。

## 抛出响应

虽然您可以抛出任何内容，并通过 [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)，将其提供回来，但如果您抛出[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)，则React Router将在将其返回给组件之前自动解析响应数据。

此外，[`isRouteErrorResponse`](https://reactrouter.com/en/main/utils/is-route-error-response)让您在边界中检查此特定类型。结合[`json`](https://reactrouter.com/en/main/fetch/json)，您可以轻松地抛出带有一些数据的响应并在边界中呈现不同的情况：

```jsx
import { json } from "react-router-dom";

function loader() {
  const stillWorksHere = await userStillWorksHere();
  if (!stillWorksHere) {
    throw json(
      {
        sorry: "You have been fired.",
        hrEmail: "hr@bigco.com",
      },
      { status: 401 }
    );
  }
}

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
```

这使得可以创建一个通用的错误边界，通常位于根路由上，以处理许多情况：

```jsx
function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
```

## 抽象

当您知道无法继续沿着正在进行的数据加载路径时，抛出此模式使得处理异常情况变得非常简单。

想象一下，获取用户Web令牌以进行授权请求的函数看起来像这样：

```jsx
async function getUserToken() {
  const token = await getTokenFromWebWorker();
  if (!token) {
    throw new Response("", { status: 401 });
  }
  return token;
}
```

无论哪个加载器或操作使用该函数，它都将停止执行当前调用堆栈中的代码，并将应用程序发送到错误路径。

现在让我们添加一个获取项目的函数：

```jsx
function fetchProject(id) {
  const token = await getUserToken();
  const response = await fetch(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  // the fetch failed
  if (!response.ok) {
    throw new Error("Could not fetch project");
  }
}
```

由于 `getUserToken` 的存在，此代码可以假定它获得了一个令牌。如果没有令牌，将呈现错误路径。然后，如果项目不存在，无论哪个加载器调用此函数，它都会将404抛到 `errorElement` 。最后，如果获取失败，它将发送一个错误。

任何时候你意识到“我没有我需要的东西”，你可以简单地 `throw` ，知道你仍然为最终用户呈现有用的东西。

让我们将其组合成一个路由：

```jsx
<Route
  path="/"
  element={<Root />}
  errorElement={<RootBoundary />}
>
  <Route
    path="projects/:projectId"
    loader={({ params }) => fetchProject(params.projectId)}
    element={<Project />}
  />
</Route>
```

项目路由根本不必考虑错误。在 `fetchProject` 和 `getUserToken` 等加载器实用程序函数在任何不正确的情况下抛出异常，以及 `RootBoundary` 处理所有情况的情况下，项目路由可以专注于快乐路径。