import DynamicCTAButton from '@/components/cta/DynamicCTAButtons'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/Trans'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import Image from 'next/image'
import DailyGestureCarbonFootprint from './_components/DailyGestureCarbonFootprint'
import DidYouKnowCarbon from './_components/DidYouKnowCarbonFootprint'
import FAQCarbonFootprint from './_components/FAQCarbonFootprint'
import MotivationSectionCarbonFootprint from './_components/MotivationSectionCarbonFootprint'
import UnderstandToActCarbonFootprint from './_components/UnderstandToActCarbonFootprint'
import WhatDoWeMeasureCarbon from './_components/WhatDoWeMeasureCarbonFootprint'
import WhatItIsCarbon from './_components/WhatItIsCarbon'
import { carbonFAQJsonLd } from './_constants/carbonFAQJsonLd'

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


export default function CarbonFootprintLandingPage() {
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
            mainEntity: carbonFAQJsonLd.map((faq) => ({
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
          <Trans>
            L'empreinte carbone, une première étape pour passer à l’action
          </Trans>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p className="mb-0">
              <Trans>
                Calculez votre{' '}
                <strong className="text-primary-600">empreinte carbone</strong>{' '}
                en quelques minutes et découvrez les{' '}
                <strong className="text-primary-600">actions</strong> les plus
                efficaces pour{' '}
                <strong className="text-primary-600">
                  réduire vos émissions
                </strong>{' '}
                de gaz à effet de serre.
              </Trans>
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButton
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                }}
              />{' '}
            </div>
          </div>
        }
        heroIllustration={
          <Image
            width={400}
            height={400}
            src="/images/illustrations/girl-holding-earth.svg"
            alt=""
          />
        }>
        <WhatItIsCarbon />

        <WhatDoWeMeasureCarbon />

        <DidYouKnowCarbon />

        <DailyGestureCarbonFootprint />

        <UnderstandToActCarbonFootprint pathname={'/empreinte-carbone'} />

        <MotivationSectionCarbonFootprint />

        <FAQCarbonFootprint />
      </LandingPage>
    </>
  )
}
