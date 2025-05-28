import PasserTestBanner from '@/components/layout/PasserTestBanner'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationLanding from './_components/DocumentationLanding'

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

export default function Documentation() {
  return (
    <div className="w-full max-w-4xl p-4 md:mx-auto md:py-8">
      <PasserTestBanner />

      <DocumentationLanding />
    </div>
  )
}
