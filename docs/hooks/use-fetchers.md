# `useFetchers`

返回所有正在进行的 [fetchers](https://reactrouter.com/en/main/hooks/use-fetcher) 数组，但不包括它们的 `load` ， `submit` 或 `Form` 属性（不能让父组件试图控制其子组件的行为！从现实生活经验中我们知道这是徒劳的。

> 仅当使用数据路由器时，此功能才有效，请参见[选择路由](https://reactrouter.com/en/main/routers/picking-a-router)
>

```jsx
import { useFetchers } from "react-router-dom";

function SomeComp() {
  const fetchers = useFetchers();
  // array of inflight fetchers
}
```

这对于整个应用程序中的组件非常有用，这些组件没有创建获取器，但希望使用它们的提交来参与乐观的UI。

例如，想象一个UI，侧边栏列出项目，主视图显示当前项目的复选框列表。侧边栏可以显示每个项目的已完成和总任务数。

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

当用户单击复选框时，提交将发送到更改任务状态的操作。我们不想创建“加载状态”，而是要创建“乐观的UI”，即使服务器尚未处理它，它也会**立即**更新复选框以显示已选中。在复选框组件中，我们可以使用 `fetcher.formData` ：

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

这对于复选框非常棒，但是当用户点击其中一个时，侧边栏将显示2/4，而复选框将显示3/4！

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

因为路由会自动重新验证，所以侧边栏将快速更新并正确。但是在某一时刻，它会感觉有点奇怪。

这就是 `useFetchers` 的作用。在侧边栏中，我们可以访问复选框中所有正在进行的获取器状态，即使它不是创建它们的组件。

该策略有三个步骤：

1. 找到特定项目中任务的提交
2. 使用 `fetcher.formData` 立即更新计数
3. 如果不是inflight，则使用正常任务状态

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

这需要一些工作，但主要是向React Router询问它正在跟踪的状态，并根据它进行乐观的计算。