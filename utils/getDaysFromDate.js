import date from 'date-and-time'

export function getDaysFrom(theDate) {
  const now = new Date()
  const theModifiedDate = new Date(theDate)
  const theDays = date.subtract(now, theModifiedDate).toDays()

  if(theDays < 1.0) {
    return 'today'
  }

  return `${Math.round(theDays)} days ago`
}