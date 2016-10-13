import { fromJS } from 'immutable'

const initial_state = fromJS({
})

export default function places(state = initial_state, action) {
    switch (action.type) {
        default:
            return state
    }
}
