import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import OrganisationMessage from './_components/OrganisationMessage'

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

export default async function Tutoriel() {
  return (
    <ContentLarge>
      <div className="mx-auto flex h-screen max-w-3xl flex-col overflow-auto">
        <Title
          data-cypress-id="tutoriel-title"
          className="text-lg md:text-2xl"
          title={
            <>
              <span className="inline text-secondary-700">
                <Trans>10 minutes</Trans>
              </span>{' '}
              <Trans>chrono pour calculer votre empreinte carbone et eau</Trans>
            </>
          }
        />

        <AvantDeCommencer />

        <AutresQuestions />

        {/* Check if body has the "iframe-mode" class name and if so add the static class to the footer */}
        <div
          className={twMerge(
            'tutorial-footer fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary-200 bg-gray-100 py-3'
          )}>
          <div
            className={twMerge(
              'relative mx-auto flex w-full max-w-3xl justify-between gap-4 px-4 md:px-0 lg:justify-start'
            )}>
            <ButtonBack />

            <OrganisationMessage />

            <ButtonStart />
          </div>
        </div>
      </div>
    </ContentLarge>
  )
}
