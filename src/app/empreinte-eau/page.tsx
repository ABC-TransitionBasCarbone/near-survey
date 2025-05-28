import DynamicCTAButton from '@/components/cta/DynamicCTAButtons'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/Trans'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import Image from 'next/image'
import DailyGestureWaterFootprint from './_components/DailyGestureWaterFootprint'
import DidYouKnowWaterFootprint from './_components/DidYouKnowWaterFootprint'
import FAQWaterFootprint from './_components/FAQWaterFootprint'
import MotivationSectionWaterFootprint from './_components/MotivationSectionWaterFootprint'
import UnderstandToActWaterFootprint from './_components/UnderstandToActWaterFootprint'
import WhatDoWeMeasureWaterFootprint from './_components/WhatDoWeMeasureWaterFootprint'
import WhatItIsWaterFootprint from './_components/WhatItIsWaterFootprint'
import { waterFAQJsonLd } from './_constants/waterFAQJsonLd'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Calculez votre empreinte carbone et eau en 10 minutes !",
    description: "C'est facile, ludique et on vous proposera même des moyens personnalisés pour agir. Qu'attendez-vous pour faire le test ? ",
    image: 'images/misc/near-logo.png',
    alternates: {
      canonical: '',
    },
  })
}

export default async function WaterFootprintLandingPage() {
  const { t } = await getServerTranslation()

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: waterFAQJsonLd.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]}
      />

      <LandingPage
        heroTitle={
          <Trans>Chaque goutte compte : découvrez votre empreinte eau !</Trans>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p className="mb-0">
              <Trans>
                Calculez votre{' '}
                <strong className="text-primary-600">empreinte eau</strong> et
                découvrez{' '}
                <strong className="text-primary-600">
                  les litres qui se cachent
                </strong>{' '}
                dans votre consommation du quotidien.
              </Trans>
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButton
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                }}
              />
            </div>
          </div>
        }
        heroIllustration={
          <Image
            width={560}
            height={560}
            src="/images/illustrations/mon-empreinte-eau.svg"
            alt={t(
              "Un homme dans un magasin réfléchissant à l'empreinte eau du tee-shirt qu'il tient"
            )}
          />
        }>
        <WhatItIsWaterFootprint />

        <WhatDoWeMeasureWaterFootprint />

        <DidYouKnowWaterFootprint />

        <DailyGestureWaterFootprint />

        <UnderstandToActWaterFootprint pathname={'/empreinte-eau'} />

        <MotivationSectionWaterFootprint />

        <FAQWaterFootprint />
      </LandingPage>
    </>
  )
}
