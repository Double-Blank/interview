const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '前端面试题总结',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  base: '/iv/',
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: 'http://qn.aixshi.top/blog/fav.svg',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 2, // 显示标题3
    nav: [
      {
        text: 'Vue',
        link: '/Vue/',
      },
      {
        text: 'Vuex',
        link: '/Vuex/',
      },
      {
        text: 'HTTP',
        link: '/HTTP/',
      },
      {
        text: 'Promise',
        link: '/promise/',
      },
      {
        text: 'HTML',
        link: '/HTML/',
      },
      {
        text: 'CSS',
        link: '/CSS/',
      },
      {
        text: 'JS',
        link: '/JS/',
      },
      {
        text: '笔试',
        link: '/written/',
      },
      {
        text: '算法',
        link: '/algorithm/',
      },
      {
        text: 'ES6',
        link: '/ES6/',
      },
      {
        text: 'yun',
        link: '/yun/',
      },
      {
        text: 'webpack',
        link: '/webpack/',
      }
    ],
    sidebar: {
      '/Vue/': [
        {
          title: 'Vue',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/Vuex/': [
        {
          title: 'Vuex',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/HTTP/': [
        {
          title: 'HTTP',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/promise/': [
        {
          title: 'Promise',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/HTML/': [
        {
          title: 'HTML',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/CSS/': [
        {
          title: 'HTML',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/JS/': [
        {
          title: 'JS',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/written/': [
        {
          title: '笔试',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/algorithm/': [
        {
          title: '算法',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/ES6/': [
        {
          title: 'ES6',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/webpack/': [
        {
          title: 'webpack',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/yun/': [
        {
          title: 'yun',
          collapsable: false,
          children: [
            '',
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
