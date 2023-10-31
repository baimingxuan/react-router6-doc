# `errorElement`

当 [loader](https://reactrouter.com/en/main/route/loader)、[action](https://reactrouter.com/en/main/route/action) 或组件渲染中出现异常时，路由的正常渲染路径 ( `<Route element>` ) 将被渲染为错误路径 ( `<Route errorElement>` )，错误信息将通过 [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)显示。

> NOTE
>
> 如果您不想指定 React 元素（即 `errorElement={<MyErrorBoundary />}` ），您可以指定一个 `ErrorBoundary` 组件（即 `ErrorBoundary={MyErrorBoundary}` ），React 路由器将在内部为您调用 `createElement` 。

> IMPORTANT
>
> 此功能只有在使用数据路由时才有效，请参阅 ["选择路由"](https://reactrouter.com/en/main/routers/picking-a-router)。

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

当路由没有 `errorElement` 时，错误将通过父路由冒泡。这样，您就可以随心所欲地进行细化或概括。

将 `errorElement` 放在路由树的顶端，就能在一个地方处理应用程序中的几乎所有错误。或者，将它们放在所有路由上，让应用程序中没有错误的部分继续正常呈现。这就为用户提供了更多从错误中恢复的选择，而不是硬刷新和🤞。

### 默认错误元素

> IMPORTANT
>
> 我们建议在将应用程序交付到生产环境之前，至少提供一个根级 `errorElement` ，因为默认 `errorElement` 的用户界面非常丑陋，不适合最终用户使用。

如果不在路由树中提供 `errorElement` 来处理给定的错误，错误就会冒出来，由默认的 `errorElement` 来处理，并打印错误信息和堆栈跟踪。有些人质疑为什么堆栈跟踪会显示在生产构建中。通常情况下，出于安全考虑，您不希望在生产网站上显示堆栈跟踪。不过，这更适用于服务器端错误（Remix 确实会从服务器端加载器/操作响应中剥离堆栈跟踪）。在客户端 `react-router-dom` 应用程序中，代码已经可以在浏览器中找到，因此任何隐藏都只是通过隐蔽来保证安全。此外，我们仍然希望在控制台中显示错误，因此从用户界面显示中删除错误仍然不能隐藏堆栈跟踪的任何信息。不在用户界面中显示错误，也不在控制台中记录错误，这就意味着应用程序开发人员根本无法获得有关生产错误的任何信息，这本身就会带来一系列问题。因此，我们再次建议您在将网站部署到生产环境之前，始终添加根级 `errorElement` ！

## 手动抛出

`errorElement` 可处理意外错误，也可用于处理预期异常。

特别是在`loader`和`action`中，当您处理不受您控制的外部数据时，您不可能总是计划数据是否存在、服务是否可用或用户是否能访问它。在这种情况下，您可以 `throw` 自己的异常。

这是 [loader](https://reactrouter.com/en/main/route/loader) 中的一个 "未找到 "案例：

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

一旦知道无法用加载的数据渲染路由，就可以抛出中断调用栈。当加载器中的其他工作（如解析用户的 markdown bio）不存在时，你就不用担心了。只需抛出并离开即可。

这也意味着您不必担心路由组件中会出现大量错误分支代码，如果您在加载器或动作中加入错误分支代码，它甚至不会尝试渲染，而是由您的 `errorElement` 渲染。

您可以从`loader`或`action`中抛出任何东西，就像您可以返回任何东西一样：响应（如上一示例）、错误或普通对象。

## 抛出响应

通过 [`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)如果抛出的是响应 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)，React Router 会自动解析响应数据，然后将其返回给您的组件。

此外，[`isRouteErrorResponse`](https://reactrouter.com/en/main/utils/is-route-error-response) 还可让您在边界中检查这种特定类型。配合[`json`](https://reactrouter.com/en/main/fetch/json)，您可以轻松地抛出带有某些数据的响应，并在边界中呈现不同的情况：

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

这样就可以创建一个通用的错误边界，通常在根路由上，可以处理很多情况：

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

当知道无法继续数据加载时，就会抛出这种模式，这使得正确处理特殊情况变得非常简单。

想象一下，获取用户授权请求的网络令牌的函数是这样的:

```jsx
async function getUserToken() {
  const token = await getTokenFromWebWorker();
  if (!token) {
    throw new Response("", { status: 401 });
  }
  return token;
}
```

无论哪个加载器或操作使用了该函数，它都会停止执行当前调用栈中的代码，并将应用程序发送到错误路径。

现在，让我们添加一个获取项目的函数：

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

由于有了 `getUserToken` ，这段代码可以假定获得了一个标记。如果没有，就会显示错误路径。然后，如果项目不存在，无论哪个加载器调用此函数，都会向 `errorElement` 发送 404。最后，如果获取完全失败，它将发送一个错误信息。

当你意识到 "我没有我需要的东西 "时，你可以直接 `throw` ，因为你知道你仍然在为最终用户提供有用的东西。

让我们把它组合成一条路由：

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

项目路径根本不用考虑错误。加载器实用程序（如 `fetchProject` 和 `getUserToken` ）会在出现问题时抛出，而 `RootBoundary` 会处理所有情况，因此项目路径只需专注于成功之路。