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

// Checks if url is valid
export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // fragment locator
  return !!pattern.test(str)
}

// Splice url to show only pathname
export function spliceUrl(url: string) {
  const urlDomain = url?.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim
  )
  return urlDomain
}
