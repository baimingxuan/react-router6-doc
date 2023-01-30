#  选择 Router

虽然您的应用程序将只使用一个路由器，但根据您的应用程序运行的环境，可以使用多个路由器。本文档将帮助您确定使用哪个路由器。

## 使用 v6.4 数据 API

在 v6.4 中，引入了支持新数据 API 的新路由器：

- [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)
- [`createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router)
- [`createHashRouter`](https://reactrouter.com/en/main/routers/create-hash-router)

以下路由器不支持数据 API：

- [`<BrowserRouter>`](https://reactrouter.com/en/main/router-components/browser-router)
- [`<MemoryRouter>`](https://reactrouter.com/en/main/router-components/memory-router)
- [`<HashRouter>`](https://reactrouter.com/en/main/router-components/hash-router)
- [`<NativeRouter>`](https://reactrouter.com/en/main/router-components/native-router)
- [`<StaticRouter>`](https://reactrouter.com/en/main/router-components/static-router)

我们建议更新您的应用程序以使用 6.4 中的新路由器之一。React Native 目前不支持数据 API，但最终应该支持。

快速更新到 v6.4 的最简单方法是获取帮助，[`createRoutesFromElements`](https://reactrouter.com/en/main/utils/create-routes-from-elements)这样您就无需将`<Route>`元素转换为路由对象。

```javascript
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Web 项目

我们建议所有 Web 项目都使用[`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router).

它使用完整的 URL，而不是标准化`#this/stuff`之前网络应用程序中常见的哈希 URLs ( ) 。`window.pushState`完整的 URL 更适合 SEO，更适合服务器呈现，并且与网络平台的其余部分更兼容。

如果您在静态文件服务器上托管您的应用程序，则需要将其配置为将所有请求发送给您`index.html`，以避免收到 404。

如果由于某种原因您不能使用完整的 URL，[`createHashRouter`](https://reactrouter.com/en/main/routers/create-hash-router)这是下一个最好的选择。

如果您对数据 API 不感兴趣，可以继续使用[`<BrowerRouter>`](https://reactrouter.com/en/main/router-components/browser-router)，或者，如果您不能使用完整的 URL，则可以使用[`<HashRouter>`](https://reactrouter.com/en/main/router-components/hash-router).

## 测试

测试使用 React Router API 的组件最简单，使用[`createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router)或[``](https://reactrouter.com/en/main/router-components/memory-router)代替您在需要 DOM 历史 API 的应用程序中使用的路由器。

一些 React Router API 内部使用`fetch`，仅从 Node.js v18 开始支持。如果您的项目使用 v17 或更低版本，您应该`fetch`手动添加一个 polyfill。一种方法是像这样安装[`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch)并将其添加到您的`jest.config.js`文件中：

```javascript
module.exports = {
  setupFiles: ["whatwg-fetch"],
  // ...rest of the config
};
```

## React Native

您[`<NativeRouter>`](https://reactrouter.com/en/main/router-components/native-router)将从 React Native 项目中使用。

React Native 目前不支持 v6.4 的数据 API，但最终应该会支持。