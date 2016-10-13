import { fromJS } from 'immutable'

const OPEN_FEED = 'OPEN_FEED'

export const open_feed = () => { type: OPEN_FEED}

const initial_state = fromJS({
  feed_open: false,
})

export default function feed(state = initial_state, action) {
    switch (action.type) {
      case OPEN_FEED:
        return state.merge({
          feed_open: true
        })
      default:
          return state
    }
}
