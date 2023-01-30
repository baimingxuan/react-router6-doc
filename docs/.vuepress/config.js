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
            },
            {
                title: 'Router',
                path: '/router/picking-a-router',
                collapsable: false,
                children: [
                    {
                        title: '选择Router',
                        path: '/router/picking-a-router'
                    },
                    {
                        title: 'createBrowserRouter',
                        path: '/router/create-browser-router'
                    },
                    {
                        title: 'createHashRouter',
                        path: '/router/create-hash-router'
                    },
                    {
                        title: 'createMemoryRouter',
                        path: '/router/create-memory-router'
                    },
                    {
                        title: 'RouterProvider',
                        path: '/router/router-provider'
                    }
                ]
            },
            {
                title: 'Router组件',
                path: '/components/browser-router',
                collapsable: false,
                children: [
                    {
                        title: 'BrowserRouter',
                        path: '/components/browser-router'
                    },
                    {
                        title: 'HashRouter',
                        path: '/components/hash-router'
                    },
                    {
                        title: 'MemoryRouter',
                        path: '/components/memory-router'
                    },
                    {
                        title: 'NativeRouter',
                        path: '/components/native-router'
                    },
                    {
                        title: 'router',
                        path: '/components/router'
                    },
                    {
                        title: 'StaticRouter',
                        path: '/components/static-router'
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
