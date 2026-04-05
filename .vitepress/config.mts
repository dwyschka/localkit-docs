import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "markdown",
  
  title: "Localkit",
  description: "Localkit Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Supported Devices', link: '/supported-devices' }
    ],

    sidebar: [
      {
        text: 'Devices',
        items: [
          { text: 'Supported Devices', link: '/supported-devices' },
          { text: 'Petkit Pura Max', link: '/devices/pura-max' },
          { text: 'Petkit Fresh Element Solo', link: '/devices/fresh-element-solo' },
          { text: 'Petkit Yumshare Solo', link: '/devices/yumshare-solo' },
          { text: 'Petkit W5 (Water Fountain)', link: '/devices/eversweet-solo' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dwyschka/localkit' }
    ]
  }
})
