import Question from '@/components/form/Question'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import JourneysInput from './voiture/JourneysInput'

type Props = {
  question: DottedName
}
export default function Voiture({ question, ...props }: Props) {
  return (
    <>
      <Question question={question} className="mb-4" showInput={false} {...props} />
      <JourneysInput question={question} {...props} />
    </>
  )
}
