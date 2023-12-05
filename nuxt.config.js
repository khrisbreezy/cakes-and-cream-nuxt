export default {
  head: {
    title: 'Cakes and Creams',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/fav.png'},
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
        integrity: 'sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l',
        crossorigin: 'anonymous',
      },
      {rel: 'stylesheet', href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}
    ],
    script: [
      {src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js'},
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
        integrity: 'sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns',
        crossorigin: 'anonymous'
      },
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'},
      {src: "/js/main.js"}
    ]
  },

  css: [
    '~assets/styles/sass/main.scss'
  ],

  // Customize the progress-bar color
  loading: {color: '#a12ad8'},

  plugins: [
    '~plugins/axios.js',
    '~plugins/vue-select.js',
    '~plugins/vuelidate.js',
    '~plugins/vue-signature-pad.js',
    '~plugins/vue-signature.js'
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/toast'
  ],

  axios: {
    // baseURL: process.env.NODE_ENV !== 'production'
    //   ? process.env.API_URL_DEVELOPMENT
    //   : process.env.API_URL_PRODUCTION,
    baseURL: 'https://candc-backend-service.herokuapp.com/api/v1/',
    // baseURL: 'http://localhost:84/api/v1/',
    credentials: true
  },

  build: {},

  toast: {
    position: 'bottom-center',
    duration: 6000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },


}
