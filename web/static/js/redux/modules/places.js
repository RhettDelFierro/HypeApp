import { fromJS } from 'immutable'
import { getPlacesAPI, sortPlaces } from 'utils/placesFunctions'

const FETCHING_PLACES = 'FETCHING_PLACES'
const FETCHING_PLACES_SUCCESS = 'FETCHING_PLACES_SUCCESS'
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
    user_voted: false
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
      default:
          return state
    }
}
