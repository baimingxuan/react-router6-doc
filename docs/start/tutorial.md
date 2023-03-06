##  Setup

我们将在本教程中使用 Vite 作为我们的打包工具和开发服务器。您需要安装 Node.js 以使用 `npm` 命令行工具。

👉️**打开您的终端并使用 Vite 创建一个新的 React 应用程序：**

```sh
npm create vite@latest name-of-your-project -- --template react
# follow prompts
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

您应该能够访问终端中打印的 URL：

```
 VITE v3.0.7  ready in 175 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

我们为这个教程准备了一些预先编写的CSS，这样我们就可以集中精力学习React Router。您可以随意地对它进行严厉的评判或编写自己的CSS 😀（我们做了一些通常不会在CSS中做的事情，以便本教程中的标记可以尽可能地保持最小。）

👉**将本教程中[找到](https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css)的 CSS 复制/粘贴`src/index.css`中**

本教程将介绍如何创建、阅读、搜索、更新和删除数据。一个典型的Web应用程序可能会与Web服务器上的API进行通信，但我们将使用浏览器存储并伪造一些网络延迟来模拟这一点。这些代码都与React Router无关，所以只需继续复制/粘贴即可。

👉**将本教程中[找到](https://gist.githubusercontent.com/ryanflorence/1e7f5d3344c0db4a8394292c157cd305/raw/f7ff21e9ae7ffd55bfaaaf320e09c6a08a8a6611/contacts.js)的数据模块复制/粘贴到`src/contacts.js`中**

在 src 文件夹中，你只需要保留 `contacts.js` 、 `main.jsx` 和 `index.css` 。可以删除其他任何文件（例如 `App.js` 和 `assets` 等）。

👉**删除 `src/` 中未使用的文件，这样您只剩下以下文件：**

```
src
├── contacts.js
├── index.css
└── main.jsx
```

如果您的应用正在运行，它可能会暂时崩溃，请继续运行😋。有了这些，我们就可以开始了!

##  添加 Router

首先要做的是创建一个[浏览器路由](https://reactrouter.com/en/main/routers/create-browser-router)并配置我们的第一个路由。这将为我们的 Web 应用启用客户端路由。

`main.jsx`文件是入口点。打开它，我们将把 React Router 放在页面上。

👉**在 `main.jsx` 中创建并渲染[浏览器路由](https://reactrouter.com/en/main/routers/create-browser-router)**

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

第一条路由就是我们通常所说的“根路由”，因为我们的其余路由将在其里面渲染。它将作为 UI 的根布局，随着我们的进展，我们将有嵌套的布局。

##  根路由

让我们为这个应用程序添加全局布局。

👉**创建`src/routes`和`src/routes/root.jsx`**

```sh
mkdir src/routes
touch src/routes/root.jsx
```

（如果您不想成为命令行专家，请使用编辑器而不是那些命令🤓）

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

目前还没有任何与 React Router 相关的内容，所以可以随意复制/粘贴所有内容。

👉**将`<Root>`设置为根路由[`element`](https://reactrouter.com/en/main/route/route#element)**

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

现在应用程序应该看起来像这样。有一个既会设计又会编写 CSS 的设计师真是太好了，不是吗？（谢谢 Jim 🙏）。

![img](https://reactrouter.com/_docs/tutorial/01.webp)

## 处理未找到的错误

在项目早期了解应用程序如何响应错误总是一个好主意，因为在构建新应用程序时，我们写的错误远比功能多！这不仅可以让您的用户在发生错误时获得良好的体验，而且还可以在开发过程中帮助您。

我们在这个应用程序中添加了一些链接，让我们看看当我们点击它们时会发生什么？

👉**点击侧边栏中的一个名称**

![默认 React Router 错误元素的屏幕截图](https://reactrouter.com/_docs/tutorial/02.webp)

恶心！这是React Router的默认错误屏幕，由于我们在此应用程序的根元素上使用的flex box样式而变得更糟糕 😂。

每当您的应用程序在渲染、加载数据或执行数据变异时抛出错误时，React Router 都会捕获它并呈现错误屏幕。让我们制作自己的错误页面。

👉**创建一个错误页面组件**

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

👉**设置`<ErrorPage>`作为[`errorElement`](https://reactrouter.com/en/main/route/error-element)根路由**

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

错误页面现在应该是这样的：

![新的错误页面，但仍然很难看](https://reactrouter.com/_docs/tutorial/03.webp)

（好吧，这也好不到哪去。也许有人忘了要求设计师制作错误页面。也许每个人都忘了要求设计师制作错误页面，然后责怪设计师没有想到它😆）

请注意，[`useRouteError`](https://reactrouter.com/en/main/hooks/use-route-error)提供了抛出的错误。当用户导航到不存在的路由时，您将收到一个带有“未找到”`statusText`的[错误响应](https://reactrouter.com/en/main/utils/is-route-error-response)。我们将在本教程的后面看到一些其他错误，并对它们进行更多讨论。

现在，你只需要知道几乎所有的错误都将由此页面处理，而不是无限旋转的加载图标、无响应的页面或空白屏幕🙌

##  联系人路由UI

与其显示 404 “未找到” 页面，我们希望在我们链接到的 URL 上实际呈现一些内容。为此，我们需要创建一个新路由。

👉**创建联系人路由模块**

```sh
touch src/routes/contact.jsx
```

👉**添加联系人组件UI**

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

现在我们已经有了一个组件，让我们将其连接到一个新的路由上。

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

现在，如果我们点击其中一个链接或访问 `/contacts/1` ，我们就会得到我们的新组件！

![没有父布局的联系路由渲染](https://reactrouter.com/_docs/tutorial/04.webp)

然而，它不在我们的根布局内😠

## 嵌套路由

我们希望联系人组件在 `<Root>` 布局中呈现，如下所示。

![img](https://reactrouter.com/_docs/tutorial/05.webp)

我们通过将联系人路由设置为根路由的子路由来实现。

👉**将联系人路由移至根路由的子路由**

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

现在您将再次看到根布局，但右侧是一个空白页面。我们需要告诉根路由我们希望它渲染其子路由的*位置*。我们使用[`<Outlet>`](https://reactrouter.com/en/main/components/outlet)来实现。

找到`<div id="detail">`并在里面放置一个`<Outlet>`。

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

您可能已经注意到，但当我们单击侧边栏中的链接时，浏览器会对下一个URL进行完整的文档请求，而不是使用React Router。

客户端路由允许我们的应用程序更新URL，而无需从服务器请求另一个文档。相反，应用程序可以立即呈现新的UI。让我们使用[`<Link>`](https://reactrouter.com/en/main/components/link)实现它。

👉**将侧边栏`<a href>`更改为`<Link to>`**

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

您可以在浏览器开发工具中打开网络选项卡，以查看它不再请求文档。

## 加载数据

URL 段、布局和数据往往是耦合在一起的（三合一？）。我们已经在这个应用程序中看到了它：

| URL段        | 组件        | 数据       |
| ------------ | ----------- | ---------- |
| /            | `<Root>`    | 联系人列表 |
| contacts/:id | `<Contact>` | 个人联系人 |

由于这种自然的耦合，React Router 有数据约定，可以轻松地将数据传递到您的路由组件中。

我们将使用两个API来加载数据，[`loader`](https://reactrouter.com/en/main/route/loader)和[`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data)。首先，我们将在根模块中创建并导出一个加载器函数，然后将其连接到路由。最后，我们将访问渲染数据。

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

👉**访问并渲染数据**

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

就是这样！React Router 现在会自动将该数据与您的 UI 同步。我们还没有任何数据，所以您可能会得到一个空列表，如下所示：

![img](https://reactrouter.com/_docs/tutorial/06.webp)

## 数据写入 + HTML 表单

我们马上就会创建我们的第一个联系人，但是首先让我们谈谈HTML。

React Router 模拟 HTML 表单导航作为数据变更原语，符合 JavaScript 寒武纪爆炸之前的 Web 开发。它为客户端渲染应用程序提供了 UX 能力，同时保持了“老派”Web模型的简单性。

对于一些 Web 开发者来说，HTML 表单实际上会在浏览器中导航，就像点击链接一样。唯一的区别在于请求方式：链接只能更改 URL，而表单还可以更改请求方法（GET vs POST）和请求正文（POST 表单数据）。

如果没有客户端路由，浏览器将自动序列化表单数据并将其作为 POST 请求的请求正文发送到服务器，并作为 URLSearchParams 发送到 GET 请求。React Router 做的事情也是一样的，只不过它不是将请求发送到服务器，而是使用客户端路由并将其发送到[`action`](https://reactrouter.com/en/main/route/action)路由。

我们可以通过单击应用程序中的“新建”按钮来测试这一点。应用程序应该会崩溃，因为 Vite 服务器没有配置处理 POST 请求（它发送了一个 404，尽管应该是 405 🤷）。

![img](https://reactrouter.com/_docs/tutorial/07.webp)

不要将该POST发送到Vite服务器以创建新联系人，而是改用客户端路由。

## 创建联系人

我们将通过在根路由中导出 `action` 来创建新联系人，将其连接到路由配置，并将 `<form>` 更改为React Router[`Form`](https://reactrouter.com/en/main/components/form)。

👉**创建操作并更改`<form>`为`<Form>`**

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

👉**导入并在路由上设置动作**

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

就是这样！请继续点击“新建”按钮，您应该会看到一个新的记录出现在列表中 🥳。

![img](https://reactrouter.com/_docs/tutorial/08.webp)

`createContact` 方法只是创建一个没有名称、数据或任何内容的空联系人。但它确实会创建一条记录，保证！

> 🧐 等一下... 侧边栏是怎么更新的？我们在哪里调用了 `action` ？重新获取数据的代码在哪里？ `useState` ， `onSubmit` 和 `useEffect` 在哪里？！

这就是“老派的Web”编程模型的体现。正如我们之前讨论的那样，[`Form`](https://reactrouter.com/en/main/components/form)阻止浏览器将请求发送到服务器，并将其发送到您的路由 `action` 。在Web语义中，POST通常意味着某些数据正在更改。按照惯例，React Router将此作为提示，在操作完成后自动重新验证页面上的数据。这意味着您所有的 `useLoaderData` 钩子都会更新，UI会自动与您的数据保持同步！非常酷。

## 加载器中的 URL 参数

👉**点击无名记录**

我们应该会再次看到我们旧的静态联系页面，只有一个不同之处：URL现在具有记录的真实ID。

![img](https://reactrouter.com/_docs/tutorial/09.webp)

查看路由配置，该路由看起来像这样：

```jsx
[
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
];
```

请注意 `:contactId` URL 段。冒号 ( `:` ) 具有特殊含义，将其转换为“动态段”。动态段将匹配 URL 该位置上的动态（变化）值，例如联系人 ID。我们将 URL 中的这些值称为“URL 参数”，或简称为“参数”。

这些[`params`](https://reactrouter.com/en/main/route/loader#params)会带有与动态片段匹配的键传递给加载器。例如，我们的片段名为 `:contactId` ，因此该值将作为 `params.contactId` 传递。

这些参数通常用于通过ID查找记录。让我们试试。

👉**在联系人页面添加一个加载器, 并使用`useLoaderData`访问数据**

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

👉**在路由上配置加载器**

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

就像创建数据一样，您可以使用[`Form`](https://reactrouter.com/en/main/components/form)更新数据。让我们在 `contacts/:contactId/edit` 创建一个新路由。同样，我们将从组件开始，然后将其连接到路由配置。

**创建编辑组件**

```sh
touch src/routes/edit.jsx
```

👉**添加编辑页面UI**

这些都是我们以前见过的，随意复制/粘贴：

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

我们希望它在根路由的`outlet`中渲染，因此我们将其作为现有子路由的同级。

（您可能会注意到，我们在此路线中重复使用了 `contactLoader` 。这只是因为我们在教程中有些懒惰。没有理由尝试在路线之间共享加载程序，它们通常有自己的加载程序。）

好的，点击“编辑”按钮会给我们带来这个新的UI：

![img](https://reactrouter.com/_docs/tutorial/11.webp)

## 使用 FormData 更新联系人

我们刚刚创建的编辑路由已经呈现了一个表单。我们所需要做的就是将一个操作连接到该路由上以更新记录。表单将会提交到该操作，并且数据将会自动重新验证。

👉**为编辑模块中添加一个操作**

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

👉**将操作连接到路由上**

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

填写表格，点击保存，您应该会看到类似于这样的东西！

![img](https://reactrouter.com/_docs/tutorial/12.webp)

## Mutation讨论

> 😑 它起作用了，但我不知道这里发生了什么...

让我们深入挖掘一下......

打开 `src/routes/edit.jsx` 并查看表单元素。注意它们每个都有一个名称：

`src/routes/edit.jsx`

```jsx
<input
  placeholder="First"
  aria-label="First name"
  type="text"
  name="first"
  defaultValue={contact.first}
/>
```

没有 JavaScript，当表单被提交时，浏览器会创建[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)并将其设置为请求的主体，然后将其发送到服务器。如前所述，React Router 阻止了这种情况，而是将请求发送到您的操作中，包括[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。

表单中的每个字段都可以通过 `formData.get(name)` 访问。例如，对于上面的输入字段，您可以像这样访问名字和姓氏：

```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
}
```

由于我们有一些表单字段，我们使用[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)将它们全部收集到一个对象中，这正是我们的 `updateContact` 函数所需的。

```jsx
const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
```

除了 `action` 之外，我们正在讨论的这些 API 都不是由 React Router 提供的：[`request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), [`request.formData`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData),[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)都是由`web`平台提供的。

在我们完成这个动作后，请注意最后的[`redirect`](https://reactrouter.com/en/main/fetch/redirect)：

`src/routes/edit.jsx`

```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

加载器和操作都可以[返回一个`Response`](https://reactrouter.com/en/main/route/loader#returning-responses)（这很有意义，因为它们都接收了[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)!）。[`redirect`](https://reactrouter.com/en/main/fetch/redirect)辅助函数让返回一个通知应用程序更改位置的[`response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)变得更容易。

没有客户端路由，如果服务器在 POST 请求后重定向，新页面将获取最新数据并渲染。正如我们之前学到的，React Router 模拟了这个模型，并在操作后自动重新验证页面上的数据。这就是为什么当我们保存表单时侧边栏会自动更新的原因。如果没有客户端路由，额外的重新验证代码就不存在，因此它也不需要与客户端路由一起存在!

## 将新记录重定向到编辑页面

现在我们知道如何重定向了，让我们更新创建新联系人的操作，以重定向到编辑页面：

👉**重定向到新记录的编辑页面**

`src/routes/root.jsx`

```jsx
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

现在，当我们点击“新建”时，我们应该进入编辑页面：

![img](https://reactrouter.com/_docs/tutorial/13.webp)

👉**添加一些记录**

我将使用第一届Remix Conference的杰出演讲者阵容 😁

![img](https://reactrouter.com/_docs/tutorial/14.webp)

## 活动链接样式

现在我们有很多记录，侧边栏中不清楚我们正在查看哪一个。我们可以使用[`NavLink`](https://reactrouter.com/en/main/components/nav-link)来解决这个问题。

👉**在侧边栏中使用`NavLink`**

`src/rootes/root.jsx`

```jsx
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

请注意，我们正在将一个函数传递给 `className` 。当用户在 `NavLink` 的URL上时， `isActive` 将为真。当它即将激活（数据仍在加载）时， `isPending` 将为真。这使我们能够轻松地指出用户的位置，以及提供即时反馈的链接已被点击，但我们仍然在等待数据加载。

![img](https://reactrouter.com/_docs/tutorial/15.webp)

## 全局待处理UI

当用户浏览应用程序时，React Router 会在加载下一页的数据时*保留旧页面*，您可能已经注意到，当您在列表之间单击时，应用程序会感觉有些不响应。让我们为用户提供一些反馈，以便应用程序不会感觉不响应。

React Router 在幕后管理所有状态，并显示您构建动态 Web 应用程序所需的部分。在这种情况下，我们将使用[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)钩子。

👉**使用`useNavigation`添加全局待处理 UI**

`src/routes/root.jsx`

```jsx
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

[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)返回当前导航状态：它可以是`"idle" | "submitting" | "loading"`中的一个。

在我们的示例中，如果不空闲，我们将向应用程序的主要部分添加 `"loading"` 类。然后 CSS 会在短暂的延迟后添加一个漂亮的淡入效果（以避免在快速加载时闪烁 UI）。不过你可以做任何你想做的事情，比如在顶部显示一个旋转器或加载条。

![img](https://reactrouter.com/_docs/tutorial/16.webp)

请注意，我们的数据模型 ( `src/contact.js`) 具有客户端缓存，因此第二次导航到相同的联系人会很快。这种行为不是React Router，它会重新加载数据以更改路由，无论您以前是否到过那里。但是，在导航期间，它确实避免了对*不变路由*（如列表）调用加载程序。

## 删除记录

如果我们查看联系路径中的代码，我们会发现删除按钮如下所示：

`src/routes/contact.jsx`

```jsx
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

注意`action`指向`"destroy"`。与 `<Link to>` 一样， `<Form action>` 也可以取*相对*值。由于表单在 `contact/:contactId` 中呈现，因此使用 `destroy` 的相对操作将在单击时将表单提交到 `contact/:contactId/destroy` 。

此时，您应该知道使删除按钮起作用所需的一切。在继续之前，也许可以试一试？您需要：

1. 一条新路由
2. 在那条路由上的`action`
3. `src/contacts.js`中的`deleteContact`

👉**创建“destroy”路由模块**

```sh
touch src/routes/destroy.jsx
```

👉**添加销毁动作操作

`src/routes/destory.jsx`

```jsx
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

👉**将 destroy 路由添加到路由配置中**

`src/main.jsx`

```jsx
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

好的，请导航到一条记录并点击“删除”按钮。它可以有效！

> 😀 我仍然很困惑为什么这一切都有效

当用户点击提交按钮时：

1. `<Form>` 阻止默认浏览器行为，即发送新的 POST 请求到服务器，而是通过创建一个带有客户端路由的 POST 请求来模拟浏览器
2. `<Form action="destroy">`匹配 `"contacts/:contactId/destroy"`上的新路由并将请求发送给它
3.  重定向后，React Router 调用页面上所有数据的加载器以获取最新值（这称为“重新验证”）。 `useLoaderData` 返回新值并导致组件更新！

添加一个表单，添加一个操作，React Router 就会完成其余的工作。

## 上下文错误

只是为了好玩，在`destroy`操作中抛出一个错误：

`src/routes/destory.jsx`

```jsx
export async function action({ params }) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
```

![img](https://reactrouter.com/_docs/tutorial/17.webp)

认识这个显示结果吗？这是我们之前的[`errorElement`](https://reactrouter.com/en/main/route/error-element)。然而，用户除了刷新之外，无法真正采取任何措施来从这个屏幕中恢复。

让我们为 destroy 路由创建一个上下文错误消息：

`src/main.jsx`

```jsx
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

我们的用户现在有更多的选择，而不仅仅是不停地刷新页面，他们可以继续与页面上没有问题的部分进行交互 🙌

因为`destroy`路由有自己的`errorElement`，并且是根路由的子路由，所以错误将在那里呈现，而不是在根路由。正如您可能已经注意到的那样，这些错误会冒泡到最近的 `errorElement` 。添加任意多的或任意少的，只要你有一个在根目录。

## 索引路由

当我们加载应用程序时，您会注意到列表右侧有一个很大的空白页。

![img](https://reactrouter.com/_docs/tutorial/19.webp)

当一条路由有子路由，并且您位于父路由的路径时， `<Outlet>` 没有任何内容可呈现，因为没有匹配的子路由。您可以将索引路由视为填充该空间的默认子路由。

👉**创建索引路由模块**

```sh
touch src/routes/index.jsx
```

👉**填写索引组件的元素**

随意复制粘贴，这里没什么特别的。

`src/routes/index.jsx`

```jsx
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

```jsx
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

请注意[`{ index:true }`](https://reactrouter.com/en/main/route/route#index)而不是[`{ path: "" }`](https://reactrouter.com/en/main/route/route#path)。这告诉路由在用户位于父路由的确切路径时匹配和呈现此路由，因此没有其他子路由可在 `<Outlet>` 中呈现。

![img](https://reactrouter.com/_docs/tutorial/20.webp)

瞧！不再有空白空间了。在索引路由中放置仪表板、统计信息、动态等是很常见的。它们也可以参与数据加载。

## 取消按钮

在编辑页面上，我们有一个还没有起作用的取消按钮。我们希望它能像浏览器的后退按钮一样工作。

我们需要在按钮上添加一个点击处理程序，使用来自 React Router 的 `useNavigate` 。

👉**使用`useNavigate`添加取消按钮的点击处理程序**

`src/routes/edit.jsx`

```jsx
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

现在，当用户点击“取消”时，他们将被发送回浏览器历史记录中的一个条目。

> 🧐 为什么按钮上没有`event.preventDefault`？

`<button type="button">`，虽然看起来多余，但是它是 HTML 阻止按钮提交表单的方法。

还有两个功能要完成。我们已经接近终点了！

## URL 搜索参数和 GET 提交

到目前为止，我们所有的交互式 UI 都是通过更改 URL 的链接或将数据提交到操作的表单。搜索字段很有趣，因为它既是表单，又只更改 URL，而不更改数据。

现在它只是一个普通的 HTML `<form>`，而不是 React Router `<Form>`。让我们看看浏览器默认情况下如何处理它：

👉**在搜索框中输入名称，然后按回车键**

请注意，浏览器的 URL 现在包含了您的查询，作为 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：

```sh
http://127.0.0.1:5173/?q=ryan
```

如果我们回顾搜索表单，它看起来像这样：

`src/routes/root.jsx`

```jsx
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

正如我们之前所看到的，浏览器可以通过其输入元素的 `name` 属性对表单进行序列化。这个输入的名称是 `q` ，这就是为什么 URL 有 `?q=` 。如果我们将其命名为 `search` ，那么 URL 将是 `?search=` 。

请注意，此表单与我们使用的其他表单不同，它没有 `<form method="post">` 。默认值 `method` 是 `"get"` 。这意味着当浏览器创建下一个文档的请求时，它不会将表单数据放入请求的 POST 主体中，而是放入 GET 请求的[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)中。

## 使用客户端路由获取提交

让我们使用客户端路由来提交此表单并在现有的加载器中过滤列表。

👉**更改`<form>`为`<Form>`**

`src/routes/root.jsx`

```jsx
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

👉**如果有`URLSearchParams`，则过滤列表**

`src/routes/root.jsx`

```jsx
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}
```

![img](https://reactrouter.com/_docs/tutorial/21.webp)

因为这是一个 GET 请求，而不是 POST 请求，所以 React Router *不会*调用 `action` 。提交 GET 表单与点击链接相同：只有 URL 发生变化。这就是为什么我们为过滤添加的代码在此路由的 `loader` 中，而不是 `action` 。

这也意味着这是一个正常的页面导航。您可以单击返回按钮返回到您之前的位置。

## 将 URL 同步到表单状态

这里有几个用户体验问题，我们可以快速解决。

1. 如果您在搜索后单击"返回"按钮，即使不再过滤列表，表单输入框仍具有您输入的值。
2. 如果您在搜索后刷新页面，即使列表已被过滤，表单输入框中将也不再包含该值。

换句话说，URL 和我们的表单状态不同步。

👉**从你的加载器中返回 `q` 并将其设置为搜索字段的默认值**

`src/routes/root.jsx`

```jsx
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

那就解决了问题 (2)。如果您现在刷新页面，输入框将显示查询。

![img](https://reactrouter.com/_docs/tutorial/21.webp)

现在对于问题（1），点击返回按钮并更新输入。我们可以从React中引入 `useEffect` ，直接在DOM中操作表单的状态。

👉 **将输入值与 URL 搜索参数同步**

`src/routes/root.jsx`

```jsx
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

> 🤔难道你不应该使用受控组件和React State来处理这个问题吗？

您当然可以将其作为受控组件来完成，但是您将为相同的行为增加更多的复杂性。您无法控制 URL，用户可以使用后退/前进按钮来控制。使用受控组件将会有更多的同步点。

请注意，现在控制输入需要三个同步点，而不是只有一个。行为相同，但代码更加复杂。

`src/routes/root.jsx`

```jsx
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

我们需要做出一个产品决策。对于这个UI，我们可能更愿意在每次按键时进行过滤，而不是在表单明确提交时进行过滤。

我们已经看过了 `useNavigate` ，我们将使用它的近亲[`useSubmit`](https://reactrouter.com/en/main/hooks/use-submit) 。

`src/routes/root.jsx`

```jsx
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

现在，当您输入时，表单会自动提交！

注意[`submit`](https://reactrouter.com/en/main/hooks/use-submit)的参数。我们正在传递 `event.currentTarget.form` 。 `currentTarget` 是附加事件的 DOM 节点， `currentTarget.form` 是输入的父表单节点。 `submit` 函数将序列化并提交您传递给它的任何表单。

## 添加搜索旋转器

在生产应用程序中，很可能这个搜索将查找一个数据库中的记录，该数据库太大而无法一次性发送并在客户端进行过滤。这就是为什么这个演示有一些伪造的网络延迟的原因。

没有任何加载指示器，搜索感觉有点缓慢。即使我们可以使我们的数据库更快，我们总是会遇到用户的网络延迟，这是我们无法控制的。为了更好的用户体验，让我们为搜索添加一些即时的UI反馈。为此，我们将再次使用[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation)。

👉**添加搜索旋转器**

`src/routes/root.jsx`

```jsx
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

当应用程序导航到新的URL并加载其数据时， `navigation.location` 将显示出来。当没有待处理的导航时，它会消失。

## 管理历史堆栈

现在每次按键后表单都会被提交，如果我们输入字符“seba”，然后用退格键删除它们，我们最终会在堆栈中得到7个新条目 😂。我们绝对不希望这种情况发生。

![img](https://reactrouter.com/_docs/tutorial/23.webp)

我们可以通过将历史堆栈中的当前条目*替换*为下一页来避免这种情况，而不是将其推入堆栈中。

👉**在`submit`中使用`replace`**

`src/routes/root.jsx`

```jsx
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

我们只想替换搜索结果，而不是我们开始搜索之前的页面，因此我们会快速检查这是否是第一次搜索，然后决定是否进行替换。

每个按键不再创建新条目，因此用户可以在不必点击7次的情况下点击返回以退出搜索结果 😅。

## 没有导航的突变

到目前为止，我们所有的突变（更改数据的时间）都使用了导航的表单，创建历史堆栈中的新条目。虽然这些用户流程很常见，但同样常见的是希望在不引起导航的情况下更改数据。

对于这些情况，我们有[`useFetcher`](https://reactrouter.com/en/main/hooks/use-fetcher)钩子。它允许我们与加载器和操作进行通信，而不会导致导航。

联系页面上的★按钮很适合这个功能。我们不是在创建或删除新记录，也不想改变页面，我们只是想更改我们正在查看的页面上的数据。

👉**将`<Favorite>`表单更改为`fetcher`表单**

`src/routes/contact.jsx`

```jsx
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

在这里的时候，可能需要看一下那个表单。像往常一样，我们的表单有一个带有 `name` 属性的字段。该表单将使用[`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 发送，带有一个 `favorite` 键，该键可以是 `"true" | "false"` 。由于它有 `method="post"` ，它将调用该操作。由于没有 `<fetcher.Form action="...">` 属性，它将发布到渲染表单的路由。

`src/routes/contact.jsx`

```jsx
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

很简单。从请求中获取表单数据并将其发送到数据模型。

👉**配置路由的新操作**

`src/main.jsx`

```jsx
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

好的，我们准备好点击用户名称旁边的星号了！

![img](https://reactrouter.com/_docs/tutorial/24.webp)

看看，两颗星都会自动更新。我们的新功能`<fetcher.Form method="post">`工作方式几乎与我们一直在使用的 `<Form>` 相同：它调用操作，然后所有数据都会自动重新验证--即使您的错误也会以同样的方式被捕获。

然而，有一个关键的区别，它不是导航--URL不会改变，历史记录栈也不会受到影响。

## 乐观的UI

您可能已经注意到，当我们从上一节中单击收藏按钮时，应用程序感觉有点不响应。再次，我们添加了一些网络延迟，因为您将在真实世界中使用它！

为了给用户一些反馈，我们可以使用[`fetcher.state`](https://reactrouter.com/en/main/hooks/use-fetcher#fetcherstate)将星号放入加载状态（与之前的 `navigation.state` 非常相似），但这次我们可以做得更好。我们可以使用一种称为“乐观 UI”的策略。

获取器知道提交到操作的表单数据，因此可以在 `fetcher.formData` 上为您提供。我们将使用它立即更新星星的状态，即使网络尚未完成。如果更新最终失败，UI 将恢复到真实数据。

👉**从`fetcher.formData`中读取乐观值**

`src/routes/contact.jsx`

```jsx
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

如果您现在点击按钮，您应该*立即*看到星星的状态更改为新状态。我们不总是渲染实际数据，而是检查获取器是否有任何正在提交的 `formData` ，如果有，我们将使用它。当操作完成时， `fetcher.formData` 将不再存在，我们将回到使用实际数据的状态。因此，即使您在乐观的 UI 代码中编写错误，它最终也会回到正确的状态 。

## 未找到数据

如果我们尝试加载的联系人不存在会发生什么？

![img](https://reactrouter.com/_docs/tutorial/25.webp)

我们的根 [`errorElement`](https://reactrouter.com/en/main/route/error-element)在尝试渲染一个 `null` 联系人时捕获了这个意外错误。很好，错误被正确处理了，但我们可以做得更好！

每当您在加载器或操作中遇到预期的错误情况，例如数据不存在时，您可以 `throw` 。调用堆栈将中断，React Router 将捕获它，并呈现错误路径。我们甚至不会尝试呈现 `null` 联系人。

👉**在加载器中抛出 404 响应**

`src/routes/contact.jsx`

```jsx
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

与其在 `Cannot read properties of null` 中遇到渲染错误，我们完全避免使用该组件，而是渲染错误路径，向用户提供更具体的信息。

这样可以让您的正常路径保持愉快。您的路由元素不需要关注错误和加载状态。

## 无路径路由

最后一件事。我们看到的最后一个错误页面如果在根 outlet 中展示，而不是整个页面，效果会更好。实际上，我们所有子路由中的每个错误都应该 在outlet 中展示，这样用户就有比刷新更多的选项。

我们希望它看起来像这样：

![img](https://reactrouter.com/_docs/tutorial/26.webp)

我们可以将错误元素添加到每个子路由中，但由于它们都是相同的错误页面，这并不推荐。

有一种更简洁的方式。可以使用没有路径的路由，这使它们可以参与 UI 布局，而无需在 URL 中添加新的路径段。看看这个：

👉**将子路由包裹在无路径路由中**

`src/main.jsx`

```jsx
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

当子路由中抛出任何错误时，我们的新无路径路由将捕获并展示它，保留根路由的UI！

## JSX 路由

对于我们的最后一招，许多人更喜欢使用JSX配置他们的路由。您可以使用 `createRoutesFromElements` 来实现。在配置路由时，JSX或对象之间没有功能上的区别，这只是一种风格上的偏好。

```jsx
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

就是这样！感谢您尝试使用React Router。我们希望这个教程能够为您提供一个坚实的开始，以构建出色的用户体验。使用React Router，您还可以做更多的事情，因此请确保查看所有的API 😀