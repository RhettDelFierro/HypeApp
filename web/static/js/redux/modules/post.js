import { fromJS } from 'immutable'

const OPEN_POST   = 'OPEN_POST'
const CLOSE_POST  = 'CLOSE_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

export const open_post  = () => { type: OPEN_POST }
export const close_post = () => { type: CLOSE_POST }
export const update_post_text = ({ text }) => { type: UPDATE_POST_TEXT, post_text}

const initial_state = fromJS({
    is_posting: false,
    post_text: ''
})

export default function post(state = initial_state, action) {
    switch (action.type) {
      case OPEN_POST:
        return state.merge({
          is_posting: true
        })
      case CLOSE_POST:
        return state.merge({
          is_posting: false
        })
      case UPDATE_POST_TEXT:
          return state.merge({
            post_text: action.text
          })
      default:
          return state
    }
}
