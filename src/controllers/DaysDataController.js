export const getNameDay = (day) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return days[day.getDay()]
}

export const getNumberDay = (day) => day.getDate()

export const getMonth = (month) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  return months[month.getMonth()]
}

export const getUniqueDays = (shows) => {
  const uniqueDatesSet = new Set(shows.map(show => new Date(show.date).toISOString()))
  const uniqueDatesArray = Array.from(uniqueDatesSet)
  return uniqueDatesArray
}

export const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export const getUniqueDaysFiltered = (uniqueDays, today) => {
  const filteredAndSortedDates = uniqueDays
    .map(uniqueDay => new Date(uniqueDay))
    .filter(date => date >= today)
    .sort((a, b) => a - b)
  return filteredAndSortedDates
}

export const areDatesEqual = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  d1.setUTCHours(0, 0, 0, 0)
  d2.setUTCHours(0, 0, 0, 0)
  return d1.getTime() === d2.getTime()
}
