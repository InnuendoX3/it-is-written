import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Intro from './intro'
import SelectPassage from './select'
import Practice from './practice'
import Layout from './Layout'
import Random from './random'
import Favourites from './favourites'
import Register from './register'
import Login from './login'

export default function Routes() {
  return (
    <Switch>
      <Layout>
        <Route exact path='/' component={Intro} />
        <Route path='/select' component={SelectPassage} />
        <Route path='/practice' component={Practice} />
        <Route path='/random' component={Random} />
        <Route path='/favourites' component={Favourites} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Layout>
    </Switch>
  )
}