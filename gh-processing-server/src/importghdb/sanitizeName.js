/* Returns name without extra spaces
name: Variable to be returned without special characters
serial: true or false, returns all capitalized letters if true.
*/

export const sanitizeName = (name, serial) => {
  if (name == null || name == undefined) return undefined
  let sanitizedName = ""
  let namewords = name.split(" ")
  if (namewords.length == 0) return undefined
  namewords.forEach((word) => {
    if (word == " ") return
    if (word == "") return
    sanitizedName = sanitizedName + word[0].toUpperCase()
    sanitizedName = sanitizedName + word.substring(1).toLowerCase()
    sanitizedName = sanitizedName + " "
  })
  sanitizedName = sanitizedName.substring(0, sanitizedName.length - 1)
  if (sanitizedName.length == 0) return undefined
  if (serial) return sanitizedName.toUpperCase()
  return sanitizedName
}
