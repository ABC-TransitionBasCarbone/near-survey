import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentEs from '@/locales/pages/es/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'

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


export default function CGUPage() {
  return (
    <MDXContent
      contentEn={ContentEn}
      contentFr={ContentFr}
      contentEs={ContentEs}
    />
  )
}
