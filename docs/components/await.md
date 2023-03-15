## `<Await>`

用于呈现具有自动错误处理的[延迟值](https://reactrouter.com/en/main/utils/defer)。请确保查看[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)，因为有一些 API 与此组件一起使用。

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

```tsx
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

使用函数时，值作为唯一参数提供。

```jsx
<Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />}
</Await>
```

使用React元素时，[`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value)将提供数据：

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

当Promise被拒绝时，错误元素将呈现而不是子元素。您可以使用[`useAsyncError`](https://reactrouter.com/en/main/hooks/use-async-error)访问错误。

如果Promise被拒绝，您可以通过 `useAsyncError` 钩子提供可选的 `errorElement` 来处理上下文UI中的错误。

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

如果您不提供 errorElement，被拒绝的值将会冒泡到最近的路由级别[`errorElement`](https://reactrouter.com/en/main/route/error-element)，并可通过[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)挂钩访问。

## `resolve`

接受从[延迟](https://reactrouter.com/en/main/utils/defer) [加载器](https://reactrouter.com/en/main/route/loader)值返回的 promise，以便解决和渲染。

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