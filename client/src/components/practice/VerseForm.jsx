import React, { useContext } from 'react'

import { BibleContext } from '../../contexts/BibleContext'
import PassageKit from '../../data/PassageKit'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function VerseForm(props) {
  const { passage, userText, setUserText, setTextDiff } = useContext(BibleContext)
  const { setWrittingMode, setShowResults } = props.modes

  async function getDiff() {
    await PassageKit.compareTexts(passage, userText)
      .then( async data => {
        setTextDiff(data)
        await PassageKit.setDiffResult(passage._id, data.percentage)
      })
      .catch( error => console.log(error))
  }
  
  function handleOnChange(e) {
    setUserText(e.target.value)
  }

  function handleCompare(e) {
    e.preventDefault()
    getDiff()
    setWrittingMode(false)
    setShowResults(true)
  }

  return (
    <Form className="little-spc">
      <Form.Group>
        <Form.Control as="textarea" className='user_text' rows={3} onChange={ e => handleOnChange(e)} value={userText} />
        <div className='button_right'>
          <Button onClick={handleCompare}>Let's check!</Button>
        </div>
      </Form.Group>
    </Form>
  )
}