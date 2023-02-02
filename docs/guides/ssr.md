#  服务器端渲染

> 此文档需要 6.4 的更新并且仅适用于 <=6.3

React Router 中最基本的服务器渲染非常简单。然而，除了获得正确的渲染路线之外，还有很多需要考虑的事情。以下是您需要处理的事项的不完整列表：

- 捆绑服务器和浏览器的代码
- 不将仅限服务器的代码捆绑到浏览器包中
- 适用于服务器和浏览器的代码拆分
- 服务器端数据加载，所以你实际上有东西要渲染
- 适用于客户端和服务器的数据加载策略
- 处理服务器和客户端中的代码拆分
- 正确的 HTTP 状态代码和重定向
- 环境变量和秘密
- 部署

将所有这些设置好可能会非常复杂，但值得获得只有在服务器渲染时才能获得的性能和用户体验特性。

如果你想服务器渲染你的 React Router 应用程序，我们强烈建议你使用[Remix](https://remix.run/)。这是我们的另一个项目，它构建在 React Router 之上并处理上面提到的所有事情以及更多。试一试！

如果您想自己解决它，则需要`<StaticRouter>`在服务器上使用。

首先，您需要某种在服务器和浏览器中呈现的“应用程序”或“根”组件：

`App.js`

```javascript
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

这是一个在服务器上呈现应用程序的简单快速服务器。注意使用`StaticRouter`。

`server.entry.js`

```javascript
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

最后，您需要一个类似的文件来使用包含相同`App`组件的 JavaScript 包来“滋润”应用程序。注意使用`BrowserRouter`而不是`StaticRouter`。

`client.entry.js`

```javascript
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

与客户端条目的唯一真正区别是：

- `StaticRouter`代替`BrowserRouter`
- 将 URL 从服务器传递到`<StaticRouter url>`
- 使用`ReactDOMServer.renderToString`而不是`ReactDOM.render`。

有些部分你需要自己做才能工作：

- 如何捆绑代码以在浏览器和服务器中工作
- 如何知道客户端条目`<script>`在`<App>`组件中的位置。
- 弄清楚数据加载（尤其是对于`<title>`）。

同样，我们建议您看看[Remix](https://remix.run/)。这是服务器渲染 React Router 应用程序的最佳方式——也许是构建任何 React 应用程序的最佳方式😉。