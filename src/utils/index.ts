// String max length 60 characters
export function maxLength(str: string, len = 75) {
  let newString

  newString = str?.split("")
  if (newString?.length > len) {
    newString = str?.split("").splice(0, len).join("") + " [...]"
  }
  return newString
}

// Max length for url cards
export function maxLengthUrl(url: string) {
  let newUrlString
  newUrlString = url?.split("")
  if (newUrlString?.length > 26) {
    return (newUrlString = url?.split("").splice(0, 26).join("") + " [...]")
  }

  return url
}

// Splice url to show only pathname
export function spliceUrl(url: string) {
  const urlDomain = url?.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim
  )
  return urlDomain
}
