import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Intro from './intro'
import SelectPassage from './select'
import Practice from './practice'

export default function Routes() {
  return (
    <Switch>
      <Route path='/select' component={SelectPassage} />
      <Route path='/practice' component={Practice} />
      <Route path='/' component={Intro} />
    </Switch>
  )
}