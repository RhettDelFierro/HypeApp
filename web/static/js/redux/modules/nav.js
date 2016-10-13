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
  show_feed: true,
  show_login: false,
})

export default function places(state = initial_state, action) {
    switch (action.type) {
        default:
            return state
    }
}
