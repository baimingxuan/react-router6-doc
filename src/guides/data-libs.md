#  数据仓库集成

自 v6.4 发布以来，有些人怀疑 React Router 是否试图取代[React Query](https://tanstack.com/query/v4/)、[useSwr](https://swr.vercel.app/)等库。

答案是“不！”。

React Router 的数据 API 是关于何时加载、变异和重新验证数据，而不是如何加载、变异和重新验证数据。它涉及的是数据生命周期，而不是数据获取、变异、存储和缓存的实际实现。

考虑到 `<a href>` 和 `<form action>` 都是导航事件，而且都与数据相关（显示哪些数据或更改哪些数据），因此客户端路由器可以帮助您处理这两个元素的导航状态。但实际的数据实现则取决于您。

此处的示例改编自[TkDodo 的博客](https://tkdodo.eu/blog/react-query-meets-react-router)，感谢您的精彩文章！

## 加载数据

您可以在加载器中使用数据抽象，而不是在组件中加载数据。请注意，这种加载发生在 React 渲染生命周期之外，因此不能使用 React Query 的 `useQuery` 等钩子，而需要直接使用查询客户端的方法。

```jsx
import { queryClient } from "./query-client";

export const loader = ({ params }) => {
  return queryClient.fetchQuery(queryKey, queryFn, {
    staleTime: 10000,
  });
};
```

如果查询客户端能正确抛出错误，那么 React Router 的[`errorElement`](https://baimingxuan.github.io/react-router6-doc/route/error-element)也能正常工作。

当然，您可以使用数据仓库的所有功能，例如缓存。缓存数据可以确保当用户点击返回按钮进入已经看过的页面时，数据会立即从缓存中加载。有时缓存是正确的选择，有时你总是希望数据是新鲜的，但这并不在 React Router 数据 API 的决定范围之内。

React Router 只保留*当前页面的 `loaderData`*。如果用户点击“返回”，所有加载器都会再次被调用。如果没有 React Query 这样的数据缓存库（或在 JSON API 上添加 HTTP 缓存头以使用浏览器自己的 HTTP 缓存），您的应用将再次重新获取所有数据。

因此，React Router 与*时间*有关，而 React Query 与*缓存*有关。

## 访问组件中的数据

虽然 React Router 的 `useLoaderData` 会返回您从`loader`返回的内容，但您可以使用数据抽象的钩子来访问该包的全部功能集。

```jsx
export default function SomeRouteComponent() {
- const data = useLoaderData();
+ const { data } = useQuery(someQueryKey);
}
```

## 使突变中的数据无效

由于这些库中的大多数都有某种缓存机制，因此您需要在某些时候使这些缓存失效。

React Router[操作](https://baimingxuan.github.io/react-router6-doc/route/action)就是使缓存失效的最佳场所。

```jsx
import { queryClient } from "./query-client";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  await queryClient.invalidateQueries(["contacts"]);
  return redirect(`/contacts/${params.contactId}`);
};
```

## 使用`defer`

同样，您也可以利用延迟 API：

```jsx
function loader() {
  return defer({
    // no await!
    someData: queryClient.fetchQuery("someKey", fn),
  });
}

function Comp() {
  // *do* useLoaderData for promise
  const { someData } = useLoaderData();
  return (
    <div>
      <h1>Something</h1>
      <Await
        resolve={someData}
        errorElement={<div>Oops!</div>}
      >
        <SomeView />
      </Await>
    </div>
  );
}

function SomeView() {
  // instead of accessing with useAsyncValue
  // const someData = useAsyncValue();
  // `useQuery` as usual
  const { data } = useQuery("someKey");
  // ...
}
```

## 重合部分

像 `useQuery` 这样的钩子经常返回 pending 和 error 状态，您可以使用它们来拆分您的 UI。使用 React Router，您可以将所有这些分支逻辑放在[`errorElement`](https://baimingxuan.github.io/react-router6-doc/route/error-element)、[`useNavigation`](https://baimingxuan.github.io/react-router6-doc/hooks/use-navigation)和[`Await`](https://baimingxuan.github.io/react-router6-doc/components/await)中，避免在正常路径组件中处理分支逻辑。

## 结论

有了所有这些 API 的协同工作，您现在就可以使用来自 React Router 的[`useNavigation`](https://baimingxuan.github.io/react-router6-doc/hooks/use-navigation)来构建待处理状态、优化的用户界面等。使用 React Router 为数据加载、突变和导航状态计时，然后使用 React Query 等库实际实现加载、失效、存储和缓存。