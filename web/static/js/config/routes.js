import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer} from 'containers'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
        <Route path="/sign_up" component={RegistrationsNew} />
        <Route path="/sign_in" component={SessionsNew} />
        <Route path="/" component={AuthenticatedContainer}>
        <Route path="/boards/:id" component={BoardsShowView} />  
    </Route>
  </Router>
)

export default routes
