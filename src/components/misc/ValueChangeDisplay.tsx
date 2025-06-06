'use client'

import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/Trans'

export default function ValueChangeDisplay({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const locale = useLocale()

  const pathname = usePathname()

  const { currentQuestion } = useForm()

  const { numericValue } = useRule('bilan')
  const prevValue = useRef(numericValue)

  const [displayDifference, setDisplayDifference] = useState(0)

  const prevQuestion = useRef(currentQuestion)

  // We need this value to force the component to re-render when the numericValue changes
  // We don't use numericValue directly because it update before the displayDifference
  const [keyFromNumericValue, setKeyFromNumericValue] = useState(numericValue)

  useEffect(() => {
    if (prevQuestion.current !== currentQuestion) {
      setDisplayDifference(0)
    }
  }, [currentQuestion])

  useEffect(() => {
    const difference = numericValue - prevValue.current

    setDisplayDifference(difference)
    setKeyFromNumericValue(numericValue)

    prevValue.current = numericValue
  }, [numericValue, locale])

  const isNegative = displayDifference < 0

  const { formattedValue, unit } = formatFootprint(displayDifference, {
    locale,
    t,
  })

  if (displayDifference === 0 || !pathname?.includes('simulateur/bilan')) {
    return null
  }

  return (
    <div
      className={twMerge(
        '-z-0 whitespace-nowrap',
        isNegative
          ? 'animate-valuechange-reverse text-green-700'
          : 'animate-valuechange text-red-700',
        className
      )}
      key={keyFromNumericValue}
      aria-label={t('{{signe}} {{value}} {{unit}} sur votre empreinte', {
        signe: isNegative ? t('moins') : t('plus'),
        value: formattedValue,
        unit,
      })}>
      <strong className="text-base font-black">
        {displayDifference > 0 ? '+' : '-'}
        {formattedValue}
      </strong>{' '}
      <span className="text-xs">
        {unit} <Trans>sur votre empreinte</Trans>
      </span>
    </div>
  )
}
