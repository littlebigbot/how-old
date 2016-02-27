import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import ResultsPage from './containers/ResultsPage'

export default (
  <Route path="/" component={App}>
    <Route path="/:query"
           component={ResultsPage} />
  </Route>
)
