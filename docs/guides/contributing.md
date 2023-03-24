#  为 React Router做出贡献

感谢您的贡献，您很棒！

在开源方面，可以进行许多不同类型的贡献，所有这些贡献都是有价值的。以下是一些指南，应该帮助您准备好贡献。

## Setup

在您可以为代码库做出贡献之前，您需要fork该repo。这将根据您所做的贡献类型而有所不同：

- 所有新功能、错误修复或**任何涉及 `react-router` 代码**的内容都应该从 `dev` 分支分支并合并
- 仅涉及文档的更改可以从 `main` 分支分支并合并

以下步骤将使您准备好为此repo做出修改的贡献：

1. Fork该repo（单击[此页面](https://github.com/remix-run/react-router)右上角的Fork按钮）
2. 克隆您的分支到本地

```bash
# in a terminal, cd to parent directory where you want your clone to be, then
git clone https://github.com/<your_github_username>/react-router.git
cd react-router

# if you are making *any* code changes, make sure to checkout the dev branch
git checkout dev
```

1. 安装依赖项构建。React Router 使用[`yarn`(版本1)](https://classic.yarnpkg.com/lang/en/docs/install)，因此您也应该使用它。如果您使用 `npm` 安装，将生成不必要的 `package-lock.json` 文件。

## 认为您发现了错误？

请遵守问题模板并提供清晰的复现路径和代码示例。最好的方法是使用失败的测试提交拉取请求。其次是提供指向 CodeSandbox 或说明问题的存储库的链接。

## 提议新的或更改的 API？

请提供有思想的评论和一些示例代码，展示您想在应用程序中如何使用 React Router。如果您可以先展示当前 API 限制您的方式，那么这将有助于对话。在跳到关于需要更改和/或添加什么的结论之前，了解当前 API 的限制有助于对话。

我们通过经验学到，小型 API 通常更好，因此我们可能会有点不愿意添加新内容，除非当前 API 明显存在限制。话虽如此，我们总是渴望听到我们以前没有考虑过的情况，所以请不要害羞！ :)

## 问题没有得到关注？

如果您需要修复错误，而没有人修复它，您最好的选择是提供修复并发起[pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)。开源代码属于我们所有人，我们有责任推动它向前发展。

## 如何发起Pull Request？

只需要两个或更多协作者的批准即可合并 Pull Request；当 PR 作者是协作者时，这算作一个。

> 在 GitHub 中创建 PR 时，请确保将基础设置为正确的分支。如果您提交的 PR 涉及任何代码，则应该是 `dev` 分支。在 PR 作者下拉菜单下的“比较更改”标题下，您可以在 GitHub 中设置基础：![img](https://raw.githubusercontent.com/remix-run/react-router/main/static/base-branch.png)
>

### 测试

所有修复错误或添加功能的提交都需要测试。

<blink>` 不要在没有测试的情况下合并代码！ `</blink>

### 文档+示例

所有更改或添加 API 的提交必须在一个 Pull Request 中完成，该 Pull Request 还更新了所有相关示例和文档。

## Development

### Packages

React Router 使用单一存储库来托管多个软件包的代码。这些软件包位于 `packages` 目录中。

我们使用[Yarn 工作区来管理依赖项的安装和运行各种脚本。为了安装所有内容，请确保您已安装[Yarn(版本1)](https://classic.yarnpkg.com/lang/en/docs/install)，然后从存储库根目录运行 `yarn` 或 `yarn install` 。

### 构建

从根目录调用 `yarn build` 将运行构建，这应该只需要几秒钟。重要的是要一起构建所有软件包，因为 `react-router-dom` 和 `react-router-native` 都使用 `react-router` 作为依赖项。

### 测试

在运行测试之前，您需要运行构建。构建后，从根目录运行 `yarn test` 将运行每个软件包的测试。如果要运行特定软件包的测试，请使用 `yarn test --projects packages/<package-name>` ：

```bash
# Test all packages
yarn test

# Test only react-router-dom
yarn test --projects packages/react-router-dom
```

## 仓库分支

此存储库维护不同用途的单独分支。它们看起来像这样：

```bash
- main   > the most recent release and current docs
- dev    > code under active development between stable releases
- v5     > the most recent code for a specific major release
```

可能会有其他分支用于各种功能和实验，但所有魔法都发生在这些分支中。

## 新版本

当到了发布新版本的时候，我们会根据我们的分支策略遵循一个基于流程。

### `react-router@next`发布

我们从当前 `dev` 分支的状态创建实验性发布。它们可以通过使用 `@next` 标签进行安装：

```bash
yarn add react-router-dom@next
# or
npm install react-router-dom@next
```

这些发布将自动化，因为PR合并到 `dev` 分支中。

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

有时我们有一个关键的错误需要立即修补。如果该错误影响到最新版本，则可以直接从 `main` （或存在错误的相关主要版本分支）创建新版本：

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