import Trans from '@/components/translation/Trans'
import LandingPage from '@/design-system/layout/LandingPage'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Partners from '../components/landing-pages/Partners'
import CollectivelyCommit from './_components/CollectivelyCommit'
import DecryptChallenges from './_components/DecryptChallenges'
import DidYouKnowMainLanding from './_components/DidYouKnowMainLanding'
import TwoFootprints from './_components/TwoFootprints'
import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import { getLandingClickCTARestart, getLandingClickCTAResults, getLandingClickCTAResume, getLandingClickCTAStart } from '@/helpers/tracking/landings'
import { headers } from 'next/headers'
import { trackingActionClickCTA } from '@/constants/tracking/actions'

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

export default async function Homepage() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <>
      <LandingPage
        heroIllustration={
          <div className="flex flex-col">
          </div>
        }
        heroTitle={<Trans>Explorer votre empreinte écologique ?</Trans>}
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:gap-10 text-center">
            <p className="order-2 mb-0 text-lg md:order-1 md:text-2xl">
              <Trans>
                10 minutes pour découvrir votre{' '}
                <strong className="text-primary-700">empreinte carbone</strong>{' '}
                et votre{' '}
                <strong className="text-primary-700">empreinte eau</strong>
                .
              </Trans>
            </p>

            <div className="order-1 mt-10 flex flex-col items-center gap-6 md:order-2 md:mt-0 md:max-w-[300px]">
              <DynamicCTAButtons
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    pathname,
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    pathname,
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    pathname,
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    pathname,
                    trackingActionClickCTA
                  ),
                }}
                className="w-full"
              />
            </div>
          </div>
        }
        heroPartners={<Partners />}>
        <CollectivelyCommit />

        <TwoFootprints />

        <DidYouKnowMainLanding />

        <DecryptChallenges />

      </LandingPage>
    </>
  )
}
