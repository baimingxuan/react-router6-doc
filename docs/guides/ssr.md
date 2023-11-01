#  服务器端渲染

React Router 中最基本的服务器呈现非常简单。不过，除了获取正确的路由来进行呈现外，还有很多其他事项需要考虑。以下是您需要处理的事项的不完整列表：

- 为服务器和浏览器打包代码
- 不打包服务器端专用代码到浏览器端包中
- 可在服务器端和浏览器端运行的代码拆分功能
- 服务器端数据加载，让你真正有东西可呈现
- 适用于客户端和服务器的数据加载策略
- 处理服务器和客户端的代码分割
- 正确的 HTTP 状态代码和重定向
- 环境变量和机密信息
- 部署

设置好这一切可能会很麻烦，但只有在服务器渲染时才能获得的性能和用户体验特性是值得的。

如果您想对 React Router 应用程序进行服务器渲染，我们强烈推荐您使用[Remix](https://remix.run/)。这是我们的另一个项目，它构建于 React Router 之上，可以处理上述所有问题，甚至更多。试试看吧！

如果您想自己解决这个问题，您需要在服务器上使用 `<StaticRouterProvider>` 或 `<StaticRouter>` ，这取决于您选择的[路由](https://reactrouter.com/en/main/routers/picking-a-router)。如果使用 `<StaticRouter>` ，请跳转到 ["不使用数据路由 "](https://reactrouter.com/en/main/guides/ssr#without-a-data-router)部分。

## 使用数据路由

首先，您需要为数据路由定义路由，这些路由将在服务端和客户端中使用：

`router.jsx`

```jsx
const React = require("react");
const { json, useLoaderData } = require("react-router-dom");

const routes = [
  {
    path: "/",
    loader() {
      return json({ message: "Welcome to React Router!" });
    },
    Component() {
      let data = useLoaderData();
      return <h1>{data.message}</h1>;
    },
  },
];

module.exports = routes;
```

> NOTE
>
> 在这些示例中，我们使用了 CJS 模块，以简化服务器，但一般情况下，您会使用 ESM 模块或更高级别的打包程序，如 `esbuild` 、 `vite` 或 `webpack` 。

定义好路由后，我们就可以在 express 服务器中创建一个处理程序，然后使用 `createStaticHandler()` 为路由加载数据。请记住，数据路由器的主要目标是将数据获取与渲染解耦，因此，在使用数据路由器进行服务器渲染时，我们有不同的获取和渲染步骤。

`server.jsx`

```jsx
const express = require("express");
const {
  createStaticHandler,
} = require("react-router-dom/server");

const createFetchRequest = require("./request");
const routes = require("./routes");

const app = express();

let handler = createStaticHandler(routes);

app.get("*", async (req, res) => {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  // We'll tackle rendering next...
});

const listener = app.listen(3000, () => {
  let { port } = listener.address();
  console.log(`Listening on port ${port}`);
});
```

请注意，我们必须先将传入的 Express 请求转换为 Fetch 请求，这正是静态处理程序方法的操作对象。 `createFetchRequest` 方法是针对 Express 请求的，在本例中是从 `@remix-run/express` 适配程序中提取的：

`request.js`

```js
module.exports = function createFetchRequest(req) {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
};
```

通过执行所有匹配的路由`loader`加载数据后，我们使用 `createStaticRouter()` 和 `<StaticRouterProvider>` 渲染 HTML 并将响应发送回浏览器：

`server.jsx`

```jsx
app.get("*", async (req, res) => {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  let router = createStaticRouter(
    handler.dataRoutes,
    context
  );
  let html = ReactDOMServer.renderToString(
    <StaticRouterProvider
      router={router}
      context={context}
    />
  );

  res.send("<!DOCTYPE html>" + html);
});
```

将 HTML 发送回浏览器后，我们需要使用 `createBrowserRouter()` 和 `<RouterProvider>` 在客户端 "水合 "应用程序：

`entry-client.jsx`

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { routes } from "./routes";

let router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <RouterProvider router={router} />
);
```

这样，一个服务器端渲染和水合的应用程序就完成了！有关工作示例，您也可以参考 Github 代码库中的[示例](https://github.com/remix-run/react-router/tree/main/examples/ssr-data-router)。

### 其他概念

如上所述，服务器端渲染在大规模应用和生产级应用中非常棘手，如果你想实现这一目标，我们强烈推荐你使用 [Remix](https://remix.run/) 。但是，如果你要走手动路线，这里有一些额外的概念你可能需要考虑：

#### 重定向

如果有任何`loader`重定向， `handler.query` 将直接返回 `Response` ，因此应检查这一点并发送重定向响应，而不是尝试呈现 HTML 文档：

`server.jsx`

```jsx
app.get("*", async (req, res) => {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  if (
    context instanceof Response &&
    [301, 302, 303, 307, 308].includes(context.status)
  ) {
    return res.redirect(
      context.status,
      context.headers.get("Location")
    );
  }

  // Render HTML...
});
```

#### 懒加载路由

如果您在路由中使用了[`route.lazy`](https://reactrouter.com/en/main/route/lazy)，那么在客户端上，您可能已经拥有了水合所需的所有数据，但还没有路由定义！理想情况下，您的设置会在服务器上确定匹配的路由，并在关键路径上交付路由包，这样您就不会在最初匹配的路由上使用 `lazy` 。但如果情况并非如此，则需要在水合之前加载这些路由并更新到位，以避免路由器退回到加载状态：

`entry-client.jsx`

```jsx
// Determine if any of the initial routes are lazy
let lazyMatches = matchRoutes(
  routes,
  window.location
)?.filter((m) => m.route.lazy);

// Load the lazy matches and update the routes before creating your router
// so we can hydrate the SSR-rendered content synchronously
if (lazyMatches && lazyMatches?.length > 0) {
  await Promise.all(
    lazyMatches.map(async (m) => {
      let routeModule = await m.route.lazy();
      Object.assign(m.route, {
        ...routeModule,
        lazy: undefined,
      });
    })
  );
}

let router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <RouterProvider router={router} fallbackElement={null} />
);
```

另请参阅：

- [`createStaticHandler`](https://reactrouter.com/en/main/routers/create-static-handler)
- [`createStaticRouter`](https://reactrouter.com/en/main/routers/create-static-router)
- [`<StaticRouterProvider>`](https://reactrouter.com/en/main/routers/static-router-provider)

## 不使用数据路由

首先，你需要某种在服务器和浏览器上呈现的 "应用程序 "或 "根 "组件：

`App.jsx`

```jsx
export default function App() {
  return (
    <html>
      <head>
        <title>Server Rendered App</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
        <script src="/build/client.entry.js" />
      </body>
    </html>
  );
}
```

下面是一个简单的 Express 服务器，可在服务器上渲染应用程序。请注意 `StaticRouter` 的使用。

`server.entry.js`

```jsx
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

let app = express();

app.get("*", (req, res) => {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send("<!DOCTYPE html>" + html);
});

app.listen(3000);
```

最后，您还需要一个类似的文件，以便将应用程序与包含相同 `App` 组件的 JavaScript 捆绑程序 "水合"。注意使用 `BrowserRouter` 而不是 `StaticRouter` 。

`client.entry.js`

```jsx
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);
```

与客户端入口的唯一真正区别是:

- `StaticRouter`而不是`BrowserRouter`
- 将服务器上的 URL 传递给 `<StaticRouter url>`
- 使用 `ReactDOMServer.renderToString` 代替 `ReactDOM.render`。

有些部分需要自己动手才能完成：

- 如何打包代码以便在浏览器和服务器中运行
- 如何知道 `<App>` 组件中 `<script>` 的客户入口在哪里
- 了解数据加载（尤其是 `<title>` ）。

我们再次推荐您使用[Remix](https://remix.run/)。它是服务器渲染 React Router 应用程序的最佳方式，或许也是构建任何 React 应用程序的最佳方式。