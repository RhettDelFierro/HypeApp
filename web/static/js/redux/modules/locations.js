import { fromJS } from 'immutable'
import { getCurrentLocationHelper } from 'utils/locationsFunctions'
import { setMapLocation } from 'redux/modules/googlemap'

const SET_USER_LOCATION        = 'SET_USER_LOCATION'
const SET_FAVORITES_LOCATION   = 'SET_FAVORITES_LOCATION'
const SET_TO_TRY_LOCATION      = 'SET_TO_TRY_LOCATION'
const SET_FRIENDS_LOCATION     = 'SET_FRIENDS_LOCATION'
const SET_FOLLOWING_LOCATION   = 'SET_FOLLOWING_LOCATION'
const SET_TRENDING_LOCATION    = 'SET_TRENDING_LOCATION'
const SET_FOLLOWER_LOCATION    = 'SET_FOLLOWER_LOCATION'
const SET_PLACES_LOCATION      = 'SET_PLACES_LOCATION'
const SET_LOCATION_ERROR       = 'SET_LOCATION_ERROR'

export function getCurrentLocation() {
  return async function (dispatch) {
    getCurrentLocationHelper({
        callback: (coordinates) => {
            //should all be thunks.
            dispatch(setUserLocation(coordinates))
            dispatch(setMapLocation(coordinates))
            //EVEN THOUGH THEY WILL RENDER ON THE MAP, THE MAP IS SEPARATE FROM THE LOCATION THESE THUNKS WILL NEED.
            //THE MAP (AND EVERYTHING ELSE) ARE PIPELINES OF THEIR OWN.
            //dispatch businesses in the area.
            //also set trending reviews in the area for the feed.
        },
        errorCallback: (error) => dispatch(setLocationError(error))
    })
  }
}

export const setUserLocation = ({ coords }) => (
  {
    type: SET_USER_LOCATION,
    coords
  }
)

export const setLocationError = (error) => (
  {
    type: SET_LOCATION_ERROR,
    error
  }
)

const initial_location_state = fromJS({
  latitude: 34.0522,
  longitude: -118.2437
})

export function userLocation(state = initial_location_state, action) {
  switch (action.type) {
    case SET_USER_LOCATION:
      return state.merge({
        longitude: action.coords.longitude,
        latitude: action.coords.latitude
      })
    default:
        return state
  }
}

const initial_state = fromJS({
    current_user_location: {},
    places_locations : {},
    is_fetching: false,
    error: false,
    socket: null,
    radius: 10000,
    location_error: ''
})

export default function locations(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_LOCATION:
        return state.set('current_user_location',
          userLocation(state.get('current_user_location'), action))
      case SET_LOCATION_ERROR:
        return state.merge({
          location_error: action.error
        })
      default:
          return state
    }
}
