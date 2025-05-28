import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityEs from '@/locales/pages/es/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'

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


export default function AccessibilityPage() {
  return (
    <MDXContent
      contentEn={accessibilityEn}
      contentFr={accessibilityFr}
      contentEs={accessibilityEs}
    />
  )
}
