import {
  labels,
  periods,
} from '@/components/specialQuestions/voiture/journeysInput/_components/JourneyItem'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Journey } from '@/types/journey'
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  className?: string
}

export default function AddJourneyDesktop({ setJourneys, className }: Props) {
  const { t } = useClientTranslation()
  const [label, setLabel] = useState('work')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [possiblePeriods, setPossiblePeriods] = useState(periods)
  const [passengers, setPassengers] = useState(1)

  useEffect(() => {
    const newPossiblePeriods: Record<string, string> = Object.keys(periods).filter((period) => {
      if (label === 'work') return true
      if (label === 'holidays') return period === 'year'
      if (label === 'regular') return period === 'week'
    }).reduce((obj: Record<string, string>, key) => {
      obj[key] = periods[key]
      return obj
    }, {})

    setPossiblePeriods(newPossiblePeriods)

    if (Object.keys(newPossiblePeriods).length === 1) {
      setPeriod(Object.keys(newPossiblePeriods)[0])
    }
  }, [label])

  return (
    <tr className={twMerge('block md:table-row', className)}>
      <td className="block border-t border-primary-700 py-2 pr-2 text-xs md:table-cell md:pr-2">
        <Select
          className="p-2 text-xs"
          value={label}
          name="label"
          onChange={(e) => setLabel(e.target.value)}>
          {Object.entries(labels).map(([key, label], i) => {
            return (
              <option key={i} value={key}>
                {t(label)}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-primary-700 py-2 text-xs md:table-cell md:border-t md:px-2">
        <span className="flex items-center gap-4">
          <TextInputGroup
            className="w-12 p-2 text-xs md:w-16"
            name="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance((e.target as HTMLInputElement).value)}
          />{' '}
          km
        </span>
      </td>
      <td className="block border-primary-700 py-2 text-xs md:table-cell md:border-t md:px-2">
        <span className="flex items-center gap-4">
          <TextInputGroup
            className="w-12 p-2 text-xs md:w-16"
            name="distance"
            type="number"
            value={reccurrence}
            onChange={(e) =>
              setReccurrence(Number((e.target as HTMLInputElement).value))
            }
          />{' '}
          x
          <Select
            className="p-2 text-xs"
            value={period}
            name="period"
            onChange={(e) => setPeriod(e.target.value)}>
            {Object.entries(possiblePeriods).map(([key, period], i) => {
              return (
                <option key={i} value={key}>
                  {t(period)}
                </option>
              )
            })}
          </Select>
        </span>
      </td>
      <td className="block border-primary-700 py-2 text-xs md:table-cell md:border-t md:px-2">
        <Select
          name="passengers"
          className="p-2 text-xs"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}>
          {new Array(5).fill(0).map((_, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-primary-700 py-2 pl-2 text-right text-xs md:table-cell md:border-t">
        <Button
          size="sm"
          onClick={() =>
            setJourneys((prevJourneys) => [
              ...prevJourneys,
              {
                id: uuid(),
                label,
                distance: Number(distance),
                reccurrence,
                period,
                passengers,
              },
            ])
          }>
          <Trans>Ajouter</Trans>
        </Button>
      </td>
    </tr>
  )
}
