## 客户端路由

React Router 启用“客户端路由”。

在传统网站中，浏览器从 Web 服务器请求文档，下载和评估 CSS 和 JavaScript 资产，并呈现从服务器发送的 HTML。当用户单击链接时，它会为新页面重新开始该过程。

客户端路由允许您的应用通过链接点击更新 URL，而无需从服务器再次请求另一个文档。相反，您的应用程序可以立即呈现一些新的 UI 并发出数据请求以`fetch`使用新信息更新页面。

这可以实现更快的用户体验，因为浏览器不需要请求全新的文档或为下一页重新评估 CSS 和 JavaScript 资产。它还通过动画等方式实现更动态的用户体验。

`Router`通过创建一个并链接/提交到带有`Link`和的页面来启用客户端路由`<Form>`：

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

```

