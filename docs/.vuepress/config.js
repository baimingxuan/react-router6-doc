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
                        title: '主要概念',
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
            {
                title: '钩子函数',
                path: '/hooks/use-action-data',
                collapsable: false,
                children: [
                    {
                        title: 'useActionData',
                        path: '/hooks/use-action-data'
                    },
                    {
                        title: 'useAsyncError',
                        path: '/hooks/use-async-error'
                    },
                    {
                        title: 'useAsyncValue',
                        path: '/hooks/use-async-value'
                    },
                    {
                        title: 'useBeforeUnload',
                        path: '/hooks/use-before-unload'
                    },
                    {
                        title: 'useFetcher',
                        path: '/hooks/use-fetcher'
                    },
                    {
                        title: 'useFetchers',
                        path: '/hooks/use-fetchers'
                    },
                    {
                        title: 'useFormAction',
                        path: '/hooks/use-form-action'
                    },{
                        title: 'useHref',
                        path: '/hooks/use-href'
                    },
                    {
                        title: 'useInRouterContext',
                        path: '/hooks/use-in-router-context'
                    },
                    {
                        title: 'useLinkClickHandler',
                        path: '/hooks/use-link-click-handler'
                    },
                    {
                        title: 'useLinkPressHandler',
                        path: '/hooks/use-link-press-handler'
                    },
                    {
                        title: 'useLoaderData',
                        path: '/hooks/use-loader-data'
                    },
                    {
                        title: 'useLocation',
                        path: '/hooks/use-location'
                    },
                    {
                        title: 'useMatch',
                        path: '/hooks/use-match'
                    },
                    {
                        title: 'useMatches',
                        path: '/hooks/use-matches'
                    },
                    {
                        title: 'useNavigate',
                        path: '/hooks/use-navigate'
                    },
                    {
                        title: 'useNavigation',
                        path: '/hooks/use-navigation'
                    },
                    {
                        title: 'useNavigationType',
                        path: '/hooks/use-navigation-type'
                    },
                    {
                        title: 'useOutlet',
                        path: '/hooks/use-outlet'
                    },
                    {
                        title: 'useOutletContext',
                        path: '/hooks/use-outlet-context'
                    },
                    {
                        title: 'useParams',
                        path: '/hooks/use-params'
                    },
                    {
                        title: 'useResolvedPath',
                        path: '/hooks/use-resolved-path'
                    },
                    {
                        title: 'useRevalidator',
                        path: '/hooks/use-revalidator'
                    },
                    {
                        title: 'useRouteError',
                        path: '/hooks/use-route-error'
                    },
                    {
                        title: 'useRouteLoaderData',
                        path: '/hooks/use-route-loader-data'
                    },
                    {
                        title: 'useRoutes',
                        path: '/hooks/use-routes'
                    },
                    {
                        title: 'useSearchParams',
                        path: '/hooks/use-search-params'
                    },
                    {
                        title: 'useSearchParams(RN)',
                        path: '/hooks/use-search-params-rn'
                    },
                    {
                        title: 'useSubmit',
                        path: '/hooks/use-submit'
                    }
                ]
            },
            {
                title: 'Fetch工具类',
                path: '/fetch/json',
                collapsable: false,
                children: [
                    {
                        title: 'json',
                        path: '/fetch/json'
                    },
                    {
                        title: 'redirect',
                        path: '/fetch/redirect'
                    }
                ]
            },
            {
                title: '工具类',
                path: '/utils/create-routes-from-children',
                collapsable: false,
                children: [
                    {
                        title: 'createRoutesFromChildren',
                        path: '/utils/create-routes-from-children'
                    },
                    {
                        title: 'createRoutesFromElements',
                        path: '/utils/create-routes-from-elements'
                    },
                    {
                        title: 'createSearchParams',
                        path: '/utils/create-search-params'
                    },
                    {
                        title: 'defer',
                        path: '/utils/defer'
                    },
                    {
                        title: 'generatePath',
                        path: '/utils/generate-path'
                    },
                     {
                        title: 'isRouteErrorResponse',
                        path: '/utils/is-route-error-response'
                    },
                    {
                        title: 'Location',
                        path: '/utils/location'
                    },
                    {
                        title: 'matchPath',
                        path: '/utils/match-path'
                    },
                     {
                        title: 'matchRoutes',
                        path: '/utils/match-routes'
                    },
                    {
                        title: 'renderMatches',
                        path: '/utils/render-matches'
                    },
                    {
                        title: 'resolvePath',
                        path: '/utils/resolve-path'
                    }
                ]
            },
            {
                title: '指南',
                path: '/guides/ssr',
                collapsable: false,
                children: [
                    {
                        title: '服务端渲染',
                        path: '/guides/ssr'
                    },
                    {
                        title: '贡献',
                        path: '/guides/contributing'
                    },
                    {
                        title: '数据库整合',
                        path: '/guides/data-libs'
                    },
                    {
                        title: '延迟数据',
                        path: '/guides/deferred'
                    },
                    {
                        title: '使用FormData',
                        path: '/guides/form-data'
                    },
                    {
                        title: '索引查询参数',
                        path: '/guides/index-search-param'
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
