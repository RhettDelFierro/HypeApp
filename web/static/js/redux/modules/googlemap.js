import { fromJS } from 'immutable'
import { googlemapHelper } from 'utils/locationsFunctions'

const SET_MAP = 'SET_MAP'
const SET_MAP_LOCATION  = 'SET_MAP_LOCATION'
const SET_MAP_ZOOM      = 'SET_MAP_ZOOM'
const SET_MAP_ERROR     = 'SET_MAP_ERROR'

export const setMapLocation = ({ coords }) => (
  {
    type: SET_MAP_LOCATION,
    coords
  }
)

//concat into state (the cheaper operation, adding it to the start).
export const makeMapMarker = ({ place }) => {}
//probbaly will be passed through onChange.
export const setMapZoom = ({ value }) => ({ type: SET_MAP_ZOOM, value })

//should take any value. Off the start send it the user value.
export const setMapOptions = (coordinates) => (
  async (dispatch,getState) => {
    dispatch(setMapLocation(coordinates))
  }
)

export const setMapError = (error) => (
  {
    type: SET_MAP_ERROR,
    error
  }
)


const iniitial_map_state = fromJS({
  location: {
    lng: -118.2437,
    lat: 34.0522
  }
})

function centerLocation(state = initial_map_state, action) {
    switch (action.type) {
      case SET_MAP_LOCATION:
        return state.merge({
          lat: action.coords.latitude,
          lng: action.coords.longitude
        })
      default:
          return state
    }
}

const initial_state = fromJS({
    minZoom: 8,
    maxZoom: 18,
    zoom: 14,
    lng: -118.2437,
    lat: 34.0522,
    radius: 10000,
    map_error: '',
    google_map: {}
})

export default function googlemap(state = initial_state, action) {
    switch (action.type) {
      case SET_MAP_LOCATION:
        return state.merge({
          lat: action.coords.latitude,
          lng: action.coords.longitude
        })
      case SET_MAP_ZOOM:
        return state.merge({
          zoom: action.value
        })
      case SET_MAP_ERROR:
        return state.merge({
          map_error: action.error
        })
      default:
          return state
    }
}
