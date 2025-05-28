import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import Total from '@/components/total/Total'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
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


export default function ActionsLayout({ children }: PropsWithChildren) {
  return (
    <FormProvider>
      <Title title={<Trans>Mes&#160;gestes</Trans>} />

      <Total simulationMode={false} />

      <NorthStarBanner type="action" />

      <div>{children}</div>
    </FormProvider>
  )
}
