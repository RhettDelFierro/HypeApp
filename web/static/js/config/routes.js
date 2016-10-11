import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import { MainContainer, HomeContainer, AuthenticatedContainer,
  BoardsShowViewContainer, SessionsNewContainer } from 'containers'
import { Login, Registration } from 'components'

function routes(authCheck, history, render) {
    return (
        <Router history={history} render={render}>
            <Route path="/" component={MainContainer}>
                <IndexRoute component={HomeContainer}/>
                <Route path="/sign_up" component={Registration} />
                <Route path="/sign_in" component={Login} />
                <Route path="/auth" component={AuthenticatedContainer} onEnter={authCheck} />
                <Route path="/boards/:id" component={BoardsShowViewContainer} />
            </Route>
        </Router>
    )
}

export default routes
