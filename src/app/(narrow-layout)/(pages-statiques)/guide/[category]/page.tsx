import Route404 from '@/components/layout/404'
import MDXContent from '@/components/mdx/MDXContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import guideAlimentation from '@/locales/guide-mode-groupe/fr/guide-alimentation.mdx'
import guideDivers from '@/locales/guide-mode-groupe/fr/guide-divers.mdx'
import guideLogement from '@/locales/guide-mode-groupe/fr/guide-logement.mdx'
import guideNumerique from '@/locales/guide-mode-groupe/fr/guide-numerique.mdx'
import guideServicesSocietaux from '@/locales/guide-mode-groupe/fr/guide-services-societaux.mdx'
import guideTransport from '@/locales/guide-mode-groupe/fr/guide-transport.mdx'

const categories: Record<string, any> = {
  alimentation: guideAlimentation,
  divers: guideDivers,
  logement: guideLogement,
  numerique: guideNumerique,
  'services-societaux': guideServicesSocietaux,
  transport: guideTransport,
}

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

export default function CategoryGuidePage({
  params: { category },
}: {
  params: { category: string }
}) {
  return (
    <div className="mx-auto my-4 flex flex-col items-start justify-center">
      <ButtonLink color="text" href="/guide">
        <span className="mr-2 inline-block">◀</span>
        <Trans>Retour</Trans>
      </ButtonLink>
      {categories[category] ? (
        <MDXContent contentFr={categories[category]} />
      ) : (
        <Route404 />
      )}
    </div>
  )
}
