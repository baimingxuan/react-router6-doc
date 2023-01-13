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
                        title: '快速上手',
                        path: '/guide/getting-started'
                    }
                ]
            },
            {
                title: '核心概念',
                path: '/core/defining-store',
                collapsable: false,
                children: [
                    {
                        title: '定义Store',
                        path: '/core/defining-store'
                    },
                    {
                        title: 'State',
                        path: '/core/state'
                    },
                    {
                        title: 'Getters',
                        path: '/core/getters'
                    },
                    {
                        title: 'Actions',
                        path: '/core/actions'
                    },
                    {
                        title: 'Plugins',
                        path: '/core/plugins'
                    },
                    {
                        title: '组件外使用Store',
                        path: '/core/outside-component-usage'
                    }
                ]
            },
            {
                title: '服务端渲染（SSR）',
                path: '/ssr/vue-and-vite',
                collapsable: false,
                children: [
                    {
                        title: 'Vue和Vite',
                        path: '/ssr/vue-and-vite'
                    },
                    {
                        title: 'Nuxt',
                        path: '/ssr/nuxt'
                    }
                ]
            },
            {
                title: '操作手册',
                path: '/cookbook/migration-vuex',
                collapsable: false,
                children: [
                    {
                        title: '从Vuex≤4迁移',
                        path: '/cookbook/migration-vuex'
                    },
                    {
                        title: 'HMR(热模块更新)',
                        path: '/cookbook/hot-module-replacement'
                    },
                    {
                        title: 'Testing(测试)',
                        path: '/cookbook/testing'
                    },
                    {
                        title: '不使用setup()的用法',
                        path: '/cookbook/options-api'
                    },
                    {
                        title: '组合Stores',
                        path: '/cookbook/composing-stores'
                    },
                    {
                        title: '从0.x(v1)迁移到v2',
                        path: '/cookbook/migration-v1-v2'
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
