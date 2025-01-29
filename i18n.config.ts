export default defineI18nConfig(() => ({
    legacy: false,
    allowComposition: true,
    globalInjection: true,
    availableLocales: ['de', 'en'],
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
      de: {
        welcome: 'Willkommen',
        projects: 'Projekte',
        light_mode: 'Heller Modus',
        dark_mode: 'Dunkler Modus',
        cookies: 'Cookies',
        privacy_policy: 'Datenschutz',
        imprint: 'Impressum',
        legal: 'Rechtliches'
      },
      en: {
        welcome: 'Welcome',
        projects: 'Projects',
        light_mode: 'Light Mode',
        dark_mode: 'Dark Mode',
        cookies: 'Cookies',
        privacy_policy: 'Privacy Policy',
        imprint: 'Imprint',
        legal: 'Legal'
      }
    }
  }))