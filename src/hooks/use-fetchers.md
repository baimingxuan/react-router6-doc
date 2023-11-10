# `useFetchers`

返回所有不带 `load` 、 `submit` 或 `Form` 属性正在进行的 [fetchers](../hooks/use-fetcher) 数组，但不包括它们的 `load` ， `submit` 或 `Form` 属性（不能让父组件试图控制其子组件的行为！根据实际经验，我们知道这是很愚蠢的做法）。

> IMPORTANT
>
> 此功能只有在使用数据路由器时才有效，请参阅["选择路由"](../routers/picking-a-router)

```jsx
import { useFetchers } from "react-router-dom";

function SomeComp() {
  const fetchers = useFetchers();
  // array of inflight fetchers
}
```

这对于整个应用程序中那些没有创建`fetchers`，但希望使用其提交的内容来参与优化用户界面的组件来说非常有用。

例如，想象一个用户界面，侧边栏列出项目，主视图显示当前项目的复选框列表。侧边栏可以显示每个项目的已完成任务数和总任务数。

```sh
+-----------------+----------------------------+
|                 |                            |
|   Soccer  (8/9) | [x] Do the dishes          |
|                 |                            |
| > Home    (2/4) | [x] Fold laundry           |
|                 |                            |
|                 | [ ] Replace battery in the |
|                 |     smoke alarm            |
|                 |                            |
|                 | [ ] Change lights in kids  |
|                 |     bathroom               |
|                 |                            |
+-----------------+----------------------------┘
```

当用户单击复选框时，提交的操作会改变任务的状态。我们不想创建 "加载状态"，而是想创建一个 "优化用户界面"，即使服务器尚未处理，也会立即更新复选框，使其显示为选中状态。在复选框组件中，我们可以使用 `fetcher.formData` ：

```jsx
function Task({ task }) {
  const { projectId, id } = task;
  const toggle = useFetcher();
  const checked = toggle.formData
    ? toggle.formData.get("complete") === "on"
    : task.complete;

  return (
    <toggle.Form
      method="put"
      action={`/projects/${projectId}/tasks/${id}`}
    >
      <input name="id" type="hidden" defaultValue={id} />
      <label>
        <input
          name="complete"
          type="checkbox"
          checked={checked}
          onChange={(e) => toggle.submit(e.target.form)}
        />
      </label>
    </toggle.Form>
  );
}
```

这对复选框来说很好，但当用户点击复选框时，侧边栏会显示 2/4，而复选框则显示 3/4！

```sh
+-----------------+----------------------------+
|                 |                            |
|   Soccer  (8/9) | [x] Do the dishes          |
|                 |                            |
| > Home    (2/4) | [x] Fold laundry           |
|     WRONG! ^    |                            |
|          CLICK!-->[x] Replace battery in the |
|                 |     smoke alarm            |
|                 |                            |
|                 | [ ] Change lights in kids  |
|                 |     bathroom               |
|                 |                            |
+-----------------+----------------------------┘
```

因为路由会自动重新验证，所以侧边栏会很快更新并正确显示。但一时间会感觉有点滑稽。

这就是 `useFetchers` 的作用所在。在侧边栏上，我们可以通过复选框访问所有的机上取件状态--尽管创建这些状态的组件并不是它。

该策略有三个步骤：

1. 查找特定项目中提交的任务
2. 使用 `fetcher.formData` 立即更新计数
3. 如果不是在运行中，则使用正常任务的状态

```jsx
function ProjectTaskCount({ project }) {
  let completedTasks = 0;
  const fetchers = useFetchers();

  // Find this project's fetchers
  const relevantFetchers = fetchers.filter((fetcher) => {
    return fetcher.formAction?.startsWith(
      `/projects/${project.id}/tasks/`
    );
  });

  // Store in a map for easy lookup
  const myFetchers = new Map(
    relevantFetchers.map(({ formData }) => [
      formData.get("id"),
      formData.get("complete") === "on",
    ])
  );

  // Increment the count
  for (const task of project.tasks) {
    if (myFetchers.has(task.id)) {
      if (myFetchers.get(task.id)) {
        // if it's being submitted, increment optimistically
        completedTasks++;
      }
    } else if (task.complete) {
      // otherwise use the real task's data
      completedTasks++;
    }
  }

  return (
    <small>
      {completedTasks}/{project.tasks.length}
    </small>
  );
}
```

这需要做一点工作，但主要是向 React Router 询问它正在跟踪的状态，并在此基础上进行优化计算。