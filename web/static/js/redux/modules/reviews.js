import { fromJS } from 'immutable'

const SET_USER_LOCATION        = 'SET_USER_LOCATION'
const SET_FAVORITES_LOCATION   = 'SET_FAVORITES_LOCATION'
const SET_TO_TRY_LOCATION      = 'SET_TO_TRY_LOCATION'
const SET_FRIENDS_LOCATION     = 'SET_FRIENDS_LOCATION'
const SET_FOLLOWING_LOCATION   = 'SET_FOLLOWING_LOCATION'
const SET_TRENDING_LOCATION    = 'SET_TRENDING_LOCATION'
const SET_FOLLOWER_LOCATION    = 'SET_FOLLOWER_LOCATION'
const SET_PLACES_LOCATION      = 'SET_PLACES_LOCATION'



const iniitialLocationState = fromJS({
  location: {
    long: 0,
    lat: 0
  }
})

export default function review(state = initialLocationState, action) {
    switch (action.type) {
        default:
            return state
    }
}


const initialState = fromJS({
    isFetching: false,
    error: false,
    socket: null,
    errorLocationObject: {},
    currentLocation: {
        long: 0,
        lat: 0
    }
})

export default function reviews(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}