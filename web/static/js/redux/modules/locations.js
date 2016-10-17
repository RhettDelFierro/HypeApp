import { fromJS } from 'immutable'
import { getCurrentLocationAPI } from 'utils/locationsFunctions'

const SET_USER_LOCATION        = 'SET_USER_LOCATION'
const SET_FAVORITES_LOCATION   = 'SET_FAVORITES_LOCATION'
const SET_TO_TRY_LOCATION      = 'SET_TO_TRY_LOCATION'
const SET_FRIENDS_LOCATION     = 'SET_FRIENDS_LOCATION'
const SET_FOLLOWING_LOCATION   = 'SET_FOLLOWING_LOCATION'
const SET_TRENDING_LOCATION    = 'SET_TRENDING_LOCATION'
const SET_FOLLOWER_LOCATION    = 'SET_FOLLOWER_LOCATION'
const SET_PLACES_LOCATION      = 'SET_PLACES_LOCATION'
const SET_LOCATION_ERROR       = 'SET_LOCATION_ERROR'

export const setUserLocation = (coordinates) => {
  return {
    type: SET_USER_LOCATION,
    coordinates
  }
}

export const setUserLocationError = (error) => {
  return {
    type: SET_USER_LOCATION_ERROR
    error
  }
}

export const getCurrentLocation => ({
  return asyc (dispatch,getState) => {
    const current_location = await getCurrentLocationAPI({
      callback: (coordinates) => dispatch(setUSERLocation(coordinates)))
      errorCallback: (error) => dispatch(setUSERLocationError(error))
    })
    //set in state.
  }
})


const iniitial_location_state = fromJS({
  location: {
    long: 0,
    lat: 0
  }
})

function location(state = initial_location_state, action) {
    switch (action.type) {
        default:
            return state
    }
}

const initial_location_state = fromJS({
  latitude: 34.0522,
  longitude: -118.2437
})

const userLocation = (state = initial_location_state, action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return state.merge({
        longitude: action.coords.longitude,
        latitude: action.coords.latitude
      })
  }
}

const initial_state = fromJS({
    current_user_location: {},
    is_fetching: false,
    error: false,
    socket: null,
    radius: 10,
    error_location_object: {}
})

export default function locations(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_LOCATION:
        return state.merge({
          current_user_location: state.set('current_user_location',
          userLocation(state.get('current_user_location'), action))
        })
      default:
          return state
    }
}
