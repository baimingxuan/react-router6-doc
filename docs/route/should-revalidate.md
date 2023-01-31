# `shouldRevalidate`

此功能允许您选择退出路由加载器的重新验证作为优化。

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

有几种情况会重新验证数据，使您的 UI 与数据自动保持同步：

- [`action`](https://reactrouter.com/en/main/route/action)从 a 调用an 之后[``](https://reactrouter.com/en/main/components/form)。
- [`action`](https://reactrouter.com/en/main/route/action)从 a 调用an 之后[``](https://reactrouter.com/en/main/hooks/use-fetcher)
- [`action`](https://reactrouter.com/en/main/route/action)从调用an 之后[`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)
- [`action`](https://reactrouter.com/en/main/route/action)从 a 调用an 之后[`fetcher.submit`](https://reactrouter.com/en/main/hooks/use-fetcher)
- 当[URL 参数](https://reactrouter.com/en/main/route/route#dynamic-segments)针对已呈现的路由发生更改时
- 当 URL 搜索参数改变时
- 导航到与当前 URL 相同的 URL 时

如果你`shouldRevalidate`在路由上定义，它会在调用路由加载器获取新数据之前先检查函数。如果该函数返回`false`，则*不会*调用加载程序，并且该加载程序的现有数据将保留在页面上。

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

请注意，这仅适用于已经加载、当前呈现并将继续在新 URL 呈现的数据。新 URL 的新路由和获取器的数据将始终在最初获取。

使用此 API 可能会使您的 UI 与您的数据不同步，请谨慎使用！

## 类型声明

```javascript
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

