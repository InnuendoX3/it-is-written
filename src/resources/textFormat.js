const HTMLParser = require('node-html-parser')

function _parseToPlainText(htmlString) {
  const root = HTMLParser.parse(htmlString)
  const plainText = root.text
  return plainText
}

function _removeVerseNumbers(text) {
  const verseNumbers = new RegExp('\\d', 'g')
  const withoutVerseNumbers = text.replace(verseNumbers, ' ')
  return withoutVerseNumbers
}

function _addSpaceAfterPunctuationMarks(text) {
  const markFollowedByLetter = new RegExp('([.,;:!?])(\\w)', 'g')
  const withSpaceAfterMark = text.replace(markFollowedByLetter, '$1 $2') //RegEx groups
  return withSpaceAfterMark
}

function _removeConsecutiveSpaces(text) {
  const consecutiveSpaces = new RegExp('\\s{2,}', 'g')
  const withOneSpace = text.replace(consecutiveSpaces, ' ')
  return withOneSpace
}

function _removeNewLines(text) {
  const newLines = new RegExp('\\n', 'g')
  const withoutNewLines = text.replace(newLines, '')
  return withoutNewLines
}

function _removeStartEndBlankSpaces(text) {
  return text.trim()
}

function _otherCorrections(text) {
  const fix1 = new RegExp('([”])([“])', 'g') // ”“ to ” “
  const result = text.replace(fix1, '$1 $2') //RegEx groups
  return result
}


// Bible API sends passage in a string with html
function htmlPassageToText(htmlVerse) {
  const plainText = _parseToPlainText(htmlVerse)
  const withoutVerseNumbers = _removeVerseNumbers(plainText)
  const spacedAfterMarks = _addSpaceAfterPunctuationMarks(withoutVerseNumbers)
  const spacedOneBlankSpace = _removeConsecutiveSpaces(spacedAfterMarks)
  const corrected = _otherCorrections(spacedOneBlankSpace)
  const result = _removeStartEndBlankSpaces(corrected)

  return result
}

// Bible API sends Copyright text with lots of blank spaces
function cleanCopyrightText(text) {
  const noNewLines = _removeNewLines(text)
  const noConsecutiveSpaces = _removeConsecutiveSpaces(noNewLines)
  const result = _removeStartEndBlankSpaces(noConsecutiveSpaces)

  return result
}


module.exports = {
  htmlPassageToText,
  cleanCopyrightText
}