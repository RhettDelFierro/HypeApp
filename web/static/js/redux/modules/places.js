import { fromJS } from 'immutable'

const initialState = fromJS({
    rating: 0,
    upVotes: 0,
    downVotes: 0,
    reviews: [],
    isFetching: false,
    socket: null,
    errorPlacesObject: {}
})

export default function places(state = initialState, action) {
        default:
            return state
    }
}
