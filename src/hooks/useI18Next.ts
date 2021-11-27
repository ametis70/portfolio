import { i18n, TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type UseI18NextFunction = (
  language?: string,
  content?: AllTranslationQuery,
) => {
  t: TFunction
  fixedT: TFunction
  get: BundleGetFunction
  i18n: i18n
}

const useI18Next: UseI18NextFunction = (language, content) => {
  const { t, i18n } = useTranslation()

  let fixedT: TFunction = () => {
    throw new Error('To use fixedT, pass language prop to useI18Next')
  }

  const get = <T>(namespace: string): T =>
    language
      ? useMemo(() => i18n.getResourceBundle(language, namespace), [namespace, language])
      : () => {
          throw new Error('To use fixedT, pass language prop to useI18Next')
        }

  let namespaces: string[] = []

  if (content) {
    content.edges.forEach(({ node }) => {
      const { ns, language, data } = node
      namespaces.push(ns)
      if (!i18n.getResourceBundle(language, ns)) {
        i18n.addResourceBundle(language, ns, JSON.parse(data))
      }
    })
  }

  if (language) {
    fixedT = i18n.getFixedT(language, [...namespaces, 'common'])
  }

  return { t, i18n, fixedT, get }
}

export default useI18Next
