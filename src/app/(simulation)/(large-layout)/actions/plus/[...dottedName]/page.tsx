import Route404 from '@/components/layout/404'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Markdown from '@/design-system/utils/Markdown'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculez votre empreinte carbone et eau en 10 minutes !',
    description:
      "C'est facile, ludique et on vous proposera même des moyens personnalisés pour agir. Qu'attendez-vous pour faire le test ? ",
    image: 'images/misc/near-logo.png',
    alternates: {
      canonical: '',
    },
  })
}

type Props = {
  params: Promise<{
    dottedName: DottedName[]
  }>
}

export default async function ActionPlus({ params }: Props) {
  const { dottedName: dottedNameArray } = await params

  const action = await getPost(
    `src/locales/actions-plus/fr/`,
    decodeURI(dottedNameArray.join(' . ').replaceAll('-', ' '))
  )

  return (
    <div>
      <div className="mb-8 mt-4 flex flex-wrap gap-4">
        <ButtonLink size="sm" color="text" href={'/actions/plus'}>
          <Trans>◀ Retour à la liste des fiches</Trans>
        </ButtonLink>
        {action ? (
          <ButtonLink size="sm" href={'/actions/' + dottedNameArray.join('/')}>
            <Trans>🧮 Voir le geste climat correspondant</Trans>
          </ButtonLink>
        ) : null}
      </div>
      {action ? <Markdown>{action?.content}</Markdown> : <Route404 />}
    </div>
  )
}
