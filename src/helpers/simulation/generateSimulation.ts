import { metrics } from '@/constants/metric'
import { migrateSimulation } from '@/publicodes-state/helpers/migrateSimulation'
import type {
  ComputedResults,
  ComputedResultsFootprint,
  Simulation,
} from '@/publicodes-state/types'
import type { Migration } from '@publicodes/tools/migration'
import { captureException } from '@sentry/react'
import { v4 as uuidv4 } from 'uuid'

export function generateSimulation({
  id = uuidv4(),
  date = new Date().toISOString(),
  situation = {},
  foldedSteps = [],
  actionChoices = {},
  persona,
  computedResults = metrics.reduce((acc, metric) => {
    acc[metric] = {
      bilan: 0,
      categories: {},
    } as ComputedResultsFootprint
    return acc
  }, {} as ComputedResults),
  progression = 0,
  defaultAdditionalQuestionsAnswers,
  polls,
  groups,
  savedViaEmail,
  migrationInstructions,
  suggestions = {},
}: Partial<Simulation> & {
  migrationInstructions?: Migration
} = {}): Simulation {
  let simulation = {
    id,
    date,
    situation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    defaultAdditionalQuestionsAnswers,
    polls,
    groups,
    savedViaEmail,
    suggestions
  } as Simulation

  try {
    simulation = migrateSimulation(simulation, migrationInstructions)
  } catch (error) {
    console.warn('Error trying to migrate Simulation:', error)
    captureException(error)
  }

  return simulation
}
