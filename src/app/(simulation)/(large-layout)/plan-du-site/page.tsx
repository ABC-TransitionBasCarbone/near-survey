import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import LinkList from './_components/LinkList'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Calculez votre empreinte carbone et eau en 10 minutes !",
    description: "C'est facile, ludique et on vous proposera même des moyens personnalisés pour agir. Qu'attendez-vous pour faire le test ? ",
    image: 'images/misc/near-logo.png',
    alternates: {
      canonical: '',
    },
  })
}

export default async function PlanDuSitePage() {
  const { t } = await getServerTranslation()

  const links = {
    'Nos outils': {
      bilan: {
        title: t('Le test'),
        href: '/simulateur/bilan',
      },
      profil: {
        title: t('Votre profil'),
        href: '/profil',
      },
      actions: {
        title: t('Nos actions pour réduire votre empreinte'),
        href: '/actions',
      },
      actionsPlus: {
        title: t('Les actions phares'),
        href: '/actions/plus',
      },
    },
    Informations: {
      Blog: {
        title: t('Blog'),
        href: '/blog',
      },
      nouveautes: {
        title: t('Nouveautés'),
        href: '/nouveautes',
      },
      aPropos: {
        title: t('À propos'),
        href: '/a-propos',
      },
      contact: {
        title: t('Contact'),
        href: '/contact',
      },
      viePrivee: {
        title: t('Vie privée'),
        href: '/vie-privee',
      },
      partenaires: {
        title: t('Partenaires'),
        href: '/partenaires',
      },
      faq: {
        title: t('FAQ'),
        href: '/questions-frequentes',
      },
      stats: {
        title: t('Statistiques'),
        href: '/stats',
      },
    },
    Documentations: {
      modele: {
        title: t('Le modèle Nos Gestes Climat'),
        href: '/modele',
      },
      documentation: {
        title: t('Documentation'),
        href: '/documentation',
      },
    },
  }

  return (
    <div data-cypress-id="plan-links">
      <Title
        title={
          <Trans i18nKey="publicodes.planDuSite.title">Plan du site</Trans>
        }
      />

      <section className="mb-2">
        <h2 data-cypress-id="plan-outils-title">
          <Trans>Nos outils</Trans>
        </h2>
        <LinkList entries={links['Nos outils']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Informations</Trans>
        </h2>
        <LinkList entries={links['Informations']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Documentations</Trans>
        </h2>
        <LinkList entries={links['Documentations']} />
      </section>

      <section>
        <Actions />
      </section>
    </div>
  )
}
