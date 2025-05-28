import Providers from '@/components/providers/Providers'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { PropsWithChildren } from 'react'

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

export default function PersonasLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
