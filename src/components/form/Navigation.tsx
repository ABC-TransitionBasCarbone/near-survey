'use client'

import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import {
  questionClickPrevious,
} from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useEngine, useForm, useRule } from '@/publicodes-state'
import getValueIsOverFloorOrCeiling from '@/publicodes-state/helpers/getValueIsOverFloorOrCeiling'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import type { MouseEvent } from 'react'
import { useCallback, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import SyncIndicator from './navigation/SyncIndicator'
import { userAnswersKeys, calculatedResultsKeys } from '../../data/keys'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'

export default function Navigation({
  question,
  tempValue,
  onComplete = () => '',
  isEmbedded,
}: {
  question: DottedName
  tempValue?: number
  onComplete?: () => void
  isEmbedded?: boolean
}) {
  const { t } = useClientTranslation()
  const { engine } = useEngine()

  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useForm()

  const { isMissing, plancher, plafond, value } = useRule(question)


  const { updateCurrentSimulation } = useCurrentSimulation()

  const { isBelowFloor, isOverCeiling } = getValueIsOverFloorOrCeiling({
    value: tempValue,
    plafond,
    plancher,
  })

  const isNextDisabled = useMemo(() => {
    return (isBelowFloor || isOverCeiling) || (question.match('services sociétaux . su') && (tempValue !== undefined || value === undefined));
  }, [isBelowFloor, isOverCeiling, question, tempValue, value]);

  // Fonction pour préparer les données à envoyer
  const prepareDataToSend = useCallback((JSONValue: any, voitures: { [key: string]: string }[]) => {
    if (!engine) return { calculatedResults: {}, answers: { userAnswers: {}, voitures }, broadcastChannel: '', broadcastId: '' };

    const calculatedResults: { [key: string]: any } = {};
    const userAnswers: { [key: string]: any } = {};
    const simulationData = {
      ...JSONValue.simulation.situation,
      ...JSONValue.simulation.suggestions,
    };

    userAnswersKeys.forEach((key) => {
      const value = simulationData[key];

      if (value === null) {
        userAnswers[key] = 'je ne sais pas';
      } else {
        userAnswers[key] = value;
      }
    });

    calculatedResultsKeys.forEach((key) => {
      calculatedResults[key] = safeEvaluateHelper(key, engine)?.nodeValue ?? 0;
    });

    return { calculatedResults, answers: { userAnswers, voitures }, broadcastChannel: JSONValue.simulation.broadcastChannel, broadcastId: JSONValue.simulation.broadcastId };
  }, [engine]);


  function getLastSimulationFromLocalStorage() {
    const localStorageValue = localStorage.getItem('near::v1');
    if (!localStorageValue) return null;

    const JSONValue: any = JSON.parse(localStorageValue);
    JSONValue.simulation = JSONValue.simulations.at(-1); // Dernière simulation
    delete JSONValue.simulations;
    return JSONValue;
  }

  // Fonction pour envoyer les données au serveur
  const sendDataToServer = useCallback(async (data: { broadcastId: string, broadcastChannel: string, calculatedResults: { [key: string]: string }, answers: { userAnswers: { [key: string]: string }, voitures: { [key: string]: string }[] } }) => {
    try {
      const response = await fetch('/api/add-row', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulationResults: data }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Réponse du serveur:', result);
      onComplete();
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de l'enregistrement de votre sondage. Réessayer dans quelques instants ou contactez xx.xx@xx.com"
      );
      console.error('Erreur lors de l’envoi des données au serveur:', error);
    }
  }, [onComplete]);


  const { type, questionsOfMosaicFromParent } = useRule(question)

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      if (isMissing) {
        if (type === 'mosaic') {
          questionsOfMosaicFromParent.forEach((key) => {
            updateCurrentSimulation({
              situationToAdd: {
                [key]: null
              },
              foldedStepToAdd: question
            })
          })
        } else {
          updateCurrentSimulation({
            situationToAdd: {
              [question]: null
            },
            foldedStepToAdd: question
          })
        }
      }

      handleMoveFocus()
      if (noNextQuestion) {
        const JSONValue = getLastSimulationFromLocalStorage();
        if (!JSONValue) return;

        const localVoitures = localStorage.getItem('transport . voiture . km');
        const voitures = localVoitures ? JSON.parse(localVoitures) : [];

        const dataToSend = prepareDataToSend(JSONValue, voitures);

        await sendDataToServer(dataToSend);
        return;
      }

      gotoNextQuestion()
    },
    [isMissing, noNextQuestion, gotoNextQuestion, type, questionsOfMosaicFromParent, updateCurrentSimulation, question, prepareDataToSend, sendDataToServer]
  )

  useMagicKey({
    gotToNextQuestion: handleGoToNextQuestion,
  })

  const handleMoveFocus = () => {
    // Focus the question title upon question change
    setTimeout(() => {
      const focusedElement =
        // Default : focus the first element focusable in the modified area of the form
        document.getElementById(
          QUESTION_DESCRIPTION_BUTTON_ID
          // Otherwise focus the first input or field button
        ) ??
        document.getElementById(
          DEFAULT_FOCUS_ELEMENT_ID
          // Edge case : mosaics
        ) ??
        document.getElementById(`${DEFAULT_FOCUS_ELEMENT_ID}-0`)

      if (focusedElement) {
        focusedElement?.focus()
      }
    })
  }

  return (
    <div
      className={twMerge(
        'fixed bottom-0 left-0 right-0 z-50 bg-gray-100 py-3',
        isEmbedded && 'static bg-primary-100 p-0'
      )}>
      <SyncIndicator />

      <div
        className={twMerge(
          'relative mx-auto flex w-full max-w-6xl justify-between gap-4 px-4 lg:justify-start',
          isEmbedded && 'justify-start'
        )}>
        <Button
          size="md"
          onClick={() => {
            trackEvent(questionClickPrevious({ question }))

            if (!noPrevQuestion) {
              gotoPrevQuestion()
            }

            handleMoveFocus()
          }}
          disabled={noPrevQuestion}
          color="text"
          className={twMerge('px-3')}>
          {'← ' + t('Précédent')}
        </Button>

        <Button
          color={isMissing ? 'secondary' : 'primary'}
          disabled={isNextDisabled}
          size="md"
          data-cypress-id="next-question-button"
          onClick={handleGoToNextQuestion}>
          {noNextQuestion
            ? t('Terminer')
            : isMissing && !isNextDisabled
              ? t('Passer la question') + ' →'
              : t('Suivant') + ' →'}
        </Button>
      </div>
    </div>
  )
}
