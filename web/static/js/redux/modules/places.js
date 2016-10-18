import { fromJS } from 'immutable'
import { getPlacesAPI } from 'utils/placesFunctions'

const FETCHING_PLACES = 'FETCHING_PLACES'
const FETCHING_PLACES_SUCCESS = 'FETCHING_PLACES_SUCCES'
//action creators:
export function getPlaces(coordinates) {
  return async function(dispatch,getState) {
    dispatch(fetchingPlaces())
    try {
      const places_fetched = await getPlacesAPI(coordinates)
      dispatch(fetchingPlacesSuccess(places_fetched))
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
  return {
    type: FETCHING_PLACES_SUCCESS,
    places
  }
}

const initial_place_state = fromJS({
  info: {}
})

function place(state = initial_place_state, action) {
  switch (action.type) {
    case FETCHING_PLACES_SUCCESS:
      return state.merge({
        //info: fromJS({ action.business })
      })
    default:
        return state
  }
}

const initial_state = fromJS({
    rating: false,
    up_votes: 0,
    down_votes: 0,
    places_fetched: {},
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
          places_fetched: state.set('places_fetched',
                  place(state.get('places_fetched'), action ))
        })
      default:
          return state
    }
}
