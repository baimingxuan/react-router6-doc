##  Setup

在本教程中，我们将使用[Vite](https://vitejs.dev/guide/)作为我们的打包器和开发服务器。你需要为`npm`命令行工具安装`Node.js`。

👉️**打开您的终端并使用 Vite 创建一个新的 React 应用程序：**

```sh
npm create vite@latest name-of-your-project -- --template react
# follow prompts
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

你应该能够访问打印在终端的URL:

```
 VITE v3.0.7  ready in 175 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

我们为本教程准备了一些预先编写的 CSS，因此我们可以专注于 React Router。请随意评价它或编写自己的 😀（我们做了我们通常不会在 CSS 中做的事情，以便本教程中的标记可以保持尽可能少。）

👉**复制/粘贴教程 CSS  [在这里找到](https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css)  进入`src/index.css`**

本教程将创建、读取、搜索、更新和删除数据。一个典型的web应用程序可能会与web服务器上的 API 对话，但我们将使用浏览器存储并伪造一些网络延迟来模拟这一点。这些代码都与 React Router 无关，所以只需复制/粘贴所有代码即可。

👉**复制/粘贴教程数据模块  [在这里找到](https://gist.githubusercontent.com/ryanflorence/1e7f5d3344c0db4a8394292c157cd305/raw/f7ff21e9ae7ffd55bfaaaf320e09c6a08a8a6611/contacts.js)  进入`src/contacts.js`**

你需要 src 文件夹中的`contacts.js`、`main.jsx`和`index.css`。可以删除其他内容（如`App.js`和`assets`等）。

👉**删除未使用的文件，`src/`目录中只剩下这些：**

```
src
├── contacts.js
├── index.css
└── main.jsx
```

如果您的应用程序正在运行，它可能会暂时崩溃，继续前进 😋。这样，我们就可以准备开始了！

##  添加 Router

首先要做的是创建一个[浏览器路由](https://reactrouter.com/en/main/routers/create-browser-router)并配置我们的第一个路由。这将为我们的`web`应用程序启用客户端路由。

该`main.jsx`文件是入口点。打开它，我们将把 React Router 放在页面上。

👉**创建并渲染[浏览器路由](https://reactrouter.com/en/main/routers/create-browser-router)在`main.jsx`**

`src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

第一条路由就是我们通常所说的“根路由”，因为我们的其余路由将在其里面渲染。它将作为 UI 的根布局，随着我们的深入，我们将有嵌套布局。

##  根路由

让我们为这个应用程序添加全局布局。

👉**创建`src/routes`和`src/routes/root.jsx`**

```sh
mkdir src/routes
touch src/routes/root.jsx
```

（如果你不想成为命令行书呆子，请使用你的编辑器而不是那些命令🤓）

👉**创建根布局组件**

`src/routes/root.jsx`

```jsx
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
```

目前还没有 React Router 的具体内容，所以请随意复制/粘贴所有这些内容。

👉**设置`<Root>`为根路由[`element`](https://reactrouter.com/en/main/route/route#element)**

`src/main.jsx`

```jsx
/* existing imports */
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

该应用程序现在应该看起来像这样。有一个能写 CSS 的设计师当然很好，不是吗？（[谢谢吉姆](https://blog.jim-nielsen.com/)🙏）。

![img](https://reactrouter.com/_docs/tutorial/01.webp)

## 处理Not Found错误

在项目早期了解您的应用程序如何响应错误始终是个好主意，因为在构建新应用程序时，我们编写的错误远远多于功能！发生这种情况时，您的用户不仅会获得良好的体验，而且还会在开发过程中为您提供帮助。

我们在这个应用程序中添加了一些链接，让我们看看当我们点击它们时会发生什么？

👉**单击其中一个侧边栏名称**

![默认 React Router 错误元素的屏幕截图](https://reactrouter.com/_docs/tutorial/02.webp)

总的！这是 React Router 中的默认错误显示，由于我们在该应用程序根元素上的 flex box 样式而变得更糟😂。

任何时候您的应用程序在渲染、加载数据或执行数据突变时抛出错误，React Router 都会捕获它并渲染错误屏幕。让我们制作我们自己的错误页面。

👉**创建错误页面组件**

```sh
touch src/error-page.jsx
```

`src/error-page.jsx`

```jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

👉**设置`<ErrorPage>`为[`errorElement`](https://reactrouter.com/en/main/route/error-element)根路由**

`src/main.jsx`

```jsx
/* previous imports */
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

错误页面现在应该如下所示：

![新的错误页面，但仍然很难看](https://reactrouter.com/_docs/tutorial/03.webp)

（好吧，这也好不到哪去。可能有人忘记找设计师做错误页面。可能大家都忘记找设计师做错页了，然后责怪设计师没想到吧😆）

请注意，[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)提供了抛出的错误。当用户导航到不存在的路线时，您将收到带有 "Not Found"的[错误响应](https://reactrouter.com/en/main/utils/is-route-error-response)`statusText`。我们将在本教程的后面看到一些其他错误，并对其进行更多讨论。

现在，知道几乎所有的错误现在都将由这个页面处理，而不是无限旋转、无响应的页面或空白屏幕就足够了🙌

##  联系人路由界面

我们想要在链接到的 URL 上实际呈现一些内容，而不是 404“未找到”页面。为此，我们需要开辟一条新路由。

👉**创建联系人路由模块**

```sh
touch src/routes/contact.jsx
```

👉**添加联系人组件界面**

这只是一堆元素，请随意复制/粘贴。

`src/routes/contact.jsx`

```jsx
import { Form } from "react-router-dom";

export default function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
```

现在我们已经有了一个组件，让我们把它连接到一个新的路由上。

👉**导入联系人组件并新建路由**

`src/main.jsx`

```jsx
/* existing imports */
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

/* existing code */
```

现在，如果我们单击其中一个链接或访问`/contacts/1`，我们将获得新组件！

![没有父布局的联系路由渲染](https://reactrouter.com/_docs/tutorial/04.webp)

然而，它不在我们的根布局内😠

## 嵌套路由

我们希望联系人组件渲染在`<Root>`*内部*，像这样布局。

![img](https://reactrouter.com/_docs/tutorial/05.webp)

我们通过将联系人路由成为根路由的子路由来实现*。*

👉**将 contacts 路由移动为根路由的子路由**

`src/main.jsx`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

您现在将再次看到根布局，但右侧是一个空白页面。我们需要告诉根路由我们希望它*在哪里渲染它的子路由。*我们使用[`<Outlet>`](https://reactrouter.com/en/main/components/outlet)做到这一点。

找到`<div id="detail">`并在里面放一个`<Outlet>`。

👉**渲染[`<Outlet>`](https://reactrouter.com/en/main/components/outlet)**

`src/routes/root.jsx`

```jsx
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

## 客户端路由

你可能已经注意到，也可能没有注意到，但是当我们单击侧边栏中的链接时，浏览器正在对下一个 URL 执行完整的文档请求，而不是使用 React Router。

客户端路由允许我们的应用更新 URL ，而无需从服务器请求另一个文档。相反，应用程序可以立即渲染新的 UI。让我们使用[`<Link>`](https://reactrouter.com/en/main/components/link)把它变成现实吧。

👉**将侧边栏`<a href>`改为`<Link to>`**

`src/routes/root.jsx`

```jsx
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
```

您可以在浏览器 devtools 中打开网络选项卡，查看它不再请求文档了。

## 加载数据

URL 段、布局和数据通常耦合（三倍？）在一起。我们已经可以在这个应用程序中看到它：

| 网址段     | 成分        | 数据       |
| ---------- | ----------- | ---------- |
| /          | `<Root>`    | 联系人列表 |
| 联系人/:id | `<Contact>` | 独立联系人 |

由于这种自然耦合，React Router 具有数据约定，可以轻松地将数据放入路由组件中。

我们将使用两个 API 来加载数据，[`loader`](https://reactrouter.com/en/main/route/loader)和[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data). 首先，我们将在根模块中创建并导出一个`loader`函数，然后将其连接到路由。最后，我们将访问并渲染数据。

👉**从`root.jsx`导出loader**

`src/routes/root.jsx`

```jsx
import { Outlet, Link } from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
```

👉**在路由上配置loader**

`src/main.jsx`

```jsx
/* other imports */
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

👉**访问和渲染数据**

`src/routes/root.jsx`

```jsx
import {
  Outlet,
  Link,
  useLoaderData,
} from "react-router-dom";
import { getContacts } from "../contacts";

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        {/* other code */}
      </div>
    </>
  );
}
```

就是这样！React Router 现在将自动保持该数据与您的 UI 同步。我们还没有任何数据，所以您可能会得到一个像这样的空白列表：

![img](https://reactrouter.com/_docs/tutorial/06.webp)

## 数据写入 + HTML 表单

我们将在一秒钟内创建我们的第一个联系人，但首先让我们谈谈 HTML。

根据 JavaScript 寒武纪大爆发之前的 Web 开发，React Router 模拟 HTML 表单导航作为数据突变原语。它为您提供了客户端渲染应用程序的功能，并具有“老式”Web 模型的简单性。

虽然对一些 Web 开发人员来说不熟悉，但 HTML 表单实际上会在浏览器中引起导航，就像单击链接一样。唯一的区别在于请求：链接只能更改 URL，而表单还可以更改请求方法（GET 与 POST）和请求正文（POST 表单数据）。

如果没有客户端路由，浏览器将自动序列化表单的数据，并将其作为 POST 的请求主体和 GET 的 URLSearchParams 发送到服务器。React Router 做同样的事情，只是它不将请求发送到服务器，而是使用客户端路由并将其发送到路由 [`action`](https://reactrouter.com/en/main/route/action)。

我们可以通过单击应用程序中的“新建”按钮来测试这一点。该应用程序应该会崩溃，因为 Vite 服务器未配置为处理 POST 请求（它发送 404，尽管它可能应该是 405 🤷）。

![img](https://reactrouter.com/_docs/tutorial/07.webp)

我们不要将 POST 发送到 Vite 服务器以创建新联系人，而是使用客户端路由。

## 创建联系人

我们将通过在我们的根路由导出`action`中来创建新的联系人，将其连接到路由配置，并将我们的更改`<form>`为 React Router [`Form`](https://reactrouter.com/en/main/components/form)。

👉**创建动作并更改`<form>`为`<Form>`**

`src/routes/root.jsx`

```jsx
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return { contact };
}

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* other code */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        {/* other code */}
      </div>
    </>
  );
}
```

👉**在路由上导入并设置动作**

`src/main.jsx`

```jsx
/* other imports */

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

就是这样！继续点击“新建”按钮，您应该会看到一条新记录弹出到列表中🥳

![img](https://reactrouter.com/_docs/tutorial/08.webp)

该`createContact`方法只是创建一个没有名称或数据或任何东西的空联系人。但它仍然创造了一个记录，保证！

> 🧐 等等……侧边栏怎么更新的？我们在哪里调用`action`？重新获取数据的代码在哪里？`useState`，`onSubmit`和`useEffect`在哪里？！

这就是“老式网络”编程模型出现的地方。正如我们之前讨论的，[`Form`](https://reactrouter.com/en/main/components/form)阻止浏览器将请求发送到服务器，而是将其发送到路由`action`。在 Web 语义中，POST 通常意味着某些数据正在更改。按照惯例，React Router 使用此作为提示，在操作完成后自动重新验证页面上的数据。这意味着您的所有`useLoaderData`挂钩都会更新，并且 UI 会自动与您的数据保持同步！很酷。

## 加载程序中的 URL 参数

👉**点击无名记录**

我们应该再次看到我们旧的静态联系页面，但有一个不同：URL 现在有一个真实的 ID 用于记录。

![img](https://reactrouter.com/_docs/tutorial/09.webp)

查看路由配置，路由如下所示：

```javascript
[
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
];
```

请注意`:contactId`URL 段。冒号 ( `:`) 具有特殊含义，将其变成“动态片段”。动态段将匹配 URL 中该位置的动态（变化的）值，例如联系人 ID。我们将 URL 中的这些值称为“URL 参数”，或简称为“参数”。

这些[`params`](https://reactrouter.com/en/main/route/loader#params)使用与动态段匹配的键传递给加载程序。例如，我们的片段已命名`:contactId`，因此值将被传递为`params.contactId`。

这些参数最常用于通过 ID 查找记录。让我们试试看。

👉**将loader添加到联系人页面, 并使用`useLoaderData`访问数据**

`src/routes/contact.jsx`

```jsx
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  return getContact(params.contactId);
}

export default function Contact() {
  const contact = useLoaderData();
  // existing code
}
```

👉**在路由上配置loader**

`src/main.jsx`

```jsx
/* existing code */
import Contact, {
  loader as contactLoader,
} from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);

/* existing code */
```

![img](https://reactrouter.com/_docs/tutorial/10.webp)

## 更新数据

就像创建数据一样，您可以使用[`Form`](https://reactrouter.com/en/main/components/form)更新数据。让我们在`contacts/:contactId/edit`创建一条新路由。同样，我们将从组件开始，然后将其连接到路由配置。

**创建编辑组件**

```sh
touch src/routes/edit.jsx
```

👉**添加编辑页面UI**

没有我们以前没见过的，请随意复制/粘贴：

`src/routes/edit.jsx`

```jsx
import { Form, useLoaderData } from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
```

👉**添加新的编辑路由**

`src/main.jsx`

```jsx
/* existing code */
import EditContact from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
      },
    ],
  },
]);

/* existing code */
```

我们希望它在根路由的`outlet`中渲染，因此我们将它设为现有子路由的同级。

（你可能注意到，我们重新使用了`contactLoader`这个路由。这只是因为我们在教程中很懒。没有理由尝试在路由之间共享loader，它们通常有自己的loader。）

好吧，点击“编辑”按钮将为我们提供这个新的UI：

![img](https://reactrouter.com/_docs/tutorial/11.webp)

## 使用 FormData 更新联系人

我们刚刚创建的编辑路由已经渲染了一个表单。要更新记录，我们所需要做的就是将一个操作连接到路由。表单将发送到操作，数据将自动重新验证。

👉**为编辑模块添加一个动作**

`src/routes/edit.jsx`

```jsx
import {
  Form,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

/* existing code */
```

👉**将动作连接到路线**

`src/main.jsx`

```jsx
/* existing code */
import EditContact, {
  action as editAction,
} from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
]);

/* existing code */
```

填写表格，点击保存，你应该会看到这样的东西！（除了眼睛更容易，毛发可能更少。）

![img](https://reactrouter.com/_docs/tutorial/12.webp)

## Mutation讨论

> 😑 它有效，但我不知道这里发生了什么......

让我们深入挖掘一下......

打开`src/routes/edit.jsx`并查看表单元素。注意他们每个人如何有一个名字：

```javascript
<input
  placeholder="First"
  aria-label="First name"
  type="text"
  name="first"
  defaultValue={contact.first}
/>
```

如果没有 JavaScript，当表单被提交时，浏览器会在将表单[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)发送到服务器时将其创建并设置为请求的主体。如前所述，React Router 会阻止这种情况并将请求发送到您的操作，包括[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

表单中的每个字段都可以使用 访问`formData.get(name)`。例如，给定上面的输入字段，您可以像这样访问名字和姓氏：

```javascript
export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
}
```

由于我们有一些表单字段，我们过去常常[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)将它们全部收集到一个对象中，这正是我们的`updateContact`函数所需要的。

```javascript
const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
```

除了`action`，我们讨论的这些 API 都不是 React Router 提供的：[`request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), [`request.formData`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData),[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)都是由网络平台提供的。

完成操作后，请注意[`redirect`](https://reactrouter.com/en/main/fetch/redirect)最后：

`src/routes/edit.jsx`

```javascript
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

加载程序和操作都可以[返回一个`Response`](https://reactrouter.com/en/main/route/loader#returning-responses)（有道理，因为它们收到了一个[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)！）。[`redirect`](https://reactrouter.com/en/main/fetch/redirect)助手只是让返回告诉应用更改位置的[响应变得更容易。](https://developer.mozilla.org/en-US/docs/Web/API/Response)

如果没有客户端路由，如果服务器在 POST 请求后重定向，新页面将获取最新数据并呈现。正如我们之前了解到的，React Router 模拟此模型并在操作后自动重新验证页面上的数据。这就是当我们保存表单时侧边栏会自动更新的原因。没有客户端路由，额外的重新验证代码不存在，因此客户端路由也不需要存在！

## 将新记录重定向到编辑页面

现在我们知道如何重定向，让我们更新创建新联系人的操作以重定向到编辑页面：

👉**重定向到新记录的编辑页面**

`src/routes/root.jsx`

```javascript
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
```

现在当我们点击“新建”时，我们应该会在编辑页面结束：

![img](https://reactrouter.com/_docs/tutorial/13.webp)

👉**添加少量记录**

我将使用第一届 Remix Conference 的一流演讲者阵容😁

![img](https://reactrouter.com/_docs/tutorial/14.webp)

## 活动链接样式

现在我们有一堆记录，不清楚我们在侧边栏中查看的是哪一个。我们可以[`NavLink`](https://reactrouter.com/en/main/components/nav-link)用来解决这个问题。

👉**在侧边栏中****使用 a`NavLink`**

`src/rootes/root.jsx`

```javascript
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>{/* other code */}</p>
          )}
        </nav>
      </div>
    </>
  );
}
```

请注意，我们正在将一个函数传递给`className`. 当用户位于 中的 URL 时，则为`NavLink`真`isActive`。当它*即将*处于活动状态（数据仍在加载）时，则为`isPending`真。这使我们能够轻松地指示用户所在的位置，并对已单击但我们仍在等待数据加载的链接提供即时反馈。

![img](https://reactrouter.com/_docs/tutorial/15.webp)

## 全局待定用户界面

当用户浏览应用程序时，React Router 将在为下一页加载数据时*保留旧页面。*您可能已经注意到，当您在列表之间单击时，该应用感觉有点反应迟钝。让我们为用户提供一些反馈，这样应用程序就不会感觉反应迟钝。

React Router 在幕后管理所有状态，并揭示构建动态 Web 应用程序所需的部分。在这种情况下，我们将使用[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)钩子。

👉**`useNavigation`添加全局挂起的 UI**

`src/routes/root.jsx`

```javascript
import {
  // existing code
  useNavigation,
} from "react-router-dom";

// existing code

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">{/* existing code */}</div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
```

[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)返回当前导航状态：它可以是`"idle" | "submitting" | "loading"`.

在我们的例子中，`"loading"`如果我们不空闲，我们会向应用程序的主要部分添加一个类。然后 CSS 在短暂的延迟后添加一个漂亮的淡入淡出（以避免闪烁 UI 以进行快速加载）。不过你可以做任何你想做的事，比如在顶部显示一个微调器或加载栏。

![img](https://reactrouter.com/_docs/tutorial/16.webp)

请注意，我们的数据模型 ( `src/contact.js`) 具有客户端缓存，因此第二次导航到同一联系人的速度很快。这种行为*不是*React Router，它会重新加载更改路由的数据，无论您以前是否去过那里。但是，它确实避免在导航期间为*不变的路线（如列表）调用加载器。*

## 删除记录

如果我们查看联系人路由中的代码，我们会发现删除按钮如下所示：

`src/routes/contact.jsx`

```javascript
<Form
  method="post"
  action="destroy"
  onSubmit={(event) => {
    if (
      !confirm(
        "Please confirm you want to delete this record."
      )
    ) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>
```

注意`action`要点`"destroy"`。像`<Link to>`，`<Form action>`可以取一个*相对*值。由于表单是在 中呈现的`contact/:contactId`，因此相关操作`destroy`将`contact/:contactId/destroy`在单击时提交表单。

此时您应该知道使删除按钮起作用所需知道的一切。也许在继续之前试一试？你需要：

1. 一条新路线
2. 在`action`那条路线上
3. `deleteContact`从`src/contacts.js`

👉**创建“destroy”路由模块**

```sh
touch src/routes/destroy.jsx
```

👉**添加销毁动作**

`src/routes/destory.jsx`

```javascript
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

👉**将 destroy 路由添加到路由配置中**

`src/main.jsx`

```javascript
/* existing code */
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    /* existing root route props */
    children: [
      /* existing routes */
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

/* existing code */
```

好的，导航到记录并单击“删除”按钮。有用！

> 😀 我仍然很困惑为什么这一切都有效

当用户点击提交按钮时：

1. `<Form>`阻止向服务器发送新 POST 请求的默认浏览器行为，而是通过创建带有客户端路由的 POST 请求来模拟浏览器
2. `<Form action="destroy">`匹配新路由并向其`"contacts/:contactId/destroy"`发送请求
3. 动作重定向后，React Router 调用页面上数据的所有加载器以获取最新值（这就是“重新验证”）。`useLoaderData`返回新值并导致组件更新！

添加一个表单，添加一个动作，React Router 会完成剩下的工作。

## 上下文错误

只是为了好玩，在销毁操作中抛出一个错误：

`src/routes/destory.jsx`

```javascript
export async function action({ params }) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
```

![img](https://reactrouter.com/_docs/tutorial/17.webp)

认得那个屏幕吗？是我们[`errorElement`](https://reactrouter.com/en/main/route/error-element)以前的 然而，用户除了点击刷新之外，实际上无法做任何事情来从该屏幕恢复。

让我们为 destroy 路由创建上下文错误消息：

`src/main.jsx`

```javascript
[
  /* other routes */
  {
    path: "contacts/:contactId/destroy",
    action: destroyAction,
    errorElement: <div>Oops! There was an error.</div>,
  },
];
```

现在再试一次：

![img](https://reactrouter.com/_docs/tutorial/18.webp)

我们的用户现在有更多选择，而不是猛烈刷新，他们可以继续与页面上没有问题的部分进行交互🙌

因为 destroy 路由有自己的路由`errorElement`并且是根路由的子路由，所以错误将呈现在那里而不是根路由。您可能已经注意到，这些错误冒泡到最近的`errorElement`. 只要您在根部有一个，就可以添加任意多的或少的。

## 索引路线

当我们加载应用程序时，您会注意到列表右侧有一个很大的空白页。

![img](https://reactrouter.com/_docs/tutorial/19.webp)

当一条路线有孩子，而你在父路线的路径上时，`<Outlet>`没有任何东西可以渲染，因为没有孩子匹配。您可以将索引路由视为填充该空间的默认子路由。

👉**创建索引路由模块**

```sh
touch src/routes/index.jsx
```

👉**填写索引组件的元素**

随意复制粘贴，这里没什么特别的。

`src/routes/index.jsx`

```javascript
export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">
        the docs at reactrouter.com
      </a>
      .
    </p>
  );
}
```

👉**配置索引路由**

`src/main.jsx`

```javascript
// existing code
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      /* existing routes */
    ],
  },
]);
```

请注意[`{ index:true }`](https://reactrouter.com/en/main/route/route#index)而不是[`{ path: "" }`](https://reactrouter.com/en/main/route/route#path)。这告诉路由器在用户位于父路由的确切路径时匹配并呈现此路由，因此在`<Outlet>`.

![img](https://reactrouter.com/_docs/tutorial/20.webp)

瞧！没有更多的空白。将仪表板、统计信息、提要等放在索引路由中是很常见的。他们也可以参与数据加载。

## 取消按钮

在编辑页面上，我们有一个尚未执行任何操作的取消按钮。我们希望它做与浏览器的后退按钮相同的事情。

我们需要在按钮上以及[`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate)来自 React Router 的点击处理程序。

👉**添加取消按钮单击处理程序`useNavigate`**

`src/routes/edit.jsx`

```javascript
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

export default function Edit() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      {/* existing code */}

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
```

现在，当用户单击“取消”时，他们将在浏览器历史记录中返回一个条目。

> 🧐 为什么按钮上没有`event.preventDefault`？

A `<button type="button">`，虽然看似多余，却是防止按钮提交其表单的 HTML 方式。

还有两个功能。我们在最后阶段！

## URL 搜索参数和 GET 提交

到目前为止，我们所有的交互式 UI 要么是更改 URL 的链接，要么是将数据发布到操作的表单。搜索字段很有趣，因为它是两者的混合体：它是一个表单，但它只更改 URL，不更改数据。

现在它只是一个普通的 HTML `<form>`，而不是 React Router `<Form>`。让我们看看默认情况下浏览器对它做了什么：

👉**在搜索字段中输入名称，然后按回车键**

请注意浏览器的 URL 现在包含您在 URL 中的查询作为[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：

```sh
http://127.0.0.1:5173/?q=ryan
```

如果我们查看搜索表单，它看起来像这样：

`src/routes/root.jsx`

```javascript
<form id="search-form" role="search">
  <input
    id="q"
    aria-label="Search contacts"
    placeholder="Search"
    type="search"
    name="q"
  />
  <div id="search-spinner" aria-hidden hidden={true} />
  <div className="sr-only" aria-live="polite"></div>
</form>
```

正如我们之前所见，浏览器可以通过`name`输入元素的属性来序列化表单。此输入的名称是`q`，这就是 URL 具有 的原因`?q=`。如果我们将其命名，`search`则 URL 将是`?search=`.

请注意，此表单与我们使用的其他表单不同，它没有`<form method="post">`. 默认`method`值为`"get"`。这意味着当浏览器创建对下一个文档的请求时，它不会将表单数据放入请求 POST 正文中，而是放入[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)GET 请求中。

## 使用客户端路由获取提交

让我们使用客户端路由来提交此表单并在我们现有的加载程序中过滤列表。

👉**更改`<form>`为`<Form>`**

`src/routes/root.jsx`

```javascript
<Form id="search-form" role="search">
  <input
    id="q"
    aria-label="Search contacts"
    placeholder="Search"
    type="search"
    name="q"
  />
  <div id="search-spinner" aria-hidden hidden={true} />
  <div className="sr-only" aria-live="polite"></div>
</Form>
```

👉**过滤列表是否有URLSearchParams**

`src/routes/root.jsx`

```javascript
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}
```

![img](https://reactrouter.com/_docs/tutorial/21.webp)

因为这是 GET 而不是 POST，React Router*不会*调用`action`. 提交 GET 表单与单击链接相同：只是 URL 发生了变化。这就是为什么我们为过滤添加的代码是在 中`loader`，而不是`action`这条路由的。

这也意味着它是一个正常的页面导航。您可以单击后退按钮返回到您所在的位置。

## 将 URL 同步到表单状态

这里有几个用户体验问题，我们可以快速解决。

1. 如果您在搜索后单击返回，即使列表不再被过滤，表单字段仍具有您输入的值。
2. 如果您在搜索后刷新页面，即使列表被过滤，表单字段中也不再有值

换句话说，URL 和我们的表单状态不同步。

👉从你的加载器**返回`q`并将其设置为搜索字段默认值**

`src/routes/root.jsx`

```javascript
// existing code

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

这解决了问题（2）。如果您现在刷新页面，输入字段将显示查询。

![img](https://reactrouter.com/_docs/tutorial/21.webp)

现在对于问题 (1)，单击后退按钮并更新输入。我们可以`useEffect`从 React 中引入，直接在 DOM 中操作表单的状态。

👉 将**输入值与 URL 搜索参数同步**

`src/routes/root.jsx`

```javascript
import { useEffect } from "react";

// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // existing code
}
```

> 🤔 你不应该为此使用受控组件和 React State 吗？

您当然可以将此作为一个受控组件来执行，但是对于相同的行为，您最终会变得更加复杂。您不控制 URL，用户使用后退/前进按钮来控制。受控组件会有更多的同步点。

注意控制输入现在需要三个同步点而不是一个。行为相同，但代码更复杂。

`src/routes/root.jsx`

```javascript
import { useEffect, useState } from "react";
// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const navigation = useNavigation();

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
    </>
  );
}
```

##  提交表格`onChange`

我们要在这里做出产品决策。对于此 UI，我们可能更愿意在每次击键时进行过滤，而不是在显式提交表单时进行过滤。

我们已经看到，为此`useNavigate`我们将使用它的表亲。[`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit)

`src/routes/root.jsx`

```javascript
// existing code
import {
  // existing code
  useSubmit,
} from "react-router-dom";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

现在，当您键入时，表单会自动提交！

注意 的参数[`submit`](https://reactrouter.com/en/main/hooks/use-submit)。我们路过`event.currentTarget.form`。`currentTarget`是事件附加到的 DOM 节点，是`currentTarget.form`输入的父表单节点。该`submit`函数将序列化并提交您传递给它的任何表单。

## 添加搜索微调器

在生产应用程序中，此搜索可能会在太大而无法一次发送所有内容的数据库中查找记录并过滤客户端。这就是为什么这个演示有一些伪造的网络延迟。

没有任何加载指示器，搜索感觉有点迟钝。即使我们可以使我们的数据库更快，我们也总是会遇到用户的网络延迟问题，并且超出我们的控制范围。为了获得更好的用户体验，让我们为搜索添加一些即时 UI 反馈。为此，我们将[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)再次使用。

👉**添加搜索微调器**

`src/routes/root.jsx`

```javascript
// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              // existing code
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

![img](https://reactrouter.com/_docs/tutorial/22.webp)

当`navigation.location`应用程序导航到新 URL 并为其加载数据时，将显示。当不再有挂起的导航时，它就会消失。

## 管理历史栈

现在每次击键都会提交表单，如果我们输入字符“seba”然后用退格键删除它们，我们最终会在堆栈中得到 7 个新条目 😂。我们绝对不想要这个

![img](https://reactrouter.com/_docs/tutorial/23.webp)

我们可以通过用下一页*替换*历史堆栈中的当前条目来避免这种情况，而不是推入它。

👉**使用`replace`于`submit`**

`src/routes/root.jsx`

```javascript
// existing code

export default function Root() {
  // existing code

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              // existing code
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

我们只想替换搜索结果，而不是我们开始搜索之前的页面，所以我们快速检查这是否是第一次搜索，然后决定替换。

每次击键不再创建新条目，因此用户可以从搜索结果中单击返回，而无需单击 7 次 😀。

## 没有导航的突变

到目前为止，我们所有的突变（我们更改数据的时间）都使用导航的形式，在历史堆栈中创建新条目。虽然这些用户流很常见，但想要在*不*引起导航的情况下更改数据也同样常见。

对于这些情况，我们有[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)办法。它允许我们在不引起导航的情况下与加载程序和操作进行通信。

联系页面上的 ★ 按钮对此很有意义。我们不是在创建或删除新记录，我们不想更改页面，我们只是想更改我们正在查看的页面上的数据。

👉**将表单更改为fetcher`<Favorite>`表单**

`src/routes/contact.jsx`

```javascript
import {
  useLoaderData,
  Form,
  useFetcher,
} from "react-router-dom";

// existing code

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

我们来的时候可能想看看那个表格。与往常一样，我们的表单具有带有`name`道具的字段。此表单将发送[`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)一个`favorite`密钥，该密钥是`"true" | "false"`. 因为它有`method="post"`它会调用操作。由于没有`<fetcher.Form action="...">`道具，它将发布到呈现表单的路线。

👉**创建动作**

`src/routes/contact.jsx`

```javascript
// existing code
import { getContact, updateContact } from "../contacts";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  // existing code
}
```

很简单。从请求中提取表单数据并将其发送到数据模型。

👉**配置路由的新动作**

`src/main.jsx`

```javascript
// existing code
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      /* existing code */
    ],
  },
]);
```

好了，我们准备好点击用户名旁边的星号了！

![img](https://reactrouter.com/_docs/tutorial/24.webp)

检查一下，两颗星都会自动更新。我们的新功能`<fetcher.Form method="post">`几乎与`<Form>`我们一直使用的功能完全相同：它调用操作，然后自动重新验证所有数据——甚至您的错误也会以相同的方式被捕获。

但有一个关键区别，它不是导航——URL 不会改变，历史堆栈不受影响。

## 乐观的用户界面

您可能注意到当我们单击上一节中的收藏按钮时，该应用感觉有点反应迟钝。再一次，我们添加了一些网络延迟，因为您将在现实世界中遇到它！

为了给用户一些反馈，我们可以将星星置于加载状态[`fetcher.state`](https://reactrouter.com/en/main/hooks/use-fetcher#fetcherstate)（与之前非常相似`navigation.state`），但这次我们可以做得更好。我们可以使用一种称为“乐观 UI”的策略

提取器知道提交给操作的表单数据，因此您可以在 上使用它`fetcher.formData`。我们将使用它来立即更新星星的状态，即使网络尚未完成。如果更新最终失败，UI 将恢复为真实数据。

👉从中**读取乐观值`fetcher.formData`**

`src/routes/contact.jsx`

```javascript
// existing code

function Favorite({ contact }) {
  const fetcher = useFetcher();

  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

如果您现在单击该按钮，您应该会看到星星*立即*更改为新状态。我们不是总是渲染实际数据，而是检查 fetcher 是否有任何`formData`提交，如果有，我们将使用它。操作完成后，`fetcher.formData`将不再存在，我们将返回使用实际数据。所以即使你在乐观的 UI 代码中写了错误，它最终也会回到正确的状态🥹

## 未找到数据

如果我们尝试加载的联系人不存在会怎样？

![img](https://reactrouter.com/_docs/tutorial/25.webp)

[`errorElement`](https://reactrouter.com/en/main/route/error-element)当我们尝试呈现`null`联系人时，我们的根源是捕捉到这个意外错误。很高兴错误得到了妥善处理，但我们可以做得更好！

每当您在加载程序或操作中遇到预期的错误情况时（例如数据不存在），您都可以`throw`. 调用堆栈将中断，React Router 将捕获它，并呈现错误路径。我们甚至不会尝试提供`null`联系方式。

👉**在加载程序中抛出 404 响应**

`src/routes/contact.jsx`

```javascript
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}
```

![img](https://reactrouter.com/_docs/tutorial/27.webp)

我们没有使用 遇到渲染错误`Cannot read properties of null`，而是完全避免组件并渲染错误路径，告诉用户更具体的事情。

这会让你的快乐之路保持快乐。你的路由元素不需要关心错误和加载状态。

## 无路径路线

最后一件事。我们看到的最后一个错误页面如果呈现在根插座内而不是整个页面内会更好。事实上，我们所有子路由中的每一个错误在 outlet 中都会更好，这样用户就有了比点击刷新更多的选择。

我们希望它看起来像这样：

![img](https://reactrouter.com/_docs/tutorial/26.webp)

我们可以将错误元素添加到每个子路由中，但由于它们都是相同的错误页面，因此不推荐这样做。

有一种更清洁的方法。路由可以在*没有*路径的情况下使用，这让它们可以参与 UI 布局，而不需要 URL 中的新路径段。看看这个：

👉**将子路由包裹在无路径路由中**

`src/main.jsx`

```javascript
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          /* the rest of the routes */
        ],
      },
    ],
  },
]);
```

当子路由中抛出任何错误时，我们新的无路径路由将捕获它并呈现，保留根路由的 UI！

## JSX 路线

对于我们的最后一个技巧，许多人更喜欢使用 JSX 配置他们的路由。你可以用`createRoutesFromElements`. 在配置路由时，JSX 或对象在功能上没有区别，这只是一种风格偏好。

```javascript
import {
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);
```

------

就是这样！感谢您尝试 React Router。我们希望本教程能为您提供一个坚实的开端，以构建出色的用户体验。你可以用 React Router 做更多的事情，所以一定要检查所有的 API 😀