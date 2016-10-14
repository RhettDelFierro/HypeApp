import { fromJS } from 'immutable'

const OPEN_POST   = 'OPEN_POST'
const CLOSE_POST  = 'CLOSE_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

export const open_post  = () => ({ type: OPEN_POST })
export const close_post = () => ({ type: CLOSE_POST })
export const update_post_text = (post_text) => (
  { type: UPDATE_POST_TEXT, post_text })

export const submit_post = () => {
  return (dispatch,getState) => {
    //update channel
    //update DB (review controller route.)
    dispatch(close_post())
  }
}

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
          post_text: '',
          is_posting: false
        })
      case UPDATE_POST_TEXT:
          return state.merge({
            post_text: action.post_text
          })
      default:
          return state
    }
}
