import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import ResultsPage from './containers/ResultsPage'
import PersonPage from './containers/PersonPage'
import MediaPage from './containers/MediaPage'

export default (
  <Route path="/" component={App}>
    <Route
      path="/:query"
      component={ResultsPage} />
    <Route
      path="/media/:mediaType/:id"
      component={MediaPage} />
  </Route>
)
