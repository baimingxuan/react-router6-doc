# `<Await>`

用于呈现具有自动错误处理的功能[延迟值](https://baimingxuan.github.io/react-router6-doc/utils/defer)。请务必查看[延迟数据指南](https://baimingxuan.github.io/react-router6-doc/guides/deferred)，因为有一些 API 与此组件配合使用。

```jsx
import { Await, useLoaderData } from "react-router-dom";

function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          resolve={reviews}
          errorElement={
            <div>Could not load reviews 😬</div>
          }
          children={(resolvedReviews) => (
            <Reviews items={resolvedReviews} />
          )}
        />
      </React.Suspense>
    </div>
  );
}
```

**注意：** `<Await>` 期望在 `<React.Suspense>` 或 `<React.SuspenseList>` 父级中呈现，以启用回退用户界面。

## 类型声明

```ts
declare function Await(
  props: AwaitProps
): React.ReactElement;

interface AwaitProps {
  children: React.ReactNode | AwaitResolveRenderFunction;
  errorElement?: React.ReactNode;
  resolve: TrackedPromise | any;
}

interface AwaitResolveRenderFunction {
  (data: Awaited<any>): React.ReactElement;
}
```

## `children`

可以是React元素或函数。

使用函数时，值是唯一的参数。

```jsx
<Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />}
</Await>
```

使用React元素时，[`useAsyncValue`](https://baimingxuan.github.io/react-router6-doc/hooks/use-async-value)将提供数据：

```jsx
<Await resolve={reviewsPromise}>
  <Reviews />
</Await>;

function Reviews() {
  const resolvedReviews = useAsyncValue();
  return <div>{/* ... */}</div>;
}
```

## `errorElement`

当Promise被拒绝时，错误元素会渲染，而不是子元素。您可以通过[`useAsyncError`](https://baimingxuan.github.io/react-router6-doc/hooks/use-async-error)访问错误。

如果Promise被拒绝，您可以提供一个可选的 `errorElement` ，通过 `useAsyncError` 钩子在上下文用户界面中处理该错误。

```jsx
<Await
  resolve={reviewsPromise}
  errorElement={<ReviewsError />}
>
  <Reviews />
</Await>;

function ReviewsError() {
  const error = useAsyncError();
  return <div>{error.message}</div>;
}
```

如果不提供 errorElement，被拒绝的值将上升到最近的路由级[`errorElement`](https://baimingxuan.github.io/react-router6-doc/route/error-element)，并可通过[`useRouteError`](https://baimingxuan.github.io/react-router6-doc/hooks/use-route-error)钩子访问。

## `resolve`

获取从[延迟](https://baimingxuan.github.io/react-router6-doc/utils/defer) [加载器](https://baimingxuan.github.io/react-router6-doc/route/loader)返回的 `promise`值，并进行解析和渲染。

```jsx
import {
  defer,
  Route,
  useLoaderData,
  Await,
} from "react-router-dom";

// given this route
<Route
  loader={async () => {
    let book = await getBook();
    let reviews = getReviews(); // not awaited
    return defer({
      book,
      reviews, // this is a promise
    });
  }}
  element={<Book />}
/>;

function Book() {
  const {
    book,
    reviews, // this is the same promise
  } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          // and is the promise we pass to Await
          resolve={reviews}
        >
          <Reviews />
        </Await>
      </React.Suspense>
    </div>
  );
}
```