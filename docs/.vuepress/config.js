module.exports = {
    title: 'React Router6 中文文档',
    description: '文档内容详细翻译自官方英文文档',
    base: '/react-router6-doc/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        nav: [
            {
                text: 'GitHub',
                link: 'https://github.com/baimingxuan/react-router6-doc'
            }
        ],
        sidebar: [
            {
                title: '快速上手',
                path: '/start/overview',
                collapsable: false,
                children: [
                    {
                        title: '功能概述',
                        path: '/start/overview'
                    },
                    {
                        title: '教程',
                        path: '/start/tutorial'
                    },
                    {
                        title: '常见问题',
                        path: '/start/faqs'
                    },
                    {
                        title: '核心概念',
                        path: '/start/concepts'
                    }
                ]
            }
        ],
        lastUpdated: '上次更新时间',
        docsRepo: 'baimingxuan/react-router6-doc',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页'
    }
}
