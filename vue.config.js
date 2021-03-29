module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  pwa: {
    name: 'HabitSync',
    themeColor: '#546e7a',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'habit-sync-logo.png',
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
