import { fromJS } from 'immutable'

//action creators:
export const getPlaces = () => {
  return async (dispatch,getState) => {
    
  }
}


const initial_state = fromJS({
    rating: false,
    up_votes: 0,
    down_votes: 0,
    reviews: [],
    is_fetching: false,
    socket: null,
    error_places_object: {},
    trending: false,
    user_voted: false
})

export default function places(state = initial_state, action) {
    switch (action.type) {
        default:
            return state
    }
}
