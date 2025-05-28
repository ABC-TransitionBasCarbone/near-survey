import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { LegalNotice } from '@incubateur-ademe/legal-pages-react/LegalNotice'

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


export default function MentionsLegalesPage() {
  return (
    <div className="markdown">
      <LegalNotice
        includeBetaGouv
        siteName="Nos Gestes Climat"
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL!}
        licenceUrl="https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/blob/main/LICENSE"
        privacyPolicyUrl="/politique-de-confidentialite"
        siteHost={{
          name: 'Vercel Inc.',
          address: '440 N Barranca Ave #4133<br/>Covina, CA 91723',
          country: 'États-Unis',
          email: 'privacy@vercel.com',
        }}
      />
    </div>
  )
}
