import React, {useState} from 'react'
import PassageKit from '../../data/PassageKit'

export default function Create() {
  const [content, setContent] = useState('')
  const [reference, setReference] = useState('')
  const [bible, setBible] = useState('')
  const [language, setLanguage] = useState(1)
  const [message, setMessage] = useState('')

  function handleContent(e) {
    e.preventDefault()
    setContent(e.target.value)
  }

  function handleReference(e) {
    e.preventDefault()
    setReference(e.target.value)
  }

  function handleBible(e) {
    e.preventDefault()
    setBible(e.target.value)
  }

  function onChangeLanguage(e) {
    setLanguage(Number(e.target.value))
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    const randomPassage = {
      content,
      reference,
      bible,
      language
    }

    PassageKit.saveRandom(randomPassage)
      .then(res => {
        setMessage(res.data.message)
        setContent('')
        setReference('')
        setBible('')
        setLanguage(1)
      })
      .catch(error => {
        console.log(error)
      })
  }

    
  return (
    <form onSubmit={handleSubmit}>
      <textarea name="" id="" cols="70" rows="8" onChange={ e => handleContent(e)} value={content} placeholder='Passage' required />
      <input type='text' value={reference} onChange={handleReference} placeholder='Reference' required />
      <input type='text' value={bible} onChange={handleBible} placeholder='Bible' required />

      <div onChange={onChangeLanguage} >
        <input type='radio' value='1' name='language' defaultChecked /> English
        <input type='radio' value='2' name='language' /> Spanish
      </div>
      <input type="submit" value="Create" />
      { message && <p>{message}</p>}
    </form>
  )

}