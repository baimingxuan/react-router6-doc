#  数据库整合

自 v6.4 发布以来，一些人想知道 React Router 是否试图取代像[React Query](https://tanstack.com/query/v4/)、[useSwr](https://swr.vercel.app/)等库。

答案是“不！”。

React Router 的数据 API 是关于*何时*加载、改变和重新验证数据的，而不是*如何*做的。它是关于数据生命周期的，而不是数据获取、变更、存储和缓存的实际实现。

考虑到`<a href>`和都是导航事件，并且都与数据耦合（要显示什么数据或要更改什么数据），客户端路由器将帮助您处理这两个元素的*导航状态*`<form action>`是有道理的。但实际的数据实现取决于您。

这里的示例改编自[TkDodo 的博客](https://tkdodo.eu/blog/react-query-meets-react-router)，感谢您的精彩帖子！

## 加载数据中

您不是在组件中加载数据，而是在加载器内部使用数据抽象。请注意，此加载发生在 React 渲染生命周期之外，因此您不能像 React Query 那样使用钩子`useQuery`，您需要直接使用查询客户端的方法。

```javascript
import { queryClient } from "./query-client";

export const loader = ({ params }) => {
  return queryClient.fetchQuery(queryKey, queryFn, {
    staleTime: 10000,
  });
};
```

如果查询客户端正确抛出错误，那么 React Router 的[`errorElement`](https://reactrouter.com/en/main/route/error-element)将同样工作。

当然，您可以使用数据库的所有功能，例如缓存。缓存您的数据可确保当用户单击后退按钮返回您已经看过的页面时，数据会立即从缓存中加载。有时缓存是正确的选择，有时你总是希望它是新鲜的，但这不是 React Router 数据 API 范围内的决定。

React Router 只保留*当前页面的 loaderData*。如果用户点击“后退”，所有加载器都会被再次调用。如果没有像 React Query 这样的数据缓存库（或 JSON API 上的 HTTP 缓存标头以使用浏览器自己的 HTTP 缓存），您的应用程序将再次重新获取所有数据。

这样，React Router 是关于*计时*的，而 React Query 是关于*缓存*的。

## 访问组件中的数据

虽然 React Router 会`useLoaderData`返回您从加载程序返回的任何内容，但您可以使用数据抽象的钩子来访问该包的完整功能集。

```javascript
export default function SomeRouteComponent() {
- const data = useLoaderData();
+ const { data } = useQuery(someQueryKey);
}
```

## 使突变中的数据无效

因为这些库中的大多数都有一些缓存机制，所以您需要在某些时候使这些缓存失效。

使这些缓存失效的最佳位置是在 React Router[操作](https://reactrouter.com/en/main/route/action)中。

```javascript
import { queryClient } from "./query-client";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  await queryClient.invalidateQueries(["contacts"]);
  return redirect(`/contacts/${params.contactId}`);
};
```

## 用法与`defer`

您可以类似地利用延迟 API：

```javascript
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

## 重叠

挂钩`useQuery`通常会返回挂起和错误状态，您可以使用它们来分支您的 UI。使用 React Router，您可以将所有这些分支保留在您的快乐路径组件之外，并改为依赖[`errorElement`](https://reactrouter.com/en/main/route/error-element)、和 。[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)[`Await`](https://reactrouter.com/en/main/components/await)

## 结论

通过所有这些 API 协同工作，您现在可以使用[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)React Router 来构建挂起状态、乐观 UI 等。使用 React Router 进行数据加载、突变和导航状态的计时，然后使用像 React Query 这样的库来实际实现加载、失效、存储和缓存。