import React from 'react'
import ReactDOM from 'react-dom'
import { toJS } from 'immutable'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'
import {reducer as formReducer} from 'redux-form'
import { useScroll } from 'react-router-scroll'
import routes from 'config/routes'
import { browserHistory, applyRouterMiddleware, useRouterHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

const routermiddle = routerMiddleware(browserHistory)
const render = applyRouterMiddleware(useScroll())

const store = createStore(
    combineReducers({...reducers, routing: routerReducer, form: formReducer}),
    compose(
        applyMiddleware(routermiddle, thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

export const history = syncHistoryWithStore(browserHistory, store)

//these arguments are what react-router will give to this function when it sees the onEnter prop.
function authCheck(nextState, replace) {
    if (store.getState().users.get('is_fetching') === true) {
      return
    }
    const authed = store.getState().users.get('is_authed')
    const nextPathName = nextState.location.pathname
    const phoenixAuthToken = sessionStorage.getItem('phoenixAuthToken');
    if (phoenixAuthToken && !authed) {
      //sign the user back in.
    //  store.dispatch(currentUser())
    } else if (!phoenixAuthToken) {
      //can always use react-router-redux to go(-2) when their sign-in is successful instead of setLastRoute.
      store.dispatch(setLastRoute({ lastRoute: nextPathName }))
      replace('/sign_in')
    }
}

ReactDOM.render(
    <Provider store={store}>
        {routes(authCheck, history, render)}
    </Provider>,
    document.getElementById('main_container'))
