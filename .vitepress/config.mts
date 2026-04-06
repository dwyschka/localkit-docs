import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "markdown",
  
  title: "Localkit",
  description: "Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Localkit',
        items: [
          { text: 'Requirements', link: '/overview/requirements' },
          { text: 'Installation', link: '/overview/installation' },
          { text: 'DNS', link: '/overview/dns' },
          { text: 'Screenshot', link: '/overview/screenshot' },
          { text: 'Changelog', link: '/overview/changelog' },
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Home Assistant', link: '/overview/homeassistant' },
        ]
      },
      {
        text: 'Devices',
        items: [
          { text: 'Overview', link: '/supported-devices' },
          { text: 'Petkit Pura Max', link: '/devices/pura-max' },
          { text: 'Petkit Fresh Element Solo', link: '/devices/fresh-element-solo' },
          { text: 'Petkit Yumshare Solo', link: '/devices/yumshare-solo' },
        ]
      },
      {
        text: 'Bluetooth Devices',
        items: [
          { text: 'Overview', link: '/bluetooth-devices/overview' },
          { text: 'Petkit W5 (Water Fountain)', link: '/bluetooth-devices/w5' },
          { text: 'Petkit K3 (Odor Spray)', link: '/bluetooth-devices/k3' },
        ]
      },
      {
        text: 'Links',
        items: [
          { text: 'Localkit', link: 'https://github.com/dwyschka/localkit' },
          { text: 'Localkit Broker', link: 'https://github.com/dwyschka/localkit-broker' },
          { text: 'Discord', link: 'https://discord.gg/pprJVBsESd' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dwyschka/localkit' }
    ]
  }
})
