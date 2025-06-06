'use client'

import {
  questionChooseAnswer,
  questionTypeAnswer,
} from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: DottedName
  parentMosaic: DottedName
  index: number
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
  ...props
}: Props) {
  const { type, parent, setValue, questionsOfMosaicFromSibling } =
    useRule(question)

  const { title, icons, description } = useRule(parent)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => {
            setValue(value < 0 ? 0 : value, {
              questionDottedName: parentMosaic,
              questionsOfMosaicFromSibling,
            })

            trackEvent(
              questionTypeAnswer({
                question: parentMosaic,
                answer: parent,
                mosaicValue: value,
              })
            )
          }}
          parentMosaic={parentMosaic}
          index={index}
          {...props}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => {
            setValue(value, {
              questionDottedName: parentMosaic,
              questionsOfMosaicFromSibling,
            })

            trackEvent(
              questionChooseAnswer({
                question: parentMosaic,
                answer: parent,
                mosaicValue: value,
              })
            )
          }}
          index={index}
          {...props}
        />
      )}
    </>
  )
}
