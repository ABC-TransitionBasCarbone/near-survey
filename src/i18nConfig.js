const i18nConfig = {
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localeDetector: (request) => {
    const acceptedLanguages = request.headers
      ?.get('accept-language')
      ?.split(',')
    if (!acceptedLanguages) {
      return 'fr'
    }
    const preferredLanguage = acceptedLanguages
      .map((acceptedLanguage) => acceptedLanguage.slice(0, 2).toLowerCase())
      .find((language) => ['fr', 'en', 'es'].includes(language))
    return preferredLanguage ?? 'fr'
  },
}

module.exports = i18nConfig
