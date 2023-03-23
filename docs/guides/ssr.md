#  服务器端渲染

> 这个文档需要更新到6.4，并且仅适用于<=6.3

React Router中最基本的服务器渲染非常简单。但是，除了正确渲染路由之外，还有很多需要考虑的事情。以下是您需要处理的不完整列表：

- 为服务器和浏览器捆绑代码
- 不将仅适用于服务器的代码捆绑到浏览器捆绑包中
- 在服务器和浏览器上工作的代码拆分
- 服务器端数据加载，以便您实际上有东西可以渲染
- 在客户端和服务器上工作的数据加载策略
- 在服务器和客户端处理代码拆分
- 适当的HTTP状态代码和重定向
- 环境变量和机密信息
- 部署

设置所有这些可能相当复杂，但是当服务器渲染时，您只能获得性能和UX特征，因此非常值得。

如果您想要服务器渲染React Router应用程序，我们强烈建议您使用[Remix](https://remix.run/)。这是我们的另一个项目，建立在React Router之上，处理上述所有事项以及更多内容。试试吧！

如果您想自己解决问题，您需要在服务器上使用 `<StaticRouter>` 。

首先，您需要一些在服务器和浏览器上都可以渲染的“应用程序”或“根”组件：

`App.js`

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

这是一个简单的express服务器，它在服务器上呈现应用程序。请注意使用 `StaticRouter` 。

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

最后，您需要一个类似的文件来“注入”应用程序，其中包括完全相同的 `App` 组件的 JavaScript 捆绑包。请注意使用 `BrowserRouter` 而不是 `StaticRouter` 。

`client.entry.js`

```jsx
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);
```

与客户端入口的唯一真正区别是：

- `StaticRouter`而不是`BrowserRouter`
- 将 URL 从服务器传递给 `<StaticRouter url>`
- 使用 `ReactDOMServer.renderToString` 而不是 `ReactDOM.render` 。

为使此工作，您需要自己完成一些部分：

- 如何将代码捆绑在浏览器和服务器中以使其工作
- 如何知道 `<App>` 组件中 `<script>` 的客户端入口在哪里。
- 弄清楚数据加载（特别是对于 `<title>` ）。

再次建议您查看[Remix](https://remix.run/)。这是服务端渲染 React Router 应用程序的最佳方法，也许是构建任何 React 应用程序的最佳方法😉。