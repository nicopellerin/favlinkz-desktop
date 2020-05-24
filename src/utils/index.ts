// String max length 60 characters
export function maxLength(str) {
  let newString

  newString = str.split("")
  if (newString.length > 90) {
    newString = str.split("").splice(0, 90).join("") + " [...]"
  }
  return newString
}

// Max length for url cards
export function maxLengthUrl(url) {
  let newUrlString
  newUrlString = url.split("")
  if (newUrlString.length > 60) {
    return (newUrlString = url.split("").splice(0, 30).join("") + " [...]")
  }

  return url
}

// Splice url to show only pathname
export function spliceUrl(url) {
  const urlDomain = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim
  )
  return urlDomain
}

// Remove %20 in categories
export function removeSpace(category) {
  return category.replace("%20", " ")
}
