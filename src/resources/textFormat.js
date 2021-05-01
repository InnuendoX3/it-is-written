
// Bible API sends Copyright text with lots of blank spaces
const cleanCopyrightText = (text) => {
  const newLinesPattern = new RegExp('\\n', 'g')
  const consecutiveBlankSpacesPattern = new RegExp('\\s{2,}', 'g')

  const result = text
    .replace(newLinesPattern, '')
    .replace(consecutiveBlankSpacesPattern, ' ')
    .trim()

  return result
}


module.exports = {
  cleanCopyrightText
}