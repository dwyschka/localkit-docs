import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "localkit",
  
  title: "Localkit",
  description: "Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/overview/installation' },
    ],

    sidebar: [
      {
        text: 'Localkit',
        items: [
          { text: 'Requirements', link: '/overview/requirements' },
          { text: 'Installation', link: '/overview/installation' },
          { text: 'DNS', link: '/overview/dns' },
          { text: 'Web UI', link: '/overview/web-ui' },
          { text: 'Media & Object Storage', link: '/overview/media' },
          { text: 'Activity Log', link: '/overview/activity-log' },
          { text: 'FAQ', link: '/overview/faq' },
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
          { text: '🔨 Petkit Fresh Element 3', link: '/devices/fresh-element-3' },
          { text: 'Petkit Fresh Element Solo', link: '/devices/fresh-element-solo' },
          { text: 'Petkit Yumshare Dual', link: '/devices/yumshare-dual' },
          { text: 'Petkit Yumshare Solo', link: '/devices/yumshare-solo' },
          { text: 'Petkit Purobot Crystal', link: '/devices/purobot-crystal' },
          { text: 'Petkit Eversweet Ultra', link: '/devices/eversweet-ultra' },
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
