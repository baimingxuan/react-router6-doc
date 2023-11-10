#  开始

我们将在本教程中使 [`Vite`](https://vitejs.dev/guide/)作为我们的打包工具和开发服务器。您需要安装[`Node.js`](https://nodejs.org/)以使用 `npm` 命令行工具。

👉️**打开您的终端并使用 Vite 创建一个新的 React 应用程序：**

```bash
npm create vite@latest name-of-your-project -- --template react
# follow prompts
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

您应该能够访问终端中打印的 URL：

```bash
 VITE v3.0.7  ready in 175 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

我们为本教程预制了一些 CSS，这样我们就可以专注于 React Router。您可以对它进行苛刻的评判，也可以自己编写 😅 （我们做了一些通常不会在 CSS 中做的事情，这样本教程中的标记就可以尽可能少。）

👉**将[此处](https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css)的 CSS 教程复制/粘贴`src/index.css`**

本教程将介绍数据的创建、读取、搜索、更新和删除。典型的 Web 应用程序可能会与 Web 服务器上的 API 进行对话，但我们将使用浏览器存储并伪造一些网络延迟，以保持重点突出。这些代码都与 React Router 无关，所以只需复制/粘贴即可。

👉**将[此处](https://gist.githubusercontent.com/ryanflorence/1e7f5d3344c0db4a8394292c157cd305/raw/f7ff21e9ae7ffd55bfaaaf320e09c6a08a8a6611/contacts.js)的教程数据模块复制/粘贴到`src/contacts.js`**

在 src 文件夹中，您只需要 `contacts.js` 、 `main.jsx` 和 `index.css` 。您可以删除其他任何内容（如 `App.js` 和 `assets` 等）。

👉**删除 `src/` 中未使用的文件，这样就只剩下这些文件了：**

```
src
├── contacts.js
├── index.css
└── main.jsx
```

如果您的应用程序正在运行，可能会暂时崩溃，请继续😋。这样，我们就可以开始了！

##  添加 Router

首先要做的是创建[浏览器路由](../router/create-browser-router)并配置我们的第一个路由。这将为我们的 Web 应用启用客户端路由。

`main.jsx`文件是入口点。打开它，我们将在页面上使用 React Router。

👉**在 `main.jsx` 中创建并渲染[浏览器路由](../router/create-browser-router)**

`src/main.jsx`

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
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

第一条路由就是我们常说的 "根路由"，因为其余的路由都将在它的内部呈现。它将作为用户界面的根布局，我们还将嵌套布局。

##  根路由

让我们为这个应用程序添加全局布局。

👉**创建`src/routes`和`src/routes/root.jsx`**

```sh
mkdir src/routes
touch src/routes/root.jsx
```

(如果不想成为命令行书呆子，请使用编辑器来代替这些命令🤓）。

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

还没有关于 React Router 的具体内容，所以请随意复制/粘贴所有内容。

👉**将`<Root>`设置为根路由[`element`](../route/route#element)**

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

应用程序现在应该是这个样子了。有个会写 CSS 的设计师真是太好了，不是吗？(谢谢你，吉姆 🙏）。

![img](https://reactrouter.com/_docs/tutorial/01.webp)

## 处理未找到的错误

在项目初期了解应用程序对错误的响应总是一个好主意，因为在创建新应用程序时，我们编写的错误远多于功能！这样不仅能让用户获得良好的体验，还能在开发过程中为您提供帮助。

我们在这个应用程序中添加了一些链接，让我们看看点击这些链接会发生什么？

👉**点击侧边栏中的一个名称**

![默认 React Router 错误元素的屏幕截图](https://reactrouter.com/_docs/tutorial/02.webp)

真恶心！这是 React Router 中默认的错误界面，在本应用中，根元素上的`flex box`样式让它变得更糟😂。

只要您的应用程序在渲染、加载数据或执行数据突变时出现错误，React Router 就会捕获并渲染错误页面。让我们制作自己的错误页面。

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

👉**将`<ErrorPage>`设置为根路由上的[`errorElement`](../route/error-element)**

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

(也没好到哪里去。也许有人忘了让设计者制作错误页面。也许每个人都忘了让设计者制作错误页面，然后责怪设计者没有想到这一点😆）。

请注意，[`useRouteError`](../hooks/use-route-error)提供了抛出的错误信息。当用户导航到不存在的路由时，你会得到一个带有 "Not Found（未找到）"的[错误响应](../utils/is-route-error-response)`statusText` 。在本教程的稍后部分，我们还将看到其他一些错误，并对它们进行更多讨论。

现在，只要知道几乎所有错误都将由该页面处理，而不是无限旋转、无响应页面或空白屏幕，就足够了 🙌。

##  联系人路由用户界面

我们希望在链接到的 URL 上实际呈现一些内容，而不是 404 "未找到 "页面。为此，我们需要新建一个路由。

👉**创建联系人路由模块**

```sh
touch src/routes/contact.jsx
```

👉**添加联系人组件用户界面**

这只是一堆元素，可以随意复制/粘贴。

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

现在我们有了一个组件，让我们把它连接到一个新的路由上。

👉**导入联系人组件并创建新路由**

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

现在，如果我们点击其中一个链接或访问 `/contacts/1` ，就会得到我们的新组件！

![没有父布局的联系路由渲染](https://reactrouter.com/_docs/tutorial/04.webp)

但是，它不在我们的根布局内 😠

## 嵌套路由

我们希望在 `<Root>` 布局中呈现联系人组件，就像这样。

![img](https://reactrouter.com/_docs/tutorial/05.webp)

我们可以将联系路由设为根路由的子路由。

👉**移动联系人路由，使其成为根路由的子路由**

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

现在你将再次看到根布局，但右侧是一个空白页。我们需要告诉根路由在哪里呈现子路由。我们可以通过[`<Outlet>`](../components/outlet)来实现。

找到`<div id="detail">`并在里面放置一个`<Outlet>`。

👉**渲染[`<Outlet>`](../components/outlet)**

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

你可能注意到，也可能没有注意到，当我们点击侧边栏中的链接时，浏览器会对下一个 URL 进行完整的文档请求，而不是使用 React Router。

客户端路由允许我们的应用程序更新 URL，而无需从服务器请求另一个文档。相反，应用程序可以立即呈现新的用户界面。让我们通过[`<Link>`](../components/link)实现这一点。

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

您可以打开浏览器 devtools 中的网络选项卡，查看它是否不再请求文档。

## 加载数据

URL段、布局和数据往往耦合在一起（三合一？）我们已经可以在这个应用程序中看到这一点：

| URL段        | 组件        | 数据         |
| ------------ | ----------- | ------------ |
| /            | `<Root>`    | 通讯录       |
| contacts/:id | `<Contact>` | 个人联系方式 |

由于这种天然的耦合，React Router 具有数据约定，可以轻松地将数据导入路由组件。

我们将使用两个`API`来加载数据，[`loader`](../route/loader)和[`useLoaderData`](../hooks/use-loader-data)。首先，我们将在根模块中创建并导出一个加载器函数，然后将其连接到路由。最后，我们将访问并呈现数据。

👉**从`root.jsx`导出 loader**

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

就是这样！React Router 现在会自动保持数据与用户界面同步。我们还没有任何数据，所以你可能会看到这样一个空白列表：

![img](https://reactrouter.com/_docs/tutorial/06.webp)

## 数据写入 + HTML 表单

稍后我们将创建第一个联系人，但首先让我们来谈谈 HTML。

React Router 将 HTML 表单导航模拟为数据突变原型，符合 JavaScript 大爆发之前的网络开发。它为您提供了客户端呈现应用程序的用户体验功能和 "老式 "网络模型的简洁性。

对于一些网络开发人员来说，HTML 表单并不熟悉，它实际上是在浏览器中进行导航，就像点击链接一样。唯一的区别在于请求：链接只能更改 URL，而表单还可以更改请求方式（GET 与 POST）和请求主体（POST 表单数据）。

果没有客户端路由，浏览器会自动序列化表单数据，并将其作为 POST 的请求正文和 GET 的 URLSearchParams 发送到服务器。React Router 也会做同样的事情，只不过它不是将请求发送到服务器，而是使用客户端路由，并将请求发送到路由[`action`](../route/action)。

我们可以点击应用程序中的 "新建 "按钮来测试一下。由于 Vite 服务器未配置为处理 POST 请求，因此应用程序应该会崩溃（它会发送 404，不过可能应该是 405 🤷）。

![img](https://reactrouter.com/_docs/tutorial/07.webp)

与其向 Vite 服务器发送 POST 来创建新联系人，不如使用客户端路由。

## 创建联系人

我们将在根路由中导出 `action` ，将其连接到路由配置，并将 `<form>` 更改为 React Router[`<Form>`](../components/form)，从而创建新的联系人。

👉**创建操作，并将`<form>`更改为`<Form>`**

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

👉**导入并设置路由上的action**

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

就是这样！点击 "新建 "按钮，你就会看到一条新记录出现在列表中 🥳。

![img](https://reactrouter.com/_docs/tutorial/08.webp)

`createContact` 方法只会创建一个没有姓名、数据或其他任何东西的空联系人。但它还是创建了一条记录，我保证！

> 🧐 等一下...侧边栏是怎么更新的？我们在哪里调用了 `action` ？重新获取数据的代码在哪里？ `useState` 、 `onSubmit` 和 `useEffect` 在哪里？

这就是“老式的 Web”编程模式的体现。正如我们之前所讨论的，[`<Form>`](../components/form)阻止浏览器向服务器发送请求，而是将其发送到路由 `action` 。在 Web 语义中，POST 通常意味着某些数据正在发生变化。按照惯例，React Router 会将此作为提示，在操作完成后自动重新验证页面上的数据。这意味着 `useLoaderData` 钩子会自动更新，用户界面也会自动与数据保持同步！太酷了

## Loaders 中的 URL 参数

👉**点击无名记录**

我们应该又能看到以前的静态联系页面了，但有一点不同：URL 中现在有了记录的真实 ID。

![img](https://reactrouter.com/_docs/tutorial/09.webp)

查看路由配置，路由看起来是这样的:

```jsx
[
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
];
```

请注意 `:contactId` URL 段。冒号 ( `:` ) 具有特殊含义，将其转换为“动态段”。动态段将匹配 URL 该位置上的动态（变化）值，如联系人 ID。我们将 URL 中的这些值称为“URL 参数”，简称 "params"。

这些[`params`](../route/loader#params)将传递给`loader`，其键与动态段匹配。例如，我们的分段名为 `:contactId` ，因此值将作为 `params.contactId` 传递。

这些参数最常用于通过 ID 查找记录。让我们试试看。

👉**在联系人页面添加一个`loader`, 并使用`useLoaderData`访问数据**

`src/routes/contact.jsx`

```jsx
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  // existing code
}
```

👉**在路由上配置`loader`**

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

与创建数据一样，您也可以通过[`Form`](../components/form)更新数据。让我们在 `contacts/:contactId/edit` 创建一个新路由。同样，我们先从组件开始，然后将其连接到路由配置。

👉 **创建编辑组件**

```sh
touch src/routes/edit.jsx
```

👉**添加编辑页面UI**

这些都是我们以前见过的，请随意复制/粘贴：

`src/routes/edit.jsx`

```jsx
import { Form, useLoaderData } from "react-router-dom";

export default function EditContact() {
  const { contact } = useLoaderData();

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

我们希望它在根路由的`outlet`中呈现，因此我们将它设为现有子路由的同级路由。

（你可能会注意到，我们在这条路由中重复使用了 `contactLoader` 。这只是因为我们在教程中偷懒了。没有理由试图在路由之间共享`loader`，它们通常都有自己的`loader`）。

好了，点击 "编辑 "按钮，我们就会看到这个新的用户界面：

![img](https://reactrouter.com/_docs/tutorial/11.webp)

## 使用 FormData 更新联系人

我们刚刚创建的编辑路由已经渲染了一个表单。要更新记录，我们只需为路由连接一个动作。表单将发布到动作，数据将自动重新验证。

👉**为编辑模块中添加操作**

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

填写表格，点击 "保存"，你应该会看到这样的内容！

![img](https://reactrouter.com/_docs/tutorial/12.webp)

## Mutation讨论

> 😑成功了，但我不知道这是怎么回事...

让我们深入了解一下...

打开 `src/routes/edit.jsx` ，查看表单元素。注意它们都有一个名称：

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

如果没有 JavaScript，当提交表单时，浏览器会创建[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)，并在将其发送到服务器时将其设置为请求的正文。如前所述，React Router 可以避免这种情况，而是将请求发送到您的操作，包括[`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。

表单中的每个字段都可以通过 `formData.get(name)` 访问。例如，在上面的输入字段中，您可以这样访问姓和名：

```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
}
```

由于我们有很多表单字段，因此我们使用[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)将它们全部收集到一个对象中，这正是我们的 `updateContact` 函数想要的。

```jsx
const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
```

除了 `action` 之外，我们讨论的这些 API 都不是由 React Router 提供的：[`request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), [`request.formData`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData),[`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)都是由`web`平台提供的。

我们完成动作后，请注意结尾处的[`redirect`](../fetch/redirect)：

`src/routes/edit.jsx`

```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

`loader`和`action`都可以[返回`Response`](../route/loader#returning-responses)（这是有道理的，因为它们都收到了[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)!）。[`redirect`](../fetch/redirect)辅助函数只是为了更方便地返回[`response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)，告诉应用程序更改位置。

如果没有客户端路由，如果服务器在 POST 请求后重定向，新页面将获取最新数据并渲染。正如我们之前所学到的，React 路由器会模拟这种模式，并在执行操作后自动重新验证页面上的数据。这就是为什么当我们保存表单时，侧边栏会自动更新。如果没有客户端路由，就不会有额外的重新验证代码，所以客户端路由也不需要有额外的重新验证代码！

## 将新记录重定向到编辑页面

现在我们知道了如何重定向，让我们更新创建新联系人的操作，使其重定向到编辑页面：

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

现在，当我们点击 "新建 "时，就会进入编辑页面：

![img](https://reactrouter.com/_docs/tutorial/13.webp)

👉**添加些许记录**

我将使用第一届 Remix 大会的演讲嘉宾阵容😁。

![img](https://reactrouter.com/_docs/tutorial/14.webp)

## 活动链接样式

现在我们有了一堆记录，侧边栏上的记录就不清楚了。我们可以使用[`NavLink`](../components/nav-link)来解决这个问题。

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

请注意，我们正在向 `className` 传递一个函数。当用户访问 `NavLink` 中的 URL 时， `isActive` 将为 true。当即将激活时（数据仍在加载中）， `isPending` 将为 true。这样，我们就可以轻松显示用户所在的位置，并对已点击但仍在等待数据加载的链接提供即时反馈。

![img](https://reactrouter.com/_docs/tutorial/15.webp)

## 全局待定用户界面

当用户浏览应用时，React Router 会在为下一页加载数据时*保留旧页面*。您可能已经注意到，当您在列表之间点击时，应用程序感觉有点反应迟钝。让我们为用户提供一些反馈，这样应用程序就不会感觉反应迟钝了。

React Router 在幕后管理所有状态，并揭示构建动态 Web 应用程序所需的状态片段。在本例中，我们将使用[`useNavigation`](../hooks/use-navigation)钩子。

👉**使用`useNavigation`添加全局待定用户界面**

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

[`useNavigation`](../hooks/use-navigation)返回当前导航状态：可以是`"idle" | "submitting" | "loading"`

在我们的案例中，如果我们没有闲置，就会在应用程序的主要部分添加一个 `"loading"` 类。然后，CSS 会在短暂延迟后添加一个漂亮的淡入淡出效果（以避免在快速加载时用户界面闪烁）。当然，你也可以做任何你想做的事，比如在顶部显示一个旋转器或加载条。

![img](https://reactrouter.com/_docs/tutorial/16.webp)

请注意，我们的数据模型 ( `src/contacts.js` ) 具有客户端缓存，因此第二次导航到同一联系人时速度会很快。这种行为不是 React Router，无论您之前是否去过那里，它都会为变化的路由重新加载数据。不过，它确实避免了在导航过程中调用不变路由（如列表）的`loader`。

## 删除记录

如果我们查看一下联系人路由中的代码，就会发现删除按钮看起来是这样的：

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

注意 `action` 指向 `"destroy"` 。与 `<Link to>` 一样， `<Form action>` 也可以取一个相对值。由于表单是在 `contact/:contactId` 中呈现的，因此点击 `destroy` 的相对操作将把表单提交到 `contact/:contactId/destroy` 。

至此，你应该知道了让删除按钮正常工作所需的一切。也许在继续之前可以试一试？你需要：

1. 一条新路由
2. 在那条路由上的`action`
3. `src/contacts.js`中的`deleteContact`

👉**创建 "销毁 "路由模块**

```sh
touch src/routes/destroy.jsx
```

👉**添加销毁操作**

`src/routes/destory.jsx`

```jsx
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

👉**将销毁路由添加到路由配置中**

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

好了，导航到一条记录，点击 "删除 "按钮。这样就可以了！

> 😅 我仍然不明白为什么这一切都可行

当用户点击提交按钮时：

1. `<Form>` 会阻止浏览器向服务器发送新 POST 请求的默认行为，而是通过客户端路由创建一个 POST 请求来模拟浏览器的行为
2. `<Form action="destroy">` 与 `"contacts/:contactId/destroy"` 上的新路由匹配，并向其发送请求
3.  在操作重定向后，React Router 会调用页面上所有数据的`loader`，以获取最新值（这就是 "重新验证"）。 `useLoaderData` 返回新值，并导致组件更新！

添加表单、添加操作，剩下的就交给 React Router 吧。

## 上下文错误

为了好玩，在销毁操作中抛出一个错误：

`src/routes/destory.jsx`

```jsx
export async function action({ params }) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
```

![img](https://reactrouter.com/_docs/tutorial/17.webp)

认识这个屏幕吗？它就是我们之前的[`errorElement`](../route/error-element)。然而，用户除了点击刷新之外，根本无法从这个屏幕中恢复过来。

让我们为销毁路由创建一条上下文错误信息：

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

我们的用户现在有了更多的选择，而不是不停地刷新页面，他们可以继续与页面中没有问题的部分进行交互 🙌

因为销毁路由有自己的`errorElement`，并且是根路由的子路由，因此错误会在这里而不是根路由上呈现。你可能已经注意到了，这些错误会以最近的 `errorElement` 冒泡。只要在根路径上有一个，添加多少都行。

## 索引路由

当我们加载应用程序时，你会发现列表右侧有一个很大的空白页。

![img](https://reactrouter.com/_docs/tutorial/19.webp)

当路由有子路由时，如果你在父路由的路径上， `<Outlet>` 由于没有子路由匹配，所以没有任何内容可以呈现。你可以把索引路由看作是填补这一空白的默认子路由。

👉**创建索引路由模块**

```sh
touch src/routes/index.jsx
```

👉**填入索引组件的元素**

请随意复制粘贴，没什么特别的。

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

注意是[`{ index:true }`](../route/route#index)而不是[`{ path: "" }`](../route/route#path)。这将告诉路由，当用户位于父路由的确切路径时，路由器将匹配并呈现此路由，因此在 `<Outlet>` 中没有其他子路由需要呈现。

![img](https://reactrouter.com/_docs/tutorial/20.webp)

瞧！再也没有空白空间了。在索引路由中放置仪表盘、统计信息、信息源等是很常见的。它们也可以参与数据加载。

## 取消按钮

在编辑页面上，我们有一个取消按钮，但它还没有任何作用。我们希望它的功能与浏览器的返回按钮相同。

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

export default function EditContact() {
  const { contact } = useLoaderData();
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

现在，当用户点击 "取消 "时，他们将返回浏览器历史记录中的一个条目。

> 🧐 为什么按钮上没有`event.preventDefault`？

`<button type="button">` 虽然看似多余，却是防止按钮提交表单的 HTML 方法。

还有两个功能。我们已进入最后冲刺阶段！

## URL 搜索参数和 GET 提交

迄今为止，我们所有的交互式用户界面要么是改变 URL 的链接，要么是向操作发布数据的表单。搜索栏很有趣，因为它是两者的混合体：它是一个表单，但只改变 URL，不改变数据。

现在它只是一个普通的 HTML `<form>` ，而不是 React Router `<Form>` 。让我们看看浏览器在默认情况下是如何处理它的：

👉**在搜索框中输入名称，然后按回车键**

注意，浏览器的 URL 中现在包含了您的查询，即 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：

```bash
http://127.0.0.1:5173/?q=ryan
```

如果我们查看一下搜索表单，它看起来是这样的：

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

正如我们之前所见，浏览器可以通过输入元素的 `name` 属性对表单进行序列化。该输入元素的名称是 `q` ，因此 URL 中有 `?q=` 。如果我们将其命名为 `search` ，URL 将是 `?search=` 。

请注意，这个表单与我们使用过的其他表单不同，它没有 `<form method="post">` 。默认的 `method` 是 `"get"` 。这意味着当浏览器为下一个文档创建请求时，不会将表单数据放入请求的 POST 主体中，而是放入 GET 请求的[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)中。

## 使用客户端路由的 GET 提交

让我们使用客户端路由来提交此表单并在现有的加载器中过滤列表。

👉**将`<form>`更改为`<Form>`**

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

👉**如果存在`URLSearchParams`，则过滤列表**

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

因为这是 GET 而不是 POST，所以 React Router 不会调用 `action` 。提交 GET 表单与点击链接一样：只是 URL 发生了变化。这就是为什么我们添加的用于过滤的代码在 `loader` 中，而不是在此路由的 `action` 中。

这也意味着这是一个正常的页面导航。您可以点击返回按钮，回到原来的位置。

## 将 URL 同步到表单状态

这里有几个用户体验问题，我们可以很快解决。

1. 如果您在搜索后点击返回，虽然列表已不再过滤，但表单字段仍保留您输入的值。
2. 如果在搜索后刷新页面，表单字段中就不再有值，即使列表已被过滤

换句话说，URL 和我们的表单状态不同步。

👉**从你的`loader`中返回 `q` 并将其设置为搜索字段的默认值**

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

这就解决了问题（2）。现在刷新页面，输入框就会显示查询结果。

![img](https://reactrouter.com/_docs/tutorial/21.webp)

现在是问题（1），点击返回按钮并更新输入。我们可以从 React 中引入 `useEffect` ，直接在 DOM 中操作表单的状态。

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

> 🤔 您不应该使用受控组件和 React State 来实现这一点吗？

您当然可以将其作为一个受控组件来使用，但同样的行为最终会变得更加复杂。URL 并不是由你来控制的，而是由用户通过后退/前进按钮来控制的。受控组件的同步点更多。

请注意，现在控制输入需要三个同步点，而不是一个。行为相同，但代码更复杂了。

`src/routes/root.jsx`

```jsx
import { useEffect, useState } from "react";
// existing code

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
}

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

在这里，我们需要做出一个产品决策。对于这个用户界面，我们可能更倾向于在每次按键时进行过滤，而不是在明确提交表单时。

我们已经看到了 `useNavigate` ，因此我们将使用它的表亲[`useSubmit`](../hooks/use-submit) 。

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

现在，当你输入时，表格就会自动提交！

注意[`submit`](../hooks/use-submit)的参数。们传递的是 `event.currentTarget.form` 。 `currentTarget` 是事件所连接的 DOM 节点，而 `currentTarget.form` 是输入的父表单节点。 `submit` 函数将序列化并提交您传递给它的任何表单。

## 添加搜索旋转器

在生产应用程序中，这种搜索很可能要查找数据库中的记录，而数据库太大，无法一次性全部发送并在客户端进行过滤。这就是为什么这个演示有一些伪造的网络延迟。

在没有任何加载指示器的情况下，搜索感觉有点迟钝。即使我们能让数据库变得更快，但用户的网络延迟始终是我们无法控制的。为了获得更好的用户体验，让我们为搜索添加一些即时的用户界面反馈。为此，我们将再次使用[`useNavigation`](../hooks/use-navigation)。

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

当应用程序正在导航到一个新的 URL 并为其加载数据时， `navigation.location` 就会显示出来。当没有待定导航时，它就会消失。

## 管理历史堆栈

如果我们输入 "seba "字符，然后用退格键删除它们，那么堆栈中就会出现 7 个新条目😂。我们肯定不希望出现这种情况

![img](https://reactrouter.com/_docs/tutorial/23.webp)

我我们可以用下一页*替换*历史堆栈中的当前条目，而不是推入下一页，从而避免这种情况。

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

我们只想替换搜索结果，而不是开始搜索前的页面，因此我们要快速检查这是否是第一次搜索，然后决定替换。

每次按键都不再创建新条目，因此用户可以点击退出搜索结果，而无需点击 7 次😅。

## 不使用导航的突变

到目前为止，我们所有的突变（更改数据）都是使用表单导航，在历史堆栈中创建新条目。虽然这些用户流程很常见，但想要在不引起导航的情况下更改数据也同样常见。

针对这些情况，我们有[`useFetcher`](../hooks/use-fetcher)钩子。它允许我们与`loaders`和`actions`进行通信，而不会导致导航。

联系人页面上的★按钮就可以实现这一点。我们不是要创建或删除新记录，也不是要更改页面，我们只是要更改我们正在查看的页面上的数据。

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

在这里，我们不妨看一下这个表单。与往常一样，我们的表单中的字段带有 `name`属性。该表单将发送带有 `favorite` 关键字的 [`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) ，该关键字是 `"true" | "false"` 。既然有 `method="post"` ，它就会调用操作。由于没有 `<fetcher.Form action="...">` 属性，它将发布到渲染表单的路由。

👉**创建 action**

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

非常简单。从请求中提取表单数据并将其发送到数据模型。

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

好了，我们可以点击用户名旁边的星星了！

![img](https://reactrouter.com/_docs/tutorial/24.webp)

请看，两颗星都会自动更新。我们的新 `<fetcher.Form method="post">` 与我们一直使用的 `<Form>` 几乎一模一样：它会调用操作，然后自动重新验证所有数据--即使是错误也会以同样的方式被捕获。

但有一个关键区别，它不是导航--URL 不会改变，历史堆栈也不受影响。

## 优化的用户界面

你可能注意到了，当我们点击上一节中的收藏按钮时，应用程序感觉有点反应迟钝。我们再次添加了一些网络延迟，因为在现实世界中会出现这种情况！

为了给用户提供一些反馈，我们可以通过[`fetcher.state`](../hooks/use-fetcher#fetcherstate)让星形进入加载状态（很像之前的 `navigation.state` ），但这次我们可以做得更好。我们可以使用一种名为 "优化用户界面 "的策略

`fetcher`知道提交给操作的表单数据，因此可以在 `fetcher.formData` 上获取这些数据。我们将利用这些数据立即更新星形的状态，即使网络尚未结束。如果更新最终失败，用户界面将恢复为真实数据。

👉**从`fetcher.formData`中读取优化值**

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

如果你现在点击按钮，就会看到星形*立即*变成新的状态。我们不会一直呈现实际数据，而是会检查取件器是否有任何 `formData` 正在提交，如果有，我们就会使用它。当操作完成后， `fetcher.formData` 将不再存在，我们将重新使用实际数据。因此，即使您在优化用户界面代码中编写了错误，它最终也会回到正确的状态 🥹

## 未找到数据

如果我们要加载的联系人不存在，会发生什么情况？

![img](https://reactrouter.com/_docs/tutorial/25.webp)

当我们尝试呈现 `null` 联系信息时，我们的根[`errorElement`](../route/error-element)正在捕捉这个意外错误。很好，错误得到了妥善处理，但我们可以做得更好！

只要在`loader`或`action`中出现预期的错误情形（如数据不存在），就可以 `throw` 。调用堆栈会中断，React Router 会捕获它，然后渲染错误路径。我们甚至不会尝试呈现 `null` 联系人。

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
  return { contact };
}
```

![img](https://reactrouter.com/_docs/tutorial/27.webp)

与使用 `Cannot read properties of null` 时出现的渲染错误相反，我们完全避开了组件，而是渲染错误路径，告诉用户一些更具体的信息。

这样就能让你的路径保持愉悦。您的路径元素无需关心错误和加载状态。

## 无路径路由

最后一件事。我们看到的最后一个错误页面如果能在根出口中呈现会更好，而不是整个页面。事实上，我们所有子路由中的每个错误都最好在出口中呈现，这样用户就有更多的选择，而不是点击刷新。

我们希望它看起来像这样：

![img](https://reactrouter.com/_docs/tutorial/26.webp)

我们可以在每一个子路由中添加错误元素，但由于都是同一个错误页面，因此不建议这样做。

还有一种更简洁的方法。路由可以在*没有*路径的情况下使用，这样它们就可以参与用户界面布局，而不需要在 URL 中添加新的路径段。看看吧:

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

当子路由出现任何错误时，我们的新无路径路由会捕捉并呈现错误，同时保留根路由的用户界面！

## JSX 路由

至于我们的最后一招，很多人喜欢用 JSX 配置路由。您可以使用 `createRoutesFromElements` 来做到这一点。在配置路由时，JSX 和对象在功能上没有区别，这只是一种风格上的偏好。

```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
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

就是这样！感谢您试用 React Router。希望本教程能为您构建出色的用户体验提供一个坚实的开端。React Router 还有很多功能，请务必查看所有 API 😀。