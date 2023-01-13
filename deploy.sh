#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包生成静态文件
yarn run build

# 进入生成的文件夹
cd docs/.vitepress/dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

# 如果发布到github仓库
git push -f https://github.com/baimingxuan/react-router6-doc.git master:gh-pages

cd -
