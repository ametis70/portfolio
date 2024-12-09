'use client'

import { useRowLabel } from '@payloadcms/ui'

export const KeyLabelRow = () => {
  const { data } = useRowLabel<{ key: string }>()
  return <div>{data.key}</div>
}

export const KeyValueLabelRow = () => {
  const { data } = useRowLabel<{ key: string; value: string }>()
  return (
    <div>
      {data.key}: {data.value}
    </div>
  )
}

export const TitleLabelRow = () => {
  const { data } = useRowLabel<{ title: string }>()
  return <div>{data.title}</div>
}

export const CompanyLabelRow = () => {
  const { data } = useRowLabel<{ company: string }>()
  return <div>{data.company}</div>
}

export const CategoryLabelRow = () => {
  const { data } = useRowLabel<{ category: string }>()
  return <div>{data.category}</div>
}
