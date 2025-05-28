import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutEs from '@/locales/pages/es/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'

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

export default async function AProposPage() {
  return (
    <>
      <PasserTestBanner />

      <MDXContent contentEn={AboutEn} contentFr={AboutFr} contentEs={AboutEs} />
    </>
  )
}
