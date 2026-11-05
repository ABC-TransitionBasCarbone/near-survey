import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { getServerLocale } from '@/helpers/getServerLocale'
import type { MDXProps } from 'mdx/types'
import type { JSX } from 'react'

type Props = {
  contentFr: (props: MDXProps) => JSX.Element
  contentEn?: (props: MDXProps) => JSX.Element
  contentEs?: (props: MDXProps) => JSX.Element
}

export default async function MDXContent({
  contentFr,
  contentEn,
  contentEs,
}: Props) {
  const locale = await getServerLocale()

  const Content = getLocalisedMDX({
    dictionnaries: {
      fr: contentFr,
      en: contentEn || contentFr,
      es: contentEs || contentFr,
    },
    locale: locale ?? 'fr',
  })

  return (
    <div className="markdown">
      <Content />
    </div>
  )
}
