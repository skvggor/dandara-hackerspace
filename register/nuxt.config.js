export default {
  publicRuntimeConfig: {
    PROJECT_ID: process.env.PROJECT_ID
  },
  target: 'static',
  head: {
    title: 'Dandara Hackerspace - Movimento Antirracista',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Dandara Hackerspace - Movimento Antirracista'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: ''
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: ''
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Dandara Hackerspace - Movimento Antirracista'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: ''
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: ''
      }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;900&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  modules: [],
  build: {}
}
