import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import ActionDetail from './_components/ActionDetail'

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

export default function ActionDetailPage({
  params,
}: {
  params: { dottedName: DottedName[] }
}) {
  return (
    <div className="mx-auto max-w-[600px]">
      <ButtonLink
        size="sm"
        color="text"
        href="/actions"
        className="flex items-center">
        <span
          role="img"
          className="pr-2 !text-[0.5rem]"
          aria-label="arrow pointing left">
          ◀
        </span>{' '}
        <Trans> Retour à la liste</Trans>
      </ButtonLink>

      <ActionDetail params={params} />
    </div>
  )
}
