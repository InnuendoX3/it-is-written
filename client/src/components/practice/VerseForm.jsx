import React from 'react'

export default function VerseForm(props) {
  const { userText, setUserText, getDiff } = props

  function handleOnChange(e) {
    setUserText(e.target.value)
  }

  function handleOnClick(e) {
    e.preventDefault()
    getDiff()
  }

  return (
    <form className="little-spc">
      <textarea name="" id="" cols="70" rows="8" onChange={ e => handleOnChange(e)} value={userText} />
      <div>
        <button onClick={handleOnClick}>Compare</button>
      </div>
    </form>
  )
}