import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '火腿工坊',
  description: '业余无线电爱好者学习与实践平台',
  lang: 'zh-CN',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '无线电基础', link: '/basics/' },
      { text: '电子元器件', link: '/components/' },
      { text: '电子小制作', link: '/projects/' },
    ],

    sidebar: {
      '/basics/': [
        {
          text: '无线电基础',
          items: [
            { text: '电磁波与频段', link: '/basics/electromagnetic' },
            { text: '调制与解调', link: '/basics/modulation' },
            { text: '天线基础', link: '/basics/antenna' },
            { text: '业余频段划分', link: '/basics/bands' },
          ]
        }
      ],
      '/components/': [
        {
          text: '电子元器件',
          items: [
            { text: '无源器件', link: '/components/passive' },
            { text: '有源器件', link: '/components/active' },
            { text: '射频器件', link: '/components/rf' },
            { text: '检测与使用', link: '/components/testing' },
          ]
        }
      ],
      '/projects/': [
        {
          text: '电子小制作',
          items: [
            { text: '⭐ 矿石收音机', link: '/projects/crystal-radio' },
            { text: '⭐⭐ FM发射器', link: '/projects/fm-transmitter' },
            { text: '⭐⭐ 短波天线', link: '/projects/hf-antenna' },
            { text: '⭐⭐⭐ SDR接收机', link: '/projects/sdr-receiver' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: '仅供学习交流，请遵守无线电管理条例',
      copyright: 'Copyright © 2024 火腿工坊'
    }
  }
})
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '火腿工坊',
  description: '业余无线电爱好者学习与实践平台',
  lang: 'zh-CN',
  
  // 添加 Giscus 评论
  head: [
    ['script', { 
      src: 'https://giscus.app/client.js',
      'data-repo': '345604979a666-ai/ham-radio-site',
      'data-repo-id': 'R_kgDOS6doxA',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOS6doxM4C_LOh',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'zh-CN',
      'crossorigin': 'anonymous',
      async: 'true'
    }]
  ],
  
  // ... 其他原有配置 ...
})
