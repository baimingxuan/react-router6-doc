#  选择 Router

虽然您的应用程序只使用单个路由，但根据您的应用程序运行的环境，有几个路由可供选择。本文档应该可以帮助您确定要使用哪个路由。

## 使用 v6.4 数据 API

在v6.4中，引入了支持新数据API的新路由：

- [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)
- [`createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router)
- [`createHashRouter`](https://reactrouter.com/en/main/routers/create-hash-router)

以下路由器不支持数据API：

- [`<BrowserRouter>`](https://reactrouter.com/en/main/router-components/browser-router)
- [`<MemoryRouter>`](https://reactrouter.com/en/main/router-components/memory-router)
- [`<HashRouter>`](https://reactrouter.com/en/main/router-components/hash-router)
- [`<NativeRouter>`](https://reactrouter.com/en/main/router-components/native-router)
- [`<StaticRouter>`](https://reactrouter.com/en/main/router-components/static-router)

我们建议您将应用程序更新为使用6.4中的新路由之一。数据API目前不支持React Native，但最终应该会支持。

快速升级到v6.4的最简单方法是从[`createRoutesFromElements`](https://reactrouter.com/en/main/utils/create-routes-from-elements)获取帮助，这样您就不需要将 `<Route>` 元素转换为路由对象。

```jsx
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

我们建议所有的 Web 项目使用 [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)。

它使用完整的 URL，而不是在 `window.pushState` 标准化之前 Web 应用程序中常见的哈希 URL ( `#this/stuff` )。完整的 URL 对于 SEO 更好，对于服务器渲染更好，并且与 Web 平台的其余部分更兼容。

如果您将应用程序托管在静态文件服务器上，则需要配置它将所有请求发送到您的 `index.html` ，以避免出现 404 错误。

如果由于某种原因您无法使用完整的 URL，则[`createHashRouter`](https://reactrouter.com/en/main/routers/create-hash-router)是下一个最好的选择。

如果您不感兴趣数据 API，您可以继续使用 [`<BrowerRouter>`](https://reactrouter.com/en/main/router-components/browser-router)，或者如果您无法使用完整的 URL，则使用[`<HashRouter>`](https://reactrouter.com/en/main/router-components/hash-router).

## 测试

使用 React Router API 的组件的测试最好使用[`createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router)或[`<MemoryRouter>`](https://reactrouter.com/en/main/router-components/memory-router) ，而不是您在应用程序中使用需要 DOM 历史记录 API 的路由器。

React Router API 中的一些内部使用了 `fetch` ，它仅支持从 Node.js v18 开始。如果您的项目使用的是 v17 或更低版本，则应手动添加 `fetch` polyfill。一种方法是安装 [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch)并将其添加到您的 `jest.config.js` 文件中，如下所示：

```jsx
module.exports = {
  setupFiles: ["whatwg-fetch"],
  // ...rest of the config
};
```

## React Native

您将从 React Native 项目中使用[`<NativeRouter>`](https://reactrouter.com/en/main/router-components/native-router)。

v6.4的数据API目前不支持React Native，但最终应该会支持。