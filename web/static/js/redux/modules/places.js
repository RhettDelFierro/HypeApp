import { fromJS } from 'immutable'
import { getPlacesAPI, sortPlaces } from 'utils/placesFunctions'

const FETCHING_PLACES = 'FETCHING_PLACES'
const FETCHING_PLACES_SUCCESS = 'FETCHING_PLACES_SUCCES'
//action creators:
export function getPlaces(coordinates) {
  return async function(dispatch,getState) {
    dispatch(fetchingPlaces())
    try {
      const places = await getPlacesAPI(coordinates)
      const sorted_places = sortPlaces(places)
      //console.log(sorted_places)
      dispatch(fetchingPlacesSuccess({ sorted_places }))
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

export function fetchingPlacesSuccess({ sorted_places }) {
  console.log(sorted_places)
  return {
    type: FETCHING_PLACES_SUCCESS,
    sorted_places
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
    socket: null,
    error: '',
    trending: false,
    user_voted: false
})

export default function places(state = initial_state, action) {
    switch (action.type) {
      case FETCHING_PLACES:
        state.merge({
          is_fetching: true
        })
      case FETCHING_PLACES_SUCCESS:
        state.merge({
          is_fetching: false,
          error: '',
          places_fetched: state.set('places_fetched', action.sorted_places)
        })
      default:
          return state
    }
}
