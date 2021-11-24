import { TFunction } from 'react-i18next'

export const getAge = (timestamp: string) => {
  const dt1 = new Date(timestamp)
  const dt2 = new Date()

  const diff = (dt2.getTime() - dt1.getTime()) / 1000 / (60 * 60 * 24)

  return Math.floor(diff / 365.25)
}

export const printAgeRange = (t: TFunction, t1: string, t2?: string) => {
  const s = new Date(t1).getUTCFullYear()
  const e = ` — ${
    t2 ? new Date(t2).getUTCFullYear() : t('time.present', { ns: 'common' })
  }`

  return `${s}${e}`
}
