import { carboneMetric } from '@/constants/metric'
import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import type {
  DottedName,
  NGCRuleNode,
  NGCRules,
} from '@abc-transitionbascarbone/near-modele'
import { captureException } from '@sentry/react'
import type { PublicodesExpression } from 'publicodes'
import Engine from 'publicodes'
import { useCallback, useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import type { Metric } from '../../types'

/**
 * Initiate the engine based on the rules we pass
 *
 * Also return safeEvaluate and safeGetRule wich catch errors if dottedName is invalid
 *
 * And a pristine engine wich can be used to assess rules without any situation (for exemple, we can reliably sort the subcategories this way)
 */
export function useEngine(rules?: NGCRules) {
  const engine = useMemo(() => {
    if (!rules) return undefined

    const nbRules = Object.keys(rules).length
    console.time(`⚙️ Parsing ${nbRules}`)
    const engine = new Engine<DottedName>(rules, {
      logger: {
        log(msg: string) {
          console.log(`[publicodes:log] ${msg}`)
        },
        warn() {
          return null
        },
        error(msg: string) {
          console.error(`[publicodes:error] ${msg}`)

          // If it's a situation error, we throw it to sentry
          if (msg.match(/[ Erreur lors de la mise à jour de la situation ]/)) {
            captureException(new Error(msg))
          }
        },
      },
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    })
    console.timeEnd(`⚙️ Parsing ${nbRules}`)
    return engine
  }, [rules])

  const pristineEngine = useMemo(() => engine?.shallowCopy(), [engine])

  const safeEvaluate = useCallback(
    (expr: PublicodesExpression, metric: Metric = carboneMetric) => {
      const exprWithContext = {
        valeur: expr,
        contexte: {
          métrique: `'${metric}'`,
        },
      }

      return safeEvaluateHelper(exprWithContext, engine ?? new Engine())
    },
    [engine]
  )

  const safeGetRule = useMemo<
    (ruleName: DottedName) => NGCRuleNode | undefined
  >(
    () => (ruleName: DottedName) =>
      safeGetRuleHelper(ruleName, engine ?? new Engine()) ?? undefined,
    [engine]
  )

  return {
    engine,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
  }
}
