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

function errorRegisterHandler(errorObject) {
    console.log('register: heres error object:', errorObject)
    return {
        type: REGISTRATION_ERROR,
        errorObject
    }
}

function errorLoginHandler(errorObject) {
    console.log('login: heres error object:', errorObject)
    return {
        type: LOGIN_ERROR,
        errorObject
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
            const currentUser = await registerUserAPI({ data })
            dispatch(fetchingUserSuccess({ currentUser }))
            dispatch(push('/'))
        } catch (errorObject) {
            dispatch(errorRegisterHandler(errorObject))
        }
    }
}

export function loginUser({ data }) {
    return async function(dispatch, getState) {
        dispatch(fetchingUser())
        try {
            const currentUser = await loginUserAPI({ data })
            dispatch(fetchingUserSuccess({ currentUser }))
            dispatch(push('/'))
        } catch (errorObject) {
            dispatch(errorLoginHandler(errorObject))
        }
    }
}

export function getCurrentUser() {
    return async(dispatch, getState) => {
        try {
            const currentUser = await getCurrentUserAPI()
            dispatch(fetchingUserSuccess({ currentUser }))
        } catch (errorObject) {
            console.log('currentUser() error. Maybe no longer a valid token, not really an error though?', errorObject)
            dispatch(push('/sign_in'))
        }
    }
}

export function fetchingUserSuccess({ currentUser }) {
    return {
        type: FETCHING_USER_SUCCESS,
        currentUser
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

export function setLastRoute({lastRoute }) {
    return {
        type: SET_LAST_ROUTE,
        lastRoute
    }
}

const userInitialState = fromJS({
    info: {
        username: '',
        user_id: '',
        email: ''
    }
})

function user(state = userInitialState, action) {
    switch (action.type) {
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
    socket: null,
    //instead of DRY, could maybe make a reducer for errors.
    errorRegisterObject: {},
    errorLoginObject: {},

    currentLocation: {
        long: 0,
        lat: 0
    },

    friendsList: [],
    follows: [],
    followers: []
})

export default function users(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return state.merge({
                isAuthed: true,
                currentUser: action.currentUser
            })
        case FETCHING_USER:
            {
                return state.merge({
                    isFetching: true
                })
            }
        case FETCHING_USER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: false,
                errorRegisterObject: {},
                errorLoginObject: {},
                currentUser: action.currentUser
            })
        case REGISTRATION_ERROR:
            return state.merge({
                isFetching: false,
                error: true,
                errorRegisterObject: action.errorObject
            })
        case LOGIN_ERROR:
            return state.merge({
                isFetching: false,
                error: true,
                errorLoginObject: action.errorObject
            })
        case SET_LAST_ROUTE:
            return state.merge({
                lastRoute: action.lastRoute
            })
        case LOGOUT_USER:
            return state.merge({
                isAuthed: false,
                isFetching: false,
                currentUser: new Map({})
            })
        default:
            return state
    }
}
