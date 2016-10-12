import { fromJS } from 'immutable'

//action creators:

//

const initialState = fromJS({
    rating: false,
    upVotes: 0,
    downVotes: 0,
    reviews: [],
    isFetching: false,
    socket: null,
    errorPlacesObject: {},
    trending: false,
    userVoted: false
})

export default function places(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
