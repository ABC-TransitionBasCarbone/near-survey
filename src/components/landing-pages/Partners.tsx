import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function Partners() {
  const { t } = await getServerTranslation()

  return (
    <div className="flex justify-center md:-mt-10">
      <div className="relative flex items-center justify-center gap-6 py-6 md:gap-8 md:py-10 md:flex-row flex-col-small">
        <Image
          src="/images/logos/ABC.png"
          alt={t("Logo de l'Association pour la transition Bas Carbone")}
          width="1200"
          height="585"
          className="h-fit w-32"
        />
        <Image
          src="/images/logos/RQT.jpg"
          alt={t("Logo du Réseau Quartier en Transition")}
          width="200"
          height="200"
          className="h-fit w-24"
        />
        <Image
          src="/images/logos/Paris.png"
          alt={t("Logo de la ville de Paris")}
          width="1548"
          height="1420"
          className="h-fit w-32"
        />
        <Image
          src="/images/logos/NZC.jfif"
          alt={t("Logo de Net Zero Cities")}
          width="474"
          height="474"
          className="h-fit w-32"
        />
        <Image
          src="/images/logos/UE.png"
          alt={t("Logo de l'Union Européenne")}
          width="4247"
          height="891"
          className="h-fit w-32"
        />
      </div>
    </div>
  )
}
