import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculez votre empreinte carbone et eau en 10 minutes !',
    description:
      "C'est facile, ludique et on vous proposera même des moyens personnalisés pour agir. Qu'attendez-vous pour faire le test ? ",
    image: 'images/misc/near-logo.png',
    alternates: {
      canonical: '',
    },
  })
}

export default async function Layout({
  params,
  children,
}: LayoutProps<'/simulateur/[root]'>) {
  const { root } = await params

  return <FormProvider root={root as DottedName}>{children}</FormProvider>
}
