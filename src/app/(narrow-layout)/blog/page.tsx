import PasserTestBanner from '@/components/layout/PasserTestBanner'
import List from '@/components/posts/List'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

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


export default async function Blog() {
  const posts = await getPosts('src/locales/blog/fr/')

  return (
    <>
      <PasserTestBanner />

      <Title title={<Trans>Le Blog</Trans>} data-cypress-id="blog-title" />

      <p>
        <Trans>Découvrez nos articles de blog&nbsp;:</Trans>
      </p>

      <List items={posts} path="/blog" />
    </>
  )
}
