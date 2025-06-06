import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import type { Migration } from '@publicodes/tools/migration'
import { migrateSituation } from '@publicodes/tools/migration'
import type { Simulation } from '../types'

export function migrateSimulation(
  simulation: Simulation & {
    group?: string
    poll?: string
    computedResults: any
  },
  migrationInstructions: Migration | undefined
): Simulation {
  if (migrationInstructions) {
    simulation.situation = migrateSituation(
      simulation.situation,
      migrationInstructions
    )

    // NOTE: folded steps (i.e. answered rules) are can be map to a situation,
    // where the keys are the rule names and the value is undefined.
    simulation.foldedSteps = Object.keys(
      migrateSituation(
        Object.fromEntries(
          simulation.foldedSteps.map((step) => [step, undefined])
        ),
        migrationInstructions
      )
    ) as DottedName[]
  }

  // If group or poll is defined, we convert it to groups or polls and delete it
  if (simulation.group) {
    simulation.groups = [simulation.group]
    delete simulation.group
  }

  if (simulation.poll) {
    simulation.polls = [simulation.poll]
    delete simulation.poll
  }

  // If the computedResults object does not take multiple metrics into account, we add them
  if ((simulation.computedResults as any)?.bilan !== undefined) {
    const newComputedResults = {
      carbone: simulation.computedResults as any,
      eau: {
        bilan: 0,
        categories: {},
        subcategories: {},
      },
    }
    simulation.computedResults = newComputedResults
  }

  return simulation
}
