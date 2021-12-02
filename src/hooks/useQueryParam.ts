// https://andrew-chang-dewitt.dev/blog/posts/gatsby-query-parameters
import { navigate } from 'gatsby'
import { useLocation, globalHistory, WindowLocation } from '@reach/router'
import { useEffect, useState } from 'react'

const getQueryParam = (location: WindowLocation, query: string) => {
  const search = new URLSearchParams(location.search)

  return search.get(query)
}

const useQueryParam = (query: string) => {
  const location = useLocation()

  const parseString: (str: string | null) => string[] | null = (str) => {
    if (!str) return null

    return str.split(',')
  }

  const [value, setValue] = useState(parseString(getQueryParam(location, query)))

  const update = (newValue: string[] | null) => {
    setValue(newValue)

    if (!newValue) navigate(location.pathname)
    else navigate(`?${query}=${newValue.join(',')}`)
  }

  // forward & back button behavior
  // inside a useEffect hook to allow lifecycle updates to clean
  // up listeners on component unmount
  useEffect(() => {
    const historyEventCallback = ({ action, location: newLocation }) => {
      // back and forward navigation is sent as a 'POP' action
      if (action === 'POP') {
        setValue(parseString(getQueryParam(newLocation, query)))
      }
    }

    return globalHistory.listen(historyEventCallback)
  }, [])

  return { value, update }
}

export default useQueryParam
