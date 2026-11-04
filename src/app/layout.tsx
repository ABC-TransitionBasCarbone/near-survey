import { getGeolocation } from '@/helpers/getGeolocation'
import { getServerLocale } from '@/helpers/getServerLocale'
import '@/locales/initClient'
import '@/locales/initServer'
import { marianne } from './marianne'
import { dir } from 'i18next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import type { PropsWithChildren } from 'react'
import MainLayoutProviders from './_components/MainLayoutProviders'
import './globals.css'

const ClientErrorContent = dynamic(
  () => import('@/components/error/ErrorContent')
)

export default async function RootLayout({ children }: PropsWithChildren) {
  try {
    const lang = await getServerLocale()

    const initialRegion = await getGeolocation()

    return (
      <html lang={lang ?? ''} dir={dir(lang ?? '')}>
        <head>
          <link rel="icon" href="/images/misc/near-logo.png" />

          <meta
            name="google-site-verification"
            content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
          />

          <meta property="twitter:card" content="summary_large_image" />

          <link rel="manifest" href="../manifest.webmanifest" />

          <meta name="theme-color" content="#4949ba" />

          {
            // Matomo Prod
            process.env.NEXT_PUBLIC_MATOMO_ID === '1' && (
              <Script id="matomo">
                {`
                  var _paq = window._paq = window._paq || [];
                  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                  _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u="https://stats.beta.gouv.fr/";
                    _paq.push(['setTrackerUrl', u+'matomo.php']);
                    _paq.push(['setSiteId', '20']);
                    _paq.push(['addTracker', 'https://stats.data.gouv.fr/matomo.php', '153'])
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                  })();
                `}
              </Script>
            )
          }

          {
            // Matomo Pre-prod
            process.env.NEXT_PUBLIC_MATOMO_ID === '2' && (
              <Script id="matomo">
                {`
                var _paq = window._paq = window._paq || [];
                /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
                _paq.push(['enableLinkTracking']);
                (function() {
                  var u="https://stats.beta.gouv.fr/";
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '79']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();
              `}
              </Script>
            )
          }
        </head>

        <body
          className={`${marianne.className} bg-white text-default transition-colors duration-700`}>
          <Script id="script-user-agent">{`
            const b = document.documentElement;
            b.setAttribute('data-useragent', navigator.userAgent);
          `}</Script>

          <MainLayoutProviders initialRegion={initialRegion}>
            {children}
            {/* <Footer /> */}
          </MainLayoutProviders>

          <div id="modal" />
        </body>
      </html>
    )
  } catch (error) {
    return (
      <html lang="fr">
        <body className={`${marianne.className} bg-white text-default`}>
          <div className="flex h-screen flex-col items-center justify-center">
            <ClientErrorContent />
          </div>
        </body>
      </html>
    )
  }
}
