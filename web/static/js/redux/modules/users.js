import { fromJS, Map } from 'immutable'

import {
    registerUserAPI,
    loginUserAPI,
    getCurrentUserAPI,
    logoutAPI
} from 'utils/userFunctions'

import {
    push,
    go
} from 'react-router-redux'

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_ERROR = 'LOGIN_ERROR'
const REGISTRATION_ERROR = 'REGISTRATION_ERROR'
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const LOGOUT_USER = 'LOGOUT_USER'
const SET_LAST_ROUTE = 'SET_LAST_ROUTE'

export function authUser({ current_user }) {
    return {
        type: AUTH_USER,
        current_user
    }
}

function unauthUser() {
    return {
        type: UNAUTH_USER
    }
}

function errorRegisterHandler(error_oject) {
    console.log('register: heres error object:', error_object)
    return {
        type: REGISTRATION_ERROR,
        error_object
    }
}

function errorLoginHandler(error_object) {
    console.log('login: heres error object:', error_object)
    return {
        type: LOGIN_ERROR,
        error_object
    }
}

export function fetchingUser() {
    return {
        type: FETCHING_USER
    }
}

export function registerUser({ data }) {
    return async(dispatch, getState) => {
        dispatch(fetchingUser())
        try {
            const current_user = await registerUserAPI({ data })
            dispatch(fetchingUserSuccess({ current_user }))
            dispatch(push('/'))
        } catch (error_object) {
            dispatch(errorRegisterHandler(error_object))
        }
    }
}

export function loginUser({ data }) {
    return async function(dispatch, getState) {
        dispatch(fetchingUser())
        try {
            const current_user = await loginUserAPI({ data })
            dispatch(fetchingUserSuccess({ current_user }))
            dispatch(push('/'))
        } catch (error_object) {
            dispatch(errorLoginHandler(error_object))
        }
    }
}

export function getCurrentUser() {
    return async(dispatch, getState) => {
        try {
            const current_user = await getCurrentUserAPI()
            dispatch(fetchingUserSuccess({ current_user }))
        } catch (error_object) {
            console.log('currentUser() error. Maybe no longer a valid token, not really an error though?', error_object)
            dispatch(push('/sign_in'))
        }
    }
}

export function fetchingUserSuccess({ current_user }) {
    return {
        type: FETCHING_USER_SUCCESS,
        current_user
    }
}

export function logout() {
    return async function(dispatch) {
        try {
            let response = await logoutAPI()
            dispatch({
                type: LOGOUT_USER
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function setLastRoute({ last_route }) {
    return {
        type: SET_LAST_ROUTE,
        last_route
    }
}

const user_initial_state = fromJS({
    info: {
        username: '',
        user_id: '',
        email: ''
    }
})

function user(state = user_initial_state, action) {
    switch (action.type) {
        case FETCHING_USER_SUCCESS:
            return state.merge({
                info: new Map(action.user)
            })
    }
}


const initial_state = fromJS({
    is_authed: false,
    is_fetching: false,
    error: false,
    current_user: {},
    socket: null,
    //instead of DRY, could maybe make a reducer for errors.
    error_register_object: {},
    error_login_object: {}
})

export default function users(state = initial_state, action) {
    switch (action.type) {
        case AUTH_USER:
            return state.merge({
                is_authed: true,
                current_user: action.current_user
            })
        case FETCHING_USER:
            return state.merge({
                is_fetching: true
            })
        case FETCHING_USER_SUCCESS:
            return state.merge({
                is_authed: true,
                is_fetching: false,
                error: false,
                error_register_object: {},
                error_login_object: {},
                current_user: action.current_user
            })
        case REGISTRATION_ERROR:
            return state.merge({
                is_fetching: false,
                error: true,
                error_register_object: action.error_object
            })
        case LOGIN_ERROR:
            return state.merge({
                is_fetching: false,
                error: true,
                error_login_object: action.error_object
            })
        case SET_LAST_ROUTE:
            return state.merge({
                last_route: action.last_route
            })
        case LOGOUT_USER:
            return state.merge({
                is_authed: false,
                is_fetching: false,
                current_user: new Map({})
            })
        default:
            return state
    }
}
