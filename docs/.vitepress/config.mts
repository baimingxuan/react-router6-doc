import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'React Router6 中文文档',
  description: '文档内容详细翻译自官方英文文档',
  base: '/react-router6-doc/',
  head: [['link', { rel: 'icon', href: '/.vitepress/logo/favicon.ico' }]],
  themeConfig: {

    logo: {
      light: '/.vitepress/logo/logo.svg',
      dark: '/.vitepress/logo/logo_dark.svg'
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/start/overview' }
    ],

    sidebar: [
      {
        text: '快速上手',
        collapsed: false,
        items: [
          {
            text: '功能概述',
            link: '/start/overview'
          },
          {
            text: '教程',
            link: '/start/tutorial'
          },
          {
            text: '常见问题',
            link: '/start/faqs'
          },
          {
            text: '主要概念',
            link: '/start/concepts'
          }
        ]
      },
      {
        text: '升级',
        collapsed: false,
        items: [
          {
            text: '迁移到RouterProvider',
            link: '/upgrading/v6-data'
          },
          {
            text: '从v5升级',
            link: '/upgrading/v5'
          },
          {
            text: '从@reach/router迁移',
            link: '/upgrading/reach'
          }
        ]
      },
      {
        text: 'Router',
        collapsed: false,
        items: [
          {
            text: '选择Router',
            link: '/router/picking-a-router'
          },
          {
            text: 'createBrowserRouter',
            link: '/router/create-browser-router'
          },
          {
            text: 'createHashRouter',
            link: '/router/create-hash-router'
          },
          {
            text: 'createMemoryRouter',
            link: '/router/create-memory-router'
          },
          {
            text: 'createStaticHandler',
            link: '/router/create-static-handler'
          },
          {
            text: 'createStaticRouter',
            link: '/router/create-static-router'
          },
          {
            text: 'RouterProvider',
            link: '/router/router-provider'
          },
          {
            text: 'staticRouterProvider',
            link: '/router/static-router-provider'
          }
        ]
      },
      {
        text: 'Router组件',
        collapsed: false,
        items: [
          {
            text: 'BrowserRouter',
            link: '/router-components/browser-router'
          },
          {
            text: 'HashRouter',
            link: '/router-components/hash-router'
          },
          {
            text: 'MemoryRouter',
            link: '/router-components/memory-router'
          },
          {
            text: 'NativeRouter',
            link: '/router-components/native-router'
          },
          {
            text: 'router',
            link: '/router-components/router'
          },
          {
            text: 'StaticRouter',
            link: '/router-components/static-router'
          }
        ]
      },
      {
        text: 'route',
        collapsed: false,
        items: [
          {
            text: 'Route',
            link: '/route/route'
          },
          {
            text: 'action',
            link: '/route/action'
          },
          {
            text: 'errorElement',
            link: '/route/error-element'
          },
          {
            text: 'lazy',
            link: '/route/lazy'
          },
          {
            text: 'Loader',
            link: '/route/loader'
          },
          {
            text: 'shouldRevalidate',
            link: '/route/should-revalidate'
          }
        ]
      },
      {
        text: '组件',
        collapsed: false,
        items: [
          {
            text: 'Await',
            link: '/components/await'
          },
          {
            text: 'Form',
            link: '/components/form'
          },
          {
            text: 'Link',
            link: '/components/link'
          },
          {
            text: 'Link(RN)',
            link: '/components/link-native'
          },
          {
            text: 'NavLink',
            link: '/components/nav-link'
          },
          {
            text: 'Navigate',
            link: '/components/navigate'
          },
          {
            text: 'Outlet',
            link: '/components/outlet'
          },
          {
            text: 'Route',
            link: '/components/route'
          },
          {
            text: 'Routes',
            link: '/components/routes'
          },
          {
            text: 'ScrollRestoration',
            link: '/components/scroll-restoration'
          }
        ]
      },
      {
        text: '钩子函数',
        collapsed: false,
        items: [
          {
            text: 'useActionData',
            link: '/hooks/use-action-data'
          },
          {
            text: 'useAsyncError',
            link: '/hooks/use-async-error'
          },
          {
            text: 'useAsyncValue',
            link: '/hooks/use-async-value'
          },
          {
            text: 'useBeforeUnload',
            link: '/hooks/use-before-unload'
          },
          {
            text: 'useFetcher',
            link: '/hooks/use-fetcher'
          },
          {
            text: 'useFetchers',
            link: '/hooks/use-fetchers'
          },
          {
            text: 'useFormAction',
            link: '/hooks/use-form-action'
          },
          {
            text: 'useHref',
            link: '/hooks/use-href'
          },
          {
            text: 'useInRouterContext',
            link: '/hooks/use-in-router-context'
          },
          {
            text: 'useLinkClickHandler',
            link: '/hooks/use-link-click-handler'
          },
          {
            text: 'useLinkPressHandler',
            link: '/hooks/use-link-press-handler'
          },
          {
            text: 'useLoaderData',
            link: '/hooks/use-loader-data'
          },
          {
            text: 'useLocation',
            link: '/hooks/use-location'
          },
          {
            text: 'useMatch',
            link: '/hooks/use-match'
          },
          {
            text: 'useMatches',
            link: '/hooks/use-matches'
          },
          {
            text: 'useNavigate',
            link: '/hooks/use-navigate'
          },
          {
            text: 'useNavigation',
            link: '/hooks/use-navigation'
          },
          {
            text: 'useNavigationType',
            link: '/hooks/use-navigation-type'
          },
          {
            text: 'useOutlet',
            link: '/hooks/use-outlet'
          },
          {
            text: 'useOutletContext',
            link: '/hooks/use-outlet-context'
          },
          {
            text: 'useParams',
            link: '/hooks/use-params'
          },
          {
            text: 'useResolvedPath',
            link: '/hooks/use-resolved-path'
          },
          {
            text: 'useRevalidator',
            link: '/hooks/use-revalidator'
          },
          {
            text: 'useRouteError',
            link: '/hooks/use-route-error'
          },
          {
            text: 'useRouteLoaderData',
            link: '/hooks/use-route-loader-data'
          },
          {
            text: 'useRoutes',
            link: '/hooks/use-routes'
          },
          {
            text: 'useSearchParams',
            link: '/hooks/use-search-params'
          },
          {
            text: 'useSearchParams(RN)',
            link: '/hooks/use-search-params-rn'
          },
          {
            text: 'useSubmit',
            link: '/hooks/use-submit'
          },
          {
            text: 'unstable_useViewTransitionState',
            link: '/hooks/use-view-transition-state'
          }
        ]
      },
      {
        text: 'Fetch工具类',
        collapsed: false,
        items: [
          {
            text: 'json',
            link: '/fetch/json'
          },
          {
            text: 'redirect',
            link: '/fetch/redirect'
          },
          {
            text: 'redirectDocument',
            link: '/fetch/redirect-document'
          }
        ]
      },
      {
        text: '工具类',
        collapsed: false,
        items: [
          {
            text: 'createRoutesFromChildren',
            link: '/utils/create-routes-from-children'
          },
          {
            text: 'createRoutesFromElements',
            link: '/utils/create-routes-from-elements'
          },
          {
            text: 'createSearchParams',
            link: '/utils/create-search-params'
          },
          {
            text: 'defer',
            link: '/utils/defer'
          },
          {
            text: 'generatePath',
            link: '/utils/generate-path'
          },
          {
            text: 'isRouteErrorResponse',
            link: '/utils/is-route-error-response'
          },
          {
            text: 'Location',
            link: '/utils/location'
          },
          {
            text: 'matchPath',
            link: '/utils/match-path'
          },
          {
            text: 'matchRoutes',
            link: '/utils/match-routes'
          },
          {
            text: 'renderMatches',
            link: '/utils/render-matches'
          },
          {
            text: 'resolvePath',
            link: '/utils/resolve-path'
          }
        ]
      },
      {
        text: '指南',
        collapsed: false,
        items: [
          {
            text: '服务端渲染',
            link: '/guides/ssr'
          },
          {
            text: '贡献',
            link: '/guides/contributing'
          },
          {
            text: 'API开发战略',
            link: '/guides/api-development-strategy'
          },
          {
            text: '数据仓库集成',
            link: '/guides/data-libs'
          },
          {
            text: '延迟数据',
            link: '/guides/deferred'
          },
          {
            text: '使用FormData',
            link: '/guides/form-data'
          },
          {
            text: '索引查询参数',
            link: '/guides/index-search-param'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/baimingxuan/react-router6-doc' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/baimingxuan/react-router6-doc/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
