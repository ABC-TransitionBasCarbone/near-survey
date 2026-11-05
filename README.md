## Le site Web nosgestesclimat.fr

## C'est quoi ?

Un calculateur d'empreinte climat individuelle de consommation à l'année, utilisant le modèle [nosgestesclimat](https://github.com/incubateur-ademe/nosgestesclimat).

Pour contribuer au modèle, données sous-jacentes et textes du questionnaire (calculs, facteurs d'émission, infos, questions, réponses, suggestions de saisie), [suivez le guide de contribution](https://github.com/incubateur-ademe/nosgestesclimat/blob/master/CONTRIBUTING.md).

Pour tout ce qui touche à l'interface (style d'un bouton, graphique de résultat, code javascript, etc.) c'est ici [sur le dépôt du _site_](https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/issues).

> 🇬🇧 Most of the documentation (including issues and the wiki) is written in french, please raise an [issue](https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/issues/new) if you are interested and do not speak French.

## Et techniquement ?

Le code utilise NextJS / Typescript / React / TailwindCSS, entre autres.

### Installation

> Ce dépôt ne contient pas les règles de calcul. Le site importe, depuis le [paquet npm `@incubateur-ademe/nosgestesclimat`](https://www.npmjs.com/package/@incubateur-ademe/nosgestesclimat), les règles compilées issues [des fichiers Publi.codes du modèle](https://github.com/incubateur-ademe/nosgestesclimat/tree/master/data).

Pour lancer le site, utilisant le dernier modèle de calcul publié, il suffit de lancer :

```
yarn && yarn dev
```

`yarn dev` et `yarn build` utilisent Turbopack. Le script `yarn build:analyze`
conserve Webpack pour la compatibilité avec `@next/bundle-analyzer`.

### Tests

#### Tests end-to-end

Nous utilisons [Cypress](https://www.cypress.io/) pour les tests e2e.

Pour lancer les tests:

1. lancez le serveur local : `yarn dev`
2. générez les fichiers de spécification des personas sur lesquels sont basés les tests : `yarn run e2e:generate`
3. lancez `yarn run e2e` pour ouvrir l'interface Cypress.

## Réutilisations de ce code

Attention, même si la licence MIT vous permet de réutiliser ce code à votre guise, en citant clairement le fait que vous reprenez nos travaux, vous ne pouvez pas réutiliser la marque Nos Gestes Climat. [Veuillez lire notre guide de personnalisation](https://accelerateur-transition-ecologique-ademe.notion.site/Personnaliser-Nos-Gestes-Climat-87f3e91110f8460f8089a4f15c870d6b)

<a href="https://vercel.com/?utm_source=ademe&utm_campaign=oss" alt="Url Vercel"><image src="https://user-images.githubusercontent.com/37937348/161967395-a5064a6a-b4d3-4ede-a940-ad81fa773916.svg" alt="Vercel" width="100" /></a>
