import { fromJS } from 'immutable'
import { getPlacesAPI, sortPlaces } from 'utils/placesFunctions'

const FETCHING_PLACES = 'FETCHING_PLACES'
const FETCHING_PLACES_SUCCESS = 'FETCHING_PLACES_SUCCESS'
const SET_CURRENT_PLACE = 'SET_CURRENT_PLACE'
const SET_CURRENT_PLACE_ERROR = 'SET_CURRENT_PLACE_ERROR'
//action creators:
export function getPlaces(coordinates) {
  return async function(dispatch,getState) {
    dispatch(fetchingPlaces())
    try {
      const initial_places = await getPlacesAPI(coordinates)
      const places = sortPlaces(initial_places)
      //console.log(sorted_places)
      dispatch(fetchingPlacesSuccess(places))
      //dispatch(checkID's for reviews function())
    } catch (error) {
        console.log(error)
    }
  }
}

function fetchingPlaces(){
  return {
    type: FETCHING_PLACES
  }
}

export function fetchingPlacesSuccess(places) {
  //console.log(places)
  return {
    type: FETCHING_PLACES_SUCCESS,
    places
  }
}

export function setCurrentPlace(current_place) {
  return {
    type: SET_CURRENT_PLACE,
    current_place
  }
}

export function setCurrentError(error) {
  return {
    type: SET_CURRENT_PLACE_ERROR,
    error
  }
}

const initial_place_state = fromJS({
  coordinates: {},
  id: '',
  image_url: '',
  name: '',
  rating: 5,
  url: ''

})

const initial_state = fromJS({
    rating: false,
    up_votes: 0,
    down_votes: 0,
    places_fetched: [],
    is_fetching: false,
    places_ready: false,
    socket: null,
    error: '',
    trending: false,
    user_voted: false,
    presence: {},
    current_place: '',
    current_place_error: ''
})

export default function places(state = initial_state, action) {
    switch (action.type) {
      case FETCHING_PLACES:
        state.merge({
          is_fetching: true,
          places_ready: false
        })
      case FETCHING_PLACES_SUCCESS:
        return state.merge({
          is_fetching: false,
          error: '',
          places_ready: true,
          places_fetched: action.places
        })
      case SET_CURRENT_PLACE:
          return state.merge({
            current_place: action.current_place
          })
      case SET_CURRENT_PLACE_ERROR:
          return state.merge({
            current_place_error: action.error
          })
      default:
          return state
    }
}
