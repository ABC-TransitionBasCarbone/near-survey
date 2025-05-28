import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DiffuserEn from '@/locales/pages/en/diffuser.mdx'
import DiffuserEs from '@/locales/pages/es/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

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

export default function DiffuserPage() {
  return (
    <MDXContent
      contentEn={DiffuserEn}
      contentFr={DiffuserFr}
      contentEs={DiffuserEs}
    />
  )
}
