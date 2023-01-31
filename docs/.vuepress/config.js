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
                path: '/router-components/browser-router',
                collapsable: false,
                children: [
                    {
                        title: 'BrowserRouter',
                        path: '/router-components/browser-router'
                    },
                    {
                        title: 'HashRouter',
                        path: '/router-components/hash-router'
                    },
                    {
                        title: 'MemoryRouter',
                        path: '/router-components/memory-router'
                    },
                    {
                        title: 'NativeRouter',
                        path: '/router-components/native-router'
                    },
                    {
                        title: 'router',
                        path: '/router-components/router'
                    },
                    {
                        title: 'StaticRouter',
                        path: '/router-components/static-router'
                    }
                ]
            },
            {
                title: 'route',
                path: '/route/route',
                collapsable: false,
                children: [
                    {
                        title: 'Route',
                        path: '/route/route'
                    },
                    {
                        title: 'action',
                        path: '/route/action'
                    },
                    {
                        title: 'errorElement',
                        path: '/route/error-element'
                    },
                    {
                        title: 'Loader',
                        path: '/route/loader'
                    },
                    {
                        title: 'shouldRevalidate',
                        path: '/route/should-revalidate'
                    }
                ]
            },
            {
                title: '组件',
                path: '/components/await',
                collapsable: false,
                children: [
                    {
                        title: 'Await',
                        path: '/components/await'
                    },
                    {
                        title: 'Form',
                        path: '/components/form'
                    },
                    {
                        title: 'Link',
                        path: '/components/link'
                    },
                    {
                        title: 'Link(RN)',
                        path: '/components/link-native'
                    },
                    {
                        title: 'NavLink',
                        path: '/components/nav-link'
                    },
                    {
                        title: 'Navigate',
                        path: '/components/navigate'
                    },
                    {
                        title: 'Outlet',
                        path: '/components/outlet'
                    },
                    {
                        title: 'Route',
                        path: '/components/route'
                    },
                    {
                        title: 'Routes',
                        path: '/components/routes'
                    },
                    {
                        title: 'ScrollRestoration',
                        path: '/components/scroll-restoration'
                    }
                ]
            },
        ],
        lastUpdated: '上次更新时间',
        docsRepo: 'baimingxuan/react-router6-doc',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页'
    }
}
