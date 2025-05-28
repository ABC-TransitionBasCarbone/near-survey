import Trans from '@/components/translation/Trans'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import ActionPlusList from './_components/ActionPlusList'

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


export default async function ActionList() {
  const actions = await getPosts(`src/locales/actions-plus/fr/`)

  return (
    <div className="mt-8">
      <h2>
        <Trans>Nos explications complètes</Trans>{' '}
        <Image
          src="/images/misc/beta.svg"
          width={36}
          height={10}
          alt="beta"
          className="inline align-top"
        />
      </h2>

      <p>
        <em>
          <Trans>
            Découvrez les enjeux qui se cachent derrière chaque action.
          </Trans>
        </em>
      </p>

      <ActionPlusList actions={actions} />
    </div>
  )
}
