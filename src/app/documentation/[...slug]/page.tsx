import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { currentLocale } from 'next-i18n-router'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationServer from './_components/documentationRouter/DocumentationServer'

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


// The page content is in layout.tsx in order to persist the state
// between the server and the client
export default async function DocumentationPage({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const locale = currentLocale()

  const supportedRegions = getSupportedRegions()

  const rules = await getRules({
    isOptim: false,
    locale,
    regionCode: 'FR',
  })

  return (
    <DocumentationRouter
      supportedRegions={supportedRegions}
      rules={rules}
      slug={slug}
      serverComponent={<DocumentationServer slugs={slug} rules={rules} />}
    />
  )
}
