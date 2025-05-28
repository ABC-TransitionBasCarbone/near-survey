import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import NorthStarIframe from './_components/NorthStarIframe'

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


export default async function NorthStarPage() {
  const { t } = await getServerTranslation()

  const title = t('Statistiques Northstar')

  return (
    <div>
      <Title title={title} />

      <p>
        {t(
          'Le chargement prend parfois plusieurs minutes, visualiser ce dashboard demande un peu de patience ! 🕙'
        )}
      </p>

      <NorthStarIframe />
    </div>
  )
}
