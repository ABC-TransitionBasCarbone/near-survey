import type {
  SupportedRegion,
  SupportedRegions,
} from '@abc-transitionbascarbone/near-modele'

export const sortSupportedRegions = ({
  supportedRegions,
  currentLocale,
}: {
  supportedRegions: SupportedRegions
  currentLocale: string
}) => {
  if (!supportedRegions) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(supportedRegions).sort(
      (supportedRegionA, supportedRegionB) => {
        const nameA = (supportedRegionA[1] as SupportedRegion)[
          currentLocale
        ]?.nom.toUpperCase() // ignore upper and lowercase

        const nameB = (supportedRegionB[1] as SupportedRegion)[
          currentLocale
        ]?.nom.toUpperCase() // ignore upper and lowercase

        if (nameA < nameB) {
          return -1
        }

        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      }
    )
  )
}
