#  为 React 路由器做贡献

感谢您的贡献，你摇滚！

谈到开源，可以做出许多不同类型的贡献，所有这些都是有价值的。这里有一些指南可以帮助您准备您的贡献。

## 设置

在您可以为代码库做出贡献之前，您需要分叉回购协议。根据您所做的贡献类型，这看起来会有所不同：

- 所有新功能、错误修复或**任何涉及`react-router`代码**的内容都应该从分支中分离出来并合并到`dev`分支中
- 仅涉及文档的更改可以从分支中分支出来并合并到`main`分支中

以下步骤将让您设置为对此 repo 贡献更改：

1. 分叉回购（单击[此页面](https://github.com/remix-run/react-router)Fork右上角的按钮）
2. 在本地克隆你的叉子

```bash
# in a terminal, cd to parent directory where you want your clone to be, then
git clone https://github.com/<your_github_username>/react-router.git
cd react-router

# if you are making *any* code changes, make sure to checkout the dev branch
git checkout dev
```

1. 安装依赖项并构建。React Router 使用[`yarn`(version 1)](https://classic.yarnpkg.com/lang/en/docs/install)，所以你也应该使用。如果使用安装，将生成`npm`不必要的文件。`package-lock.json`

## 认为您发现了错误？

请遵循问题模板并提供清晰的重现路径和代码示例。最好是测试失败的拉取请求。下一个最好的是指向说明错误的 CodeSandbox 或存储库的链接。

## 提议新的或更改的 API？

请提供深思熟虑的评论和一些示例代码，以显示您希望在您的应用程序中使用 React Router 做什么。如果您能先向我们展示您如何受到当前 API 的限制，然后再得出需要更改和/或添加的内容的结论，这将有助于对话。

我们从经验中了解到，小型 API 通常更好，因此我们可能不太愿意添加新内容，除非当前 API 有明显的限制。话虽这么说，我们总是急于听到我们以前没有考虑过的案例，所以请不要害羞！:)

## 问题没有引起注意？

如果你需要修复一个 bug 而没有人修复它，你最好的办法是为它提供一个修复并提出一个[pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)。开源代码属于我们所有人，推动它向前发展是我们所有人的责任。

## 发出拉取请求？

合并请求只需要两个或更多协作者的批准即可；当 PR 作者是合作者时，这算作一个。

在 GitHub 中创建 PR 时，请确保将基础设置为正确的分支。如果您提交的 PR 涉及任何代码，那么这应该是`dev`分支。在使用“比较更改”标题下方的下拉菜单创作 PR 时，您在 GitHub 中设置了基础：![img](https://raw.githubusercontent.com/remix-run/react-router/main/static/base-branch.png)

### 测试

所有修复错误或添加功能的提交都需要测试。

```
<blink>`不要在没有测试的情况下合并代码！`</blink>
```

### 文档+示例

所有更改或添加到 API 的提交都必须在拉取请求中完成，同时更新所有相关示例和文档。

## 发展

### 套餐

React Router 使用 monorepo 来托管多个包的代码。这些包位于`packages`目录中。

我们使用[Yarn 工作区](https://classic.yarnpkg.com/en/docs/workspaces/)来管理依赖项的安装和运行各种脚本。要安装所有内容，请确保安装了[Yarn（版本 1）](https://classic.yarnpkg.com/lang/en/docs/install)，然后从存储库根目录运行`yarn`或。`yarn install`

### 建筑

从根目录调用`yarn build`将运行构建，这应该只需要几秒钟。将所有包构建在一起很重要，因为`react-router-dom`它们`react-router-native`都`react-router`用作依赖项。

### 测试

在运行测试之前，您需要运行构建。构建后，`yarn test`从根目录运行将运行**每个**包的测试。如果要为特定包运行测试，请使用`yarn test --projects packages/<package-name>`：

```bash
# Test all packages
yarn test

# Test only react-router-dom
yarn test --projects packages/react-router-dom
```

## 存储库分支

这个 repo 为不同的目的维护单独的分支。它们看起来像这样：

```
- main   > the most recent release and current docs
- dev    > code under active development between stable releases
- v5     > the most recent code for a specific major release
```

可能还有其他分支用于各种功能和实验，但所有的魔法都发生在这些分支上。

## 新版本

当需要削减新版本时，我们会根据版本类型遵循基于分支策略的流程。

### `react-router@next`发布

我们从`dev`分支的当前状态创建实验版本。可以使用`@next`标签安装它们：

```bash
yarn add react-router-dom@next
# or
npm install react-router-dom@next
```

`dev`当 PR 合并到分支中时，这些发布将自动进行。

### 最新主要版本

```bash
# Start from the dev branch.
git checkout dev

# Merge the main branch into dev to ensure that any hotfixes and
# docs updates are available in the release.
git merge main

# Create a new release branch from dev.
git checkout -b release/v6.1.0

# Create a new tag and update version references throughout the
# codebase.
yarn run version minor # | "patch" | "major"

# Push the release branch along with the new release tag.
git push origin release/v6.1.0 --follow-tags

# Wait for GitHub actions to run all tests. If the tests pass, the
# release is ready to go! Merge the release branch into main and dev.
git checkout main
git merge release/v6.1.0
git checkout dev
git merge release/v6.1.0

# The release branch can now be deleted.
git branch -D release/v6.1.0
git push origin --delete release/v6.1.0

# Now go to GitHub and create the release from the new tag. Let
# GitHub Actions take care of the rest!
```

### 热修复版本

有时我们有一个关键的错误需要立即修补。如果 bug 影响到最新版本，我们可以直接从`main`（或存在 bug 的相关主要发布分支）创建一个新版本：

```bash
# From the main branch, make sure to run the build and all tests
# before creating a new release.
yarn && yarn build && yarn test

# Assuming the tests pass, create the release tag and update
# version references throughout the codebase.
yarn run version patch

# Push changes along with the new release tag.
git push origin main --follow-tags

# In GitHub, create the release from the new tag and it will be
# published via GitHub actions

# When the hot-fix is done, merge the changes into dev and clean
# up conflicts as needed.
git checkout dev
git merge main
git push origin dev
```