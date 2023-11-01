#  为 React Router做出贡献

感谢您的贡献，您太棒了！

说到开放源代码，可以做出许多不同类型的贡献，所有这些贡献都很有价值。以下是一些指导原则，希望对您准备贡献有所帮助。

## Setup

在为代码库做出贡献之前，您需要 fork 代码库。根据您的贡献类型，这一点会有所不同：

- 所有新功能、错误修复或**任何涉及 `react-router` 代码**的内容都应从 `dev` 分支中分离出来，并合并到 `dev` 分支中。
- 只涉及文档的改动可以从 `main` 分支出来，合并到 `main` 分支中。

以下步骤将帮助您设置好如何向该版本库贡献更改：

1. `Fork`这个`repo`（点击[本页面](https://github.com/remix-run/react-router)右上角的`Fork`按钮）
2. 克隆您的分支到本地

```bash
# in a terminal, cd to parent directory where you want your clone to be, then
git clone https://github.com/<your_github_username>/react-router.git
cd react-router

# if you are making *any* code changes, make sure to checkout the dev branch
git checkout dev
```

3. 安装依赖项并构建。React Router 使用[`yarn`(版本1)](https://classic.yarnpkg.com/lang/en/docs/install)，所以你也应该这样做。如果使用 `npm` 安装，则会生成不必要的 `package-lock.json` 文件。

## 您认为找到了错误？

请遵守问题模板，并通过代码示例提供明确的重现路径。最好是带有失败测试的`pull`请求。其次是 CodeSandbox 或说明错误的版本库链接。

## 添加示例？

示例可直接添加到主分支中。在本地克隆的主分支上创建一个分支。完成后，创建一个拉取请求并概述你的示例。

## 提出新的或更改后的 API？

请提供深思熟虑的评论和一些示例代码，说明您想在应用程序中使用 React Router 做什么。如果您能在得出需要更改和/或添加什么的结论之前，先向我们展示您是如何受限于当前的 API 的，这将有助于对话的进行。

我们的经验告诉我们，小的应用程序接口通常更好，因此我们可能不太愿意添加新内容，除非当前的应用程序接口存在明显的限制。尽管如此，我们还是非常希望听到一些我们以前没有考虑过的情况，所以请不要害羞！ :)

## 问题没有得到关注？

如果你需要修复一个错误，但没有人在修复它，你最好的办法就是提供一个修复程序，并提出[pull 请求](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)。开放源代码属于我们所有人，推动它向前发展是我们所有人的责任。

## 发起Pull 请求？

`pull`请求只需得到两个或两个以上合作者的批准即可合并；当 PR 作者是合作者时，也算一个合作者。

> IMPORTANT
>
> 在 GitHub 创建 PR 时，请确保将基本分支设置为正确的分支。如果您提交的 PR 涉及到任何代码，那么它应该是 `dev` 分支。在 GitHub 上创建 PR 时，可通过 "比较更改 "标题下的下拉菜单来设置基准分支：![img](https://raw.githubusercontent.com/remix-run/react-router/main/static/base-branch.png)

### 测试

所有修复错误或添加功能的提交都需要测试。

不要合并未经测试的代码！ 

### 文档+示例

所有更改或添加 API 的提交都必须在拉取请求中完成，同时更新所有相关示例和文档。

## 开发

### Packages

React Router 使用 monorepo 来托管多个软件包的代码。这些软件包位于 `packages` 目录中。

我们使用[ Yarn 工作区](https://classic.yarnpkg.com/en/docs/workspaces/)来管理依赖项的安装和各种脚本的运行。要安装所有脚本，请确保已安装[Yarn(版本1)](https://classic.yarnpkg.com/lang/en/docs/install)，然后从 repo 根目录运行 `yarn` 或 `yarn install` 。

### 构建

从根目录调用 `yarn build` 将运行编译，整个过程只需几秒钟。由于 `react-router-dom` 和 `react-router-native` 都使用 `react-router` 作为依赖关系，因此必须一起构建所有软件包。

### 测试

在运行测试之前，您需要运行构建。构建后，从根目录运行 `yarn test` 将运行每个软件包的测试。如果要运行特定软件包的测试，请使用 `yarn test --projects packages/<package-name>` ：

```bash
# Test all packages
yarn test

# Test only react-router-dom
yarn test --projects packages/react-router-dom
```

## 仓库分支

该 repo 为不同的目的维护不同的分支。它们看起来是这样的：

```bash
- main   > the most recent release and current docs
- dev    > code under active development between stable releases
- v5     > the most recent code for a specific major release
```

可能还有其他分支用于各种功能和实验，但所有神奇的事情都发生在这些分支中。

## 新版本发布

当需要发布新版本时，我们会根据不同类型的版本，按照分支策略制定相应的流程。

### `react-router@next`发布

我们根据 `dev` 分支的当前状态创建实验版本。您可以使用 `@next` 标签安装它们：

```bash
yarn add react-router-dom@next
# or
npm install react-router-dom@next
```

当 PR 合并到 `dev` 分支时，这些版本将自动发布。

### 最新主要版本发布

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

### 热修复发布

有时，我们会遇到需要立即修补的关键错误。如果错误影响到最新版本，我们可以直接从 `main` （或存在错误的相关主要版本分支）创建一个新版本：

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