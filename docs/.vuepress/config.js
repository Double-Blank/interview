const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '面试题总结',
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
        text: '前端',
        items: [
          {
            text: '基础',
            items: [
              { text: 'HTML', link: '/HTML/' },
              { text: 'CSS', link: '/CSS/' },
              { text: 'JavaScript', link: '/JS/' },
              { text: 'JS 基础', link: '/JSBase/' },
              { text: 'ES6', link: '/ES6/' },
              { text: 'Promise', link: '/promise/' },
            ]
          },
          {
            text: '框架与工程',
            items: [
              { text: 'Vue', link: '/vue/' },
              { text: 'Vuex', link: '/Vuex/' },
              { text: 'React', link: '/react/' },
              { text: 'Three', link: '/three/' },
              { text: 'HTTP', link: '/HTTP/' },
              { text: 'Webpack', link: '/webpack/' },
              { text: '工具库', link: '/yun/' },
            ]
          },
          {
            text: '笔试、算法与经验',
            items: [
              { text: '笔试', link: '/written/' },
              { text: '算法', link: '/algorithm/' },
              { text: '经验', link: '/experience/' },
            ]
          }
        ]
      },
      {
        text: '后端',
        items: [
          { text: '总览', link: '/backend/' },
          { text: 'Java', link: '/backend/java' },
          { text: 'Spring', link: '/backend/spring' },
          { text: 'MyBatis', link: '/backend/mybatis' },
          { text: '工程实践', link: '/backend/practice' },
          { text: 'AI 加试', link: '/backend/ai' },
        ]
      }
    ],
    sidebar: {
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
          title: 'CSS',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/JS/': [
        {
          title: 'JavaScript',
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
      '/promise/': [
        {
          title: 'Promise',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/JSBase/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/vue/': [
        {
          title: 'vue',
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
      '/react/': [
        {
          title: 'react',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/three/': [
        {
          title: 'three',
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
      '/HTTP/': [
        {
          title: '网络',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/experience/': [
        {
          title: '经验',
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
      ],
      '/backend/': [
        {
          title: '后端',
          collapsable: false,
          children: [
            '',
            'java',
            'spring',
            'mybatis',
            'practice',
            'ai',
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
