import { fromJS } from 'immutable'

//action creators:
export const getPlace = ({  }) => {
  return async (dispatch,getState) => {
    //make call to help
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
