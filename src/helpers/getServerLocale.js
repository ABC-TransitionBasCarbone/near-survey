const { headers } = require('next/headers')

async function getServerLocale() {
  return (await headers()).get('x-next-i18n-router-locale') ?? undefined
}

module.exports = { getServerLocale }
