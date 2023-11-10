#  选择 Router

虽然您的应用程序只使用单个路由，但根据您的应用程序运行的环境，有几个路由可供选择。本文档应该可以帮助您确定要使用哪个路由。

## 使用 v6.4 数据 API

在 v6.4 中，引入了支持新[数据 APIs](../router/picking-a-router#data-apis) 的新路由：

- [`createBrowserRouter`](../router/create-browser-router)
- [`createMemoryRouter`](../router/create-memory-router)
- [`createHashRouter`](../router/create-hash-router)
- [`createStaticRouter`](../router/create-static-router)

以下路由不支持数据 API：

- [`<BrowserRouter>`](../router-components/browser-router)
- [`<MemoryRouter>`](../router-components/memory-router)
- [`<HashRouter>`](../router-components/hash-router)
- [`<NativeRouter>`](../router-components/native-router)
- [`<StaticRouter>`](../router-components/static-router)

我们建议您更新应用程序，使用 6.4 中的一种新路由。React Native 目前不支持数据 API，但最终应该会支持。

要快速升级到 v6.4，最简单的方法是从 [`createRoutesFromElements`](../utils/create-routes-from-elements) 获取帮助，这样就无需将 `<Route>` 元素转换为路由对象。

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

我们建议所有的 Web 项目使用 [`createBrowserRouter`](../router/create-browser-router)。

在 `history.pushState` 标准化之前，它使用的是完整 URL，而不是 Web 应用中常见的 Hash URL（ `#this/stuff` ）。完整 URL 更利于搜索引擎优化，更利于服务器渲染，而且与其他网络平台的兼容性更好。

如果将应用程序托管在静态文件服务器上，则需要将其配置为将所有请求发送到 `index.html` ，以避免出现 404 错误。

如果由于某种原因无法使用完整的 URL，[`createHashRouter`](../router/create-hash-router)是下一个最佳选择。

如果对数据应用程序接口不感兴趣，可以继续使用[`<BrowerRouter>`](../router-components/browser-router)，如果不能使用完整的 URL，则可以使用[`<HashRouter>`](../router-components/hash-router).

## 测试

使用 [`createMemoryRouter`](../router/create-memory-router) 或[`<MemoryRouter>`](../router-components/memory-router)测试使用 React 路由器 API 的组件是最简单的，而不是在应用程序中使用需要 DOM 历史 API 的路由器。

某些 React Router API 在内部使用 `fetch` ，它仅从 Node.js v18 开始受支持。如果您的项目使用 v17 或更低版本，则应手动添加 `fetch` polyfill。一种方法是安装 [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch)并将其添加到 `jest.config.js` 文件中，如下所示：

```js
module.exports = {
  setupFiles: ["whatwg-fetch"],
  // ...rest of the config
};
```

## React Native

您将从 React Native 项目中使用[`<NativeRouter>`](../router-components/native-router)。

React Native 目前不支持 v6.4 中的数据 API，但最终应该会支持。

## 数据 APIs

以下 API 在 React Router 6.4 中引入，只有在使用数据路由时才能使用：

- [`route.action`](../route/action)
- [`route.errorElement`](../route/error-element)
- [`route.lazy`](../route/lazy)
- [`route.loader`](../route/loader)
- [`route.shouldRevalidate`](../route/should-revalidate)
- [`route.handle`](../route/route#handle)
- [`<Await>`](../components/await)
- [`<Form>`](../components/form)
- [`<ScrollRestoration>`](../components/scroll-restoration)
- [`useActionData`](../hooks/use-action-data)
- [`useAsyncError`](../hooks/use-async-error)
- [`useAsyncValue`](../hooks/use-async-value)
- [`useFetcher`](../hooks/use-fetcher)
- [`useFetchers`](../hooks/use-fetchers)
- [`useLoaderData`](../hooks/use-loader-data)
- [`useMatches`](../hooks/use-matches)
- [`useNavigation`](../hooks/use-navigation)
- [`useRevalidator`](../hooks/use-revalidator)
- [`useRouteError`](../hooks/use-route-error)
- [`useRouteLoaderData`](../hooks/use-route-loader-data)
- [`useSubmit`](../hooks/use-submit)
- `startViewTransition`支持 [Link](../components/link#unstable_viewtransition) 和 [useNavigate](../hooks/use-navigate#optionsunstable_viewtransition)