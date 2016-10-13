import { fromJS } from 'immutable'

const OPEN_SIGN_IN  = 'OPEN_SIGN_IN'
const CLOSE_SIGN_IN = 'CLOSE_SIGN_IN'

export function open_form() {
  return {
    type: OPEN_SIGN_IN
  }
}

export function close_form() {
  return {
    type: CLOSE_SIGN_IN
  }
}

const initial_state = fromJS({
  show_discussion: true,
  show_login: false,
})

export default function places(state = initial_state, action) {
    switch (action.type) {
      case OPEN_SIGN_IN {
        return state.merge({
          
        })
      }
        default:
            return state
    }
}
