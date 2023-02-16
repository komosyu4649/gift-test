import dayjs from 'dayjs'

export const formatDate = (day: string) => {
  const dayData = dayjs(day)
  return dayData.format('YYYY.MM.DD')
}
