import { fromJS, Map } from 'immutable'
import { registerUserAPI } from 'utils/userFunctions'
import { push, goBack } from 'react-router-redux'

const REGISTER_USER = 'REGISTER_USER'
const REGISTRATION_ERROR = 'REGISTRATION_ERROR'
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const LOGOUT_USER = 'LOGOUT_USER'
const SPOTIFY_AUTH = 'SPOTIFY_AUTH'
const FORM_LOGIN = 'FORM_LOGIN'
const SET_LAST_ROUTE = 'SET_LAST_ROUTE'

export function authUser({ currentUser }) {
    return {
        type: AUTH_USER,
        currentUser
    }
}

function unauthUser() {
    return {
        type: UNAUTH_USER
    }
}

function errorHandler({ errorObject }){
  return {
    type: REGISTRATION_ERROR,
    errorObject
  }
}

export function fetchingUser() {
    return {
        type: FETCHING_USER
    }
}

export function registerUser({ data }) {
  return async (dispatch,getState) => {
    dispatch(fetchingUser())
    const user = await registerUserAPI({ data },({ errorObject }) =>{
      dispatch(errorHandler({ errorObject }))
    })
    dispatch(fetchingUserSuccess({ currentUser }))
    dispatch(push('/'))
  }
}

export function fetchingUserSuccess({ currentUser }) {
    return {
        type: FETCHING_USER_SUCCESS,
        currentUser
    }
}

export function login({email, password}) {
    return async function (dispatch,getState) {
        try {
            dispatch(fetchingUser())
            const data = await loginUser({email, password})
            const user = data.user
            const username = data.user.username
            const user_id = data.user.user_id
            //I want to clearn some of this.
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now()}))
            dispatch(closeModal())
            dispatch(closeNavModal())
            dispatch(formLogin())
            dispatch(authUser(user_id))
            dispatch(push(push(goBack() || '/')))
            return user_id
        } catch (error) {
            Error('error in loginUser', error)
        }
    }
}

export function logout(){
    return async function (dispatch) {
        let response = await logoutUser()
        console.log(response)
        dispatch({type: LOGOUT_USER})
    }
}

const userInitialState = fromJS({
    info: {
        username: '',
        user_id: '',
        email:''
    }
})

function user(state = userInitialState, action) {
    switch(action.type) {
        case FETCHING_USER_SUCCESS:
            return state.merge({
                info: new Map(action.user)
            })
    }
}


const initialState = fromJS({
    isAuthed: false,
    isFetching: false,
    error: false,
    currentUser: {},
    errorObject: {},
})

export default function users(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return state.merge({
                isAuthed: true,
                currentUser: action.currentUser
            })
        case FETCHING_USER: {
            return state.merge({
                isFetching: true
            })
        }
        case FETCHING_USER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: false,
                currentUser: action.currentUser
            })
        case REGISTRATION_ERROR:
            return state.merge({
              isFetching: false,
              error: true,
              errorObject: action.errorObject
            })
        case SET_LAST_ROUTE:
            return state.merge({
                lastRoute: action.lastRoute
            })
        case LOGOUT_USER:
            return state.merge({
                isAuthed: false,
                isFetching: false,
                authId: '',
                spotifyAuthed: false,
                appLogin: false
            })
        default:
            return state
    }
}
