import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Questions from './_components/Questions'

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

export default function QuestionsPage() {
  return (
    <>
      <Title>
        <Trans>Questions</Trans>
      </Title>
      <Questions />
    </>
  )
}
