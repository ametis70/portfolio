export { wrapPageElement, wrapRootElement } from './gatsby-ssr'

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  return false

  /*
  if (!prevRouterProps || !routerProps) {
    return true
  }

  const {
    location: { pathname: pp },
  } = prevRouterProps
  const {
    location: { pathname: np },
  } = routerProps

  console.log({ np, sliced: np.slice(3, np.length) })
  console.log({ pp, sliced: pp.slice(3, pp.length) })

  let localized = ['en', 'es'].some((l) => l === np.slice(1, 3))
  console.log(localized)

  if (localized ? np.slice(3, np.length) === pp : np === pp.slice(3, pp.length)) {
    return false
  }
  */
}
