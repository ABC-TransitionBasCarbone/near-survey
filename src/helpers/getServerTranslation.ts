import initI18next from '@/locales/initServer'
import { getServerLocale } from './getServerLocale'

export async function getServerTranslation(
  namespace?: string,
  options?: { keyPrefix: string }
) {
  const language = await getServerLocale()

  const i18nextInstance = await initI18next(language || '')

  i18nextInstance.getFixedT(
    language || '',
    'translation',
    options?.keyPrefix ?? ''
  )

  return {
    t: i18nextInstance.getFixedT(
      language || '',
      Array.isArray(namespace) ? namespace[0] : namespace,
      options?.keyPrefix ?? ''
    ),
    i18n: i18nextInstance,
  }
}
