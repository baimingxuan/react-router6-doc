# `useFetchers`

返回所有不带,或属性的[飞行](https://reactrouter.com/en/main/hooks/use-fetcher)中获取器的数组（不能让父组件试图控制其子组件的行为！我们从 IRL 经验中知道这是徒劳的。）`load``submit``Form`

此功能仅在使用数据路由器时有效，请参阅[选择路由器](https://reactrouter.com/en/main/routers/picking-a-router)

```javascript
import { useFetchers } from "react-router-dom";

function SomeComp() {
  const fetchers = useFetchers();
  // array of inflight fetchers
}
```

这对于整个应用程序中未创建提取器但希望使用其提交参与乐观 UI 的组件很有用。

例如，想象一个 UI，其中边栏列出项目，主视图显示当前项目的复选框列表。侧边栏可以显示每个项目的已完成任务数和总任务数。

```
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

当用户单击复选框时，提交将转到更改任务状态的操作。我们不想创建“加载状态”，而是想创建一个“乐观的 UI”，即使服务器尚未处理它，它也会**立即更新复选框以显示为已选中。**在复选框组件中，我们可以使用`fetcher.submission`：

```javascript
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

这对复选框来说很棒，但是当用户点击它们时，侧边栏会显示 2/4 而复选框显示 3/4！

```
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

由于路线会自动重新验证，因此侧边栏会快速更新并保持正确。但有那么一刻，它会觉得有点好笑。

这就是`useFetchers`进来的地方。在侧边栏上方，我们可以从复选框访问所有飞行中的提取器状态——即使它不是创建它们的组件。

该策略分为三个步骤：

1. 查找特定项目中任务的提交
2. 使用`fetcher.formData`立即更新计数
3. 如果它不是飞行中的，则使用正常任务的状态

```javascript
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

这是一些工作，但它主要只是向 React Router 询问它正在跟踪的状态并根据它进行乐观计算。