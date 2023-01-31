## `<Await>`

用于通过自动错误处理呈现[延迟值。](https://reactrouter.com/en/main/utils/defer)请务必查看[延迟数据指南](https://reactrouter.com/en/main/guides/deferred)，因为有一些 API 可与此组件一起使用。

```javascript
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

**注意：** 期望在 a或parent`<Await>`内部呈现以启用后备 UI。`<React.Suspense>``<React.SuspenseList>`

## 类型声明

```javascript
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

可以是 React 元素或函数。

使用函数时，该值作为唯一参数提供。

```javascript
<Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />}
</Await>
```

使用 React 元素时，[`useAsyncValue`](https://reactrouter.com/en/main/hooks/use-async-value)将提供数据：

```javascript
<Await resolve={reviewsPromise}>
  <Reviews />
</Await>;

function Reviews() {
  const resolvedReviews = useAsyncValue();
  return <div>{/* ... */}</div>;
}
```

## `errorElement`

当 promise 被拒绝时，error 元素代替子元素呈现。您可以使用访问错误[`useAsyncError`](https://reactrouter.com/en/main/hooks/use-async-error)。

如果 promise 被拒绝，您可以提供一个选项来通过挂钩`errorElement`在上下文 UI 中处理该错误。`useAsyncError`

```javascript
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

如果您不提供 errorElement，则被拒绝的值将冒泡到最近的路由级别[`errorElement`](https://reactrouter.com/en/main/route/error-element)，并可通过[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)挂钩访问。

## `resolve`

[接受从延迟](https://reactrouter.com/en/main/utils/defer) [加载程序](https://reactrouter.com/en/main/route/loader)值返回的承诺，以进行解析和呈现。

```javascript
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