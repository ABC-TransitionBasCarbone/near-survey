import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/Trans'

export default async function CollectivelyCommit() {
  return (
    <>
      <MotivationSection
        title={
          <Trans>Mon Quartier, mes choix !</Trans>
        }
        description={
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-sm md:text-lg">
              <Trans>
                Les questions auxquelles vous allez répondre vous permettrons d’estimer et comprendre votre empreinte carbone (et eau également). Vous pourrez ensuite découvrir les pistes d’actions pour la réduire. Mais cette réduction ne peut être uniquement le fruit de choix personnels. C’est pourquoi avec le projet NEAR, nous vous proposons d’œuvrer à une échelle plus large, celle de votre quartier. Ce dernier a une influence directe sur nos modes de vies, c'est pourquoi il est le bon lieu pour développer des aménagements collectifs qui améliorent le cadre de vie tout en facilitant des modes de vie sobres en carbone.
              </Trans>
            </p>
            <p className="text-center text-sm font-bold text-secondary-700 md:text-lg">
              <Trans>
                Accélérons l’impact collectif avec NEAR !
              </Trans>
            </p>
          </div>
        }
      />
      <MotivationSection
        title={
          <Trans>NEAR qu'est-ce que c'est ?</Trans>
        }
        description={
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-sm md:text-lg">
              <Trans>
                NEAR est une démarche collective de transformation des quartiers par les habitants eux-mêmes. En couplant des questionnements sur les ressentis et les usages du quartier avec un questionnaire permettant d’estimer son empreinte carbone personnelle, NEAR cherche à dégager des sujets prioritaires d’actions en accord avec les préoccupations des habitants eux-mêmes. Ces derniers sont ensuite mis à contribution pour penser et décider collectivement des solutions concrètes à mettre en œuvre pour améliorer à la fois le cadre de vie et réduire l’empreinte carbone de tous.
              </Trans>
            </p>
            <p>
              <Trans>
                NEAR est porté par les équipes de la Ville de Paris, du Réseau des Quartiers en Transitions, de l’Association pour la transition Bas Carbone et par la Coopérative Carbone Paris & Métropole du Grand Paris.
              </Trans>
            </p>
          </div >
        }
      />
      <MotivationSection
        title={
          <Trans>A propos du développement de l'outil</Trans>
        }
        description={
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-sm md:text-lg">
              <Trans>
                Cet outil disponible gratuitement a été développé par l’Association pour la transition Bas Carbone avec le soutien des membres du projet NEAR              </Trans>
            </p>
            <p>
              <Trans>
                Cette déclinaison s'appuie librement sur la version officielle de Nos Gestes Climat développée par l'ADEME (<a href="https://www.ademe.fr/">Agence de la transition écologique</a>) en partenariat avec l'ABC (<a href="https://abc-transitionbascarbone.fr/">Association pour la Transition Bas Carbone</a>).
              </Trans>
            </p>
            <p>
              <Trans>
                Si vous avez des suggestions d’amélioration ou des questions, <a href="https://www.ademe.fr/">faites-en nous part !</a>
              </Trans>
            </p>
          </div >
        }
      />
    </>
  )
}
