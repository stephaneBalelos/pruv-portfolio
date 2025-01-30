// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    'pruvious',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@tresjs/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/turnstile'
  ],
  plugins: [
    '~/plugins/error-handler.ts',
  ],

  googleFonts: {
    families: {
      "Source Code Pro": [400, 700],
    },
  },
  app: {
    head: {
      bodyAttrs: {
        class: ''
      }
    }
  },

  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY,
  },

  i18n: {
    strategy: 'no_prefix',
    locales: ['de', 'en'],
    defaultLocale: 'de',
    vueI18n: './i18n.config.ts' 
  },

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  },
  

  pruvious: {
    language: {
      supported: [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' }
      ],
      primary: 'de',
      prefixPrimary: false,
      localStorageKey: 'language',
    },
    uploads: {
      drive: {
        type: 'local',
        path: './.uploads',
        urlPrefix: 'uploads',
      },
    },
    jwt: {
      secretKey: process.env.NUXT_JWT_SECRET_KEY,
    },
    database: process.env.NUXT_PRUVIOUS_DATABASE,
  },
  scripts: {
    registry: {
      plausibleAnalytics: {
        domain: process.env.NUXT_PLAUSIBLE_DOMAIN ?? '',
        scriptInput: {
          src: process.env.NUXT_PLAUSIBLE_SCRIPT_URL ?? '',
        }
      }
    }
  },

  runtimeConfig: {
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    }
  }
})