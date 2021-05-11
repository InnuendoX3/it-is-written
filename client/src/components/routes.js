import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Intro from './intro'
import SelectPassage from './select'
import Practice from './practice'
import Layout from './Layout'

export default function Routes() {
  return (
    <Switch>
      <Layout>
        <Route exact path='/' component={Intro} />
        <Route path='/select' component={SelectPassage} />
        <Route path='/practice' component={Practice} />
      </Layout>
    </Switch>
  )
}