# `shouldRevalidate`

此功能允许您选择退出路由加载器的重新验证，以进行优化。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)
>

有几种情况下，数据会被重新验证，使您的UI与数据自动同步：

- 在从[`Form`](https://reactrouter.com/en/main/components/form)调用[`action`](https://reactrouter.com/en/main/route/action)后
- 在从[`<fetcher.Form>`](https://reactrouter.com/en/main/hooks/use-fetcher)调用[`action`](https://reactrouter.com/en/main/route/action)后
- 在从[`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)调用[`action`](https://reactrouter.com/en/main/route/action)后
- 在从[`fetcher.submit`](https://reactrouter.com/en/main/hooks/use-fetcher)调用[`action`](https://reactrouter.com/en/main/route/action)后
- 当已渲染路由的[URL 参数](https://reactrouter.com/en/main/route/route#dynamic-segments)更改时
- 当 URL 搜索参数更改时
- 当导航到与当前 URL 相同的 URL 时

如果您在路由上定义了 `shouldRevalidate` ，它将在调用路由加载程序获取新数据之前首先检查该函数。如果该函数返回 `false` ，则不会调用加载程序，并且该加载程序的现有数据将保留在页面上。

```javascript
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

请注意，这仅适用于已加载的数据，当前正在呈现，并将继续在新的 URL 上呈现的数据。新路由和新 URL 的获取器的数据始终会最初获取。

> 使用此 API 会导致您的 UI 与数据不同步，请谨慎使用！
>

## 类型声明

```tsx
interface ShouldRevalidateFunction {
  (args: {
    currentUrl: URL;
    currentParams: AgnosticDataRouteMatch["params"];
    nextUrl: URL;
    nextParams: AgnosticDataRouteMatch["params"];
    formMethod?: Submission["formMethod"];
    formAction?: Submission["formAction"];
    formEncType?: Submission["formEncType"];
    formData?: Submission["formData"];
    actionResult?: DataResult;
    defaultShouldRevalidate: boolean;
  }): boolean;
}
```

