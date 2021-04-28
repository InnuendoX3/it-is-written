
// Clean from new lines and consecutive blank spaces
// As it comes from Bible API
const cleanCopyrightText = (text) => {
  const newLines = new RegExp('\\n', 'g')
  const consecutiveBlankSpaces = new RegExp('\\s{2,}', 'g')

  const result = text
    .replace(newLines, '')
    .replace(consecutiveBlankSpaces, ' ')
    .trim()

  return result
}


module.exports = {
  cleanCopyrightText
}