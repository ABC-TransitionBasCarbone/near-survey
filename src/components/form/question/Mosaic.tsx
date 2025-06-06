import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: DottedName
  questionsOfMosaic: DottedName[]
}

export default function Mosaic({
  question,
  questionsOfMosaic,
  ...props
}: Props) {
  return (
    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic, index) => (
            <MosaicQuestion
              key={questionOfMosaic}
              parentMosaic={question}
              question={questionOfMosaic}
              index={index}
              {...props}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </fieldset>
  )
}
