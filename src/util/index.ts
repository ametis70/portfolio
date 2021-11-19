export const getAge = (timestamp: string) => {
  const dt1 = new Date(timestamp)
  const dt2 = new Date()

  const diff = (dt2.getTime() - dt1.getTime()) / 1000 / (60 * 60 * 24)

  return Math.floor(diff / 365.25)
}
