#  数据库集成

自从发布了v6.4版本以来，有些人想知道React Router是否试图取代像[React Query](https://tanstack.com/query/v4/)、[useSwr](https://swr.vercel.app/)等库。

答案是“不是！”。

React Router的数据API是关于何时加载、改变和重新验证数据，而不是如何实现数据获取、改变、存储和缓存。它关注的是数据生命周期，而不是实际的数据获取、改变、存储和缓存的实现。

考虑到 `<a href>` 和 `<form action>` 都是导航事件，都与数据耦合（显示哪些数据或更改哪些数据），使用客户端路由器来帮助您处理两个元素的导航状态是有意义的。但实际的数据实现取决于您。

这里的示例是从[TkDodo 的博客](https://tkdodo.eu/blog/react-query-meets-react-router)中改编而来的，感谢他的优秀文章！

## 加载数据

您可以在加载器中使用数据抽象，而不是在组件中加载数据。请注意，此加载发生在React渲染生命周期之外，因此您不能使用像React Query的 `useQuery` 这样的钩子，您需要直接使用查询客户端的方法。

```jsx
import { queryClient } from "./query-client";

export const loader = ({ params }) => {
  return queryClient.fetchQuery(queryKey, queryFn, {
    staleTime: 10000,
  });
};
```

如果查询客户端正确地抛出错误，则React Router的[`errorElement`](https://reactrouter.com/en/main/route/error-element)将起作用。

当然，您可以使用数据库的所有功能，例如缓存。缓存数据可以确保当用户点击返回按钮返回到您已经看过的页面时，数据会立即从缓存中加载。有时缓存是正确的选择，有时您总是希望它是新鲜的，但这不是React Router数据API范围内的决策。

React Router仅保留*当前页面的loaderData*。如果用户点击“返回”，则会再次调用所有加载器。如果没有像React Query这样的数据缓存库（或者在您的JSON API上使用HTTP缓存头来使用浏览器自己的HTTP缓存），则您的应用程序将再次获取所有数据。

这样，React Router就是关于时间，而React Query则是关于*缓存*的。

## 在组件中访问数据

虽然React Router的 `useLoaderData` 返回您从加载器返回的任何内容，但您可以使用您的数据抽象的钩子来获取对该包的完整功能集的访问权限。

```jsx
export default function SomeRouteComponent() {
- const data = useLoaderData();
+ const { data } = useQuery(someQueryKey);
}
```

## 在突变中的使数据无效

因为这些库中的大多数都有一些缓存机制，所以您需要在某个时候使这些缓存无效。

使这些缓存无效的完美位置是在 React Router[操作](https://reactrouter.com/en/main/route/action)中。

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

## 与`defer`一起使用

你同样可以利用延迟的 API：

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

像 `useQuery` 这样的钩子经常返回 pending 和 error 状态，您可以使用它们来拆分您的 UI。使用 React Router，您可以将所有这些分支逻辑放在[`errorElement`](https://reactrouter.com/en/main/route/error-element)、[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)和[`Await`](https://reactrouter.com/en/main/components/await)中，避免在正常路径组件中处理分支逻辑。

## 结论

有了所有这些 API 共同工作，您现在可以使用 React Router 中的[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)来构建挂起状态、乐观 UI 等。使用 React Router 来控制数据加载、突变和导航状态的时间，然后使用像 React Query 这样的库来实际实现加载、失效、存储和缓存。