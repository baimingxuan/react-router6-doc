# API开发战略

让我们直奔主题--主要版本升级可能会很麻烦。尤其是像框架或路由器这样的基础应用。对于 Remix 和 React Router，我们希望尽最大努力为您提供最顺畅的升级体验。

> NOTE
>
> 我们的 "[Future Flags](https://remix.run/blog/future-flags) "博文对这一策略进行了更详细的讨论，如果你想了解更多信息，请在本文档末尾阅读该博文！

## 目标

我们发布 Remix 和 React Router 的主要目标是

- 开发人员可以在SemVer-major功能*发布*时逐一选择采用这些功能，而不必等到NPM推出新的主要版本时才一次性全部采用。
- 在提前选择功能后，开发人员只需在一个短命分支/提交中（几小时，而不是几周）就能升级到新的主要版本

## 实施情况

我们计划通过我们称之为 "Future Flags" 的方式来实现这一目标，您将在初始化[数据路由](https://reactrouter.com/en/main/routers/picking-a-router)时提供这些标志。可以将其视为未来功能的功能标志。当我们实现新功能时，我们总是尝试以一种向后兼容的方式来实现它们。但是，当需要进行突破性更改时，我们不会将该功能放在 v7 版本的最终版本中。相反，我们会添加一个"Future Flags"，并在 v6 小版本中与当前行为一起实现新功能。这样，用户就可以立即开始使用该功能、提供反馈并报告错误。

这样一来，用户不仅可以逐步采用新功能（而且无需大幅提升版本），我们还能在 *v7 版本发布前*逐步解决所有问题。最后，我们还会在 v6 版本中添加弃用警告，提示用户使用新行为。如果在 v6 发布时，应用程序已经选择了所有`future flags`并更新了代码，那么他们只需将其依赖关系更新到 v7，删除`future flags`，然后在几分钟内就能在 v7 上运行。

## 不稳定与 V7 标志

`future flags`有两种形式：

**`future.unstable_feature`**

`unstable_` 标记允许我们与早期用户一起迭代 API，就像我们在`v0.x.x`版本中一样，但针对的是特定功能。这避免了为所有用户反复修改 API，从而在最终版本中获得更好的 API。这并不意味着我们认为该功能漏洞百出！我们绝对希望早期用户能够开始使用这些功能，这样我们才能对 API 进行迭代（和/或获得信心）。

**`future.v7_feature`**

`v7_` 表示对 v6 行为进行了突破性更改，并意味着：（1）API 被认为是稳定的，不会再有任何突破性更改；（2）API 将成为 v7 的默认行为。` v7_`标志并不意味着该功能没有错误--任何软件都是如此！我们建议您在有时间的情况下升级到 v7 标志，因为这将使您的 v7 升级更加顺利。

### 新功能流程示例

新功能的决策流程是这样的（注意，此图与 Remix v1/v2 有关，但也适用于 React Router v6/v7）：

![Flowchart of the decision process for how to introduce a new feature](https://remix.run/docs-images/feature-flowchart.png)

因此，生命周期要么是:

- 非破坏性 + 稳定的应用程序接口功能 -> 在 v6 中落地
- 非断裂 + 不稳定 API -> `future.unstable_` 标志 -> 在 v6 中落地
- 破坏 + 稳定 API 功能 -> `future.v7_` 标志 -> 在 v7 中落地
- 破坏 + 不稳定的应用程序接口 -> `future.unstable_` 标志 -> `future.v7_` 标志 -> 在 v7 中落地

## 当前的 Future Flags

以下是 React Router v6 目前的`future flags`。

### `@remix-run/router` Future Flags

这些标志仅在使用[数据路由](https://reactrouter.com/en/main/routers/picking-a-router)时适用，并在创建 `router` 实例时传递：

```jsx
const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
```

| Flag                     | 说明                                                   |
| ------------------------ | ------------------------------------------------------ |
| `v7_fetcherPersist`      | 延迟活动的fetcher清理，直到它们返回到 `idle` 状态      |
| `v7_normalizeFormMethod` | 将 `useNavigation().formMethod` 规范化为大写 HTTP 方法 |
| `v7_prependBasename`     | 将路由基名作为导航/获取路径的前缀                      |

### 路由 Future Flags React

这些标记同时适用于数据路由和非数据路由，并会传递给渲染的 React 组件：

```jsx
<BrowserRouter future={{ v7_startTransition: true }}>
  <Routes>{/*...*/}</Routes>
</BrowserRouter>
```

```jsx
<RouterProvider
  router={router}
  future={{ v7_startTransition: true }}
/>
```

| Flag                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| `v7_startTransition` | 将所有路由状态更新包裹着在[`React.startTransition`](https://react.dev/reference/react/startTransition)中 |