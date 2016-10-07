import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import { MainContainer, HomeContainer, RegistrationContainer,
   AuthendicatedContainer, BoardsShowViewContainer, SessionsNewContainer } from 'containers'
import { LoginPage } from 'components'

function routes(authCheck, history,render) {
    return (
        <Router history={history} render={render}>
            <Route path="/" component={MainContainer}>
                <IndexRoute component={HomeContainer}/>
                <Route path="/sign_up" component={RegistrationContainer} />
                <Route path="/sign_in" component={SessionsNewContainer} />
                <Route path="/" component={AuthenticatedContainer} onEnter={authCheck}>
                <Route path="/boards/:id" component={BoardsShowViewContainer} />
            </Route>
        </Router>
    )
}

export default routes
