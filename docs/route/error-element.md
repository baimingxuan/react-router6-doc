# `errorElement`

[当加载程序](https://reactrouter.com/en/main/route/loader)、[操作](https://reactrouter.com/en/main/route/action)或组件渲染中抛出异常时，而不是路由的正常渲染路径 ( `<Route element>`)，错误路径将被渲染 ( `<Route errorElement>`) 并且错误可用[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error).

此功能仅在使用数据路由器时有效[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)

```javascript
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

当路由没有 时`errorElement`，错误将通过父路由冒泡。这使您可以随心所欲地获得细粒度或一般性的信息。

将 放在`errorElement`你的路由树的顶部，并在一个地方处理你应用程序中的几乎所有错误。或者，将它们放在您的所有路线上，并允许应用程序中没有错误的部分继续正常呈现。这为用户提供了更多选项来从错误中恢复，而不是硬刷新和🤞。

### 默认错误元素

我们建议在将您的应用程序交付生产之前*始终*至少提供一个根级别，因为默认的 UI很难看并且不适合最终用户使用。`errorElement``errorElement`

如果你没有`errorElement`在你的路由树中提供 an 来处理给定的错误，错误将冒泡并由默认处理，`errorElement`这将打印错误消息和堆栈跟踪。有些人质疑为什么堆栈跟踪会出现在生产构建中。通常，出于安全原因，您不想在生产站点上公开堆栈跟踪。然而，这更适用于服务器端错误（并且 Remix 确实从服务器端加载器/操作响应中剥离堆栈跟踪）。在客户端的情况下`react-router-dom`无论如何，应用程序代码已经在浏览器中可用，因此任何隐藏都只是通过默默无闻的安全性。此外，我们仍然希望在控制台中公开错误，因此从 UI 显示中删除它仍然不会隐藏任何有关堆栈跟踪的信息。不在 UI 中显示它*并且*不将其记录到控制台将意味着应用程序开发人员根本没有*关于*生产错误的信息，这会带来一系列问题。`errorElement`因此，我们再次建议您在将站点部署到生产环境之前始终添加根级别！

## 手动投掷

在`errorElement`处理意外错误的同时，它还可以用于处理您期望的异常。

特别是在加载程序和操作中，您使用不受您控制的外部数据，您不能总是根据现有数据、可用服务或有权访问它的用户进行计划。在这些情况下，您可以`throw`自己设置例外。

[这是加载程序](https://reactrouter.com/en/main/route/loader)中的“未找到”案例：

```javascript
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

一旦您知道无法使用正在加载的数据渲染路由，就可以抛出以中断调用堆栈。当它不存在时，您不必担心加载程序中的其余工作（例如解析用户的降价生物）。扔掉然后离开那里。

这也意味着您不必担心路由组件中的一堆错误分支代码，如果您放入加载程序或操作，它甚至不会尝试渲染，而是您`errorElement`将渲染。

您可以从加载程序或操作中抛出任何内容，就像您可以返回任何内容一样：响应（如前面的示例）、错误或普通对象。

## 投掷反应

虽然你可以抛出任何东西并且它会通过 返回给你[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)，但如果你抛出一个[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)，React Router 会在将它返回给你的组件之前自动解析响应数据。

此外，[`isRouteErrorResponse`](https://reactrouter.com/en/main/utils/is-route-error-response)还可以让您在边界内检查此特定类型。结合[`json`](https://reactrouter.com/en/main/fetch/json)，您可以轻松地用一些数据抛出响应并在您的边界中呈现不同的情况：

```javascript
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

这使得创建一般错误边界成为可能，通常在您的根路由上，它可以处理许多情况：

```javascript
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

当您知道您无法继续沿着您所在的数据加载路径继续进行时，这种抛出模式使得正确处理异常情况变得非常简单。

想象一个函数，它获取用户的 Web 令牌以进行授权请求，看起来像这样：

```javascript
async function getUserToken() {
  const token = await getTokenFromWebWorker();
  if (!token) {
    throw new Response("", { status: 401 });
  }
  return token;
}
```

无论哪个加载器或操作使用该函数，它都会停止执行当前调用堆栈中的代码，并将应用程序发送到错误路径。

现在让我们添加一个获取项目的函数：

```javascript
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

多亏了`getUserToken`，这段代码可以假设它获得了一个令牌。如果没有，将呈现错误路径。然后如果项目不存在，无论哪个加载器调用这个函数，它都会抛出一个 404 给`errorElement`. 最后，如果提取完全失败，它将发送一个错误。

任何时候你意识到“我没有我需要的东西”，你可以简单地`throw`知道你仍然在为最终用户呈现有用的东西。

让我们把它放在一条路线中：

```javascript
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

项目路线完全不用考虑错误。在加载程序实用程序函数（如出现问题时抛出）和`fetchProject`处理所有情况之间，项目路线将严格关注快乐路径。`getUserToken``RootBoundary`