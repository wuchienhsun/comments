export const timeSince = (date: any) => {
  const seconds = Math.floor(
    (Number(new Date()) - Number(new Date(date))) / 1000
  )

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 604800
  if (interval > 1) {
    return Math.floor(interval) + ' weeks ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hrs ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' min ago'
  }
  return Math.floor(seconds) + ' seconds'
}
