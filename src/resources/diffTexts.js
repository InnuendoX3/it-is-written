const Diff = require('diff')

// Writing more words than the original text should count as failures too
const _calculatePercentage = (bibleTextLength, userTextLength, matchedWords) => {
  const hasExceededBibleTextLength = userTextLength > bibleTextLength

  if( hasExceededBibleTextLength )
    return Math.ceil(matchedWords * 100 / userTextLength)
  else  
    return Math.ceil(matchedWords * 100 / bibleTextLength)

}

const _getMatchedWords = diff => {
  return diff
  .filter( diffObj => !diffObj.hasOwnProperty('added') )
  .reduce( (accum, diffObj) => accum + diffObj.count, 0 )
}

const _getPercentage = (bibleTextArray, userTextArray) => {
  const bibleTextWordsQty = bibleTextArray.length
  const userTextWordsQty = userTextArray.length

  const diff = Diff.diffArrays(bibleTextArray, userTextArray)

  const matchedWords = _getMatchedWords(diff)

  const percentage = _calculatePercentage(
    bibleTextWordsQty,
    userTextWordsQty,
    matchedWords
  )
  
  return percentage
}

const compare = (bibleText, userText) => {
  const bibleTextArray = bibleText.split(' ')
  const userTextArray = userText.split(' ')

  const diff = Diff.diffArrays(bibleTextArray, userTextArray)

  const percentage = _getPercentage(bibleTextArray, userTextArray)

  const matchedWords = _getMatchedWords(diff)

  const response = {
    differences: diff,
    percentage: percentage,
    bibleTextWordsQty: bibleTextArray.length,
    matchedWords: matchedWords
  }

  return response
}

module.exports = { compare }