# `shouldRevalidate`

类型声明

```ts
interface ShouldRevalidateFunction {
  (args: ShouldRevalidateFunctionArgs): boolean;
}

interface ShouldRevalidateFunctionArgs {
  currentUrl: URL;
  currentParams: AgnosticDataRouteMatch["params"];
  nextUrl: URL;
  nextParams: AgnosticDataRouteMatch["params"];
  formMethod?: Submission["formMethod"];
  formAction?: Submission["formAction"];
  formEncType?: Submission["formEncType"];
  text?: Submission["text"];
  formData?: Submission["formData"];
  json?: Submission["json"];
  actionResult?: any;
  defaultShouldRevalidate: boolean;
}
```

通过此功能，您可以选择不对路由的[`loader`](../route/loader)进行重新验证，以优化其性能。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](../routers/picking-a-router)。

有几种情况下，数据会被重新验证，从而使用户界面与数据自动保持同步：

- 从[`Form`](../components/form)调用[`action`](../route/action)后
- 从[`<fetcher.Form>`](../hooks/use-fetcher)调用[`action`](../route/action)后
- 从[`useSubmit`](../hooks/use-submit)调用[`action`](../route/action)后
- 从[`fetcher.submit`](../hooks/use-fetcher)调用[`action`](../route/action)后
- 当通过 `useRevalidator`触发显式重新验证时
- 当已渲染路由的[URL 参数](../route/route#dynamic-segments)更改时
- 当 URL 搜索参数更改时
- 当导航到与当前 URL 相同的 URL 时

如果在路由上定义了 `shouldRevalidate` ，那么在调用路由`loader`获取新数据前，会首先检查该函数。如果函数返回 `false` ，则*不会*调用`loader`，页面上将保留该`loader`的现有数据。

> NOTE
>
> Fetcher 加载也会重新验证，但由于它们加载的是特定 URL，因此不必担心上述 URL 驱动的重新验证情况。Fetcher 载入默认只在提交操作和明确的重新验证请求后重新验证。

```jsx
<Route
  path="meals-plans"
  element={<MealPlans />}
  loader={loadMealPlans}
  shouldRevalidate={({ currentUrl }) => {
    // only revalidate if the submission originates from
    // the `/meal-plans/new` route.
    return currentUrl.pathname === "/meal-plans/new";
  }}
>
  <Route
    path="new"
    element={<NewMealPlanForm />}
    // `loadMealPlans` will be revalidated after
    // this action...
    action={createMealPlan}
  />
  <Route
    path=":planId/meal"
    element={<Meal />}
    // ...but not this one because origin the URL
    // is not "/meal-plans/new"
    action={updateMeal}
  />
</Route>
```

请注意，这仅适用于已加载、当前已呈现并将继续在新 URL 上呈现的数据。新 URL 上的新路由和获取器的数据将始终在初始时获取。

> IMPORTANT
>
> 使用此 API 有可能导致用户界面与数据不同步，请谨慎使用！

## 

