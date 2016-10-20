import { fromJS } from 'immutable'

const OPEN_FEED = 'OPEN_FEED'
const CLOSE_FEED = 'CLOSE_FEED'
const ADD_REVIEW_TO_FEED = 'ADD_REVIEW_TO_FEED'
const ADD_VOTE_TO_FEED = 'ADD_VOTE_TO_FEED'
const RESET_FEED = 'RESET_FEED'

export function open_feed() {
  return {
    type: OPEN_FEED
  }
}

export function close_feed() {
  return {
    type: CLOSE_FEED
  }
}

export function addReviewToFeed(review) {
  return {
    type: ADD_REVIEW_TO_FEED,
    review
  }
}

export function addVoteToFeed(vote) {
  return {
    type: ADD_VOTE_TO_FEED,
    vote
  }
}

export function resetFeed() {
  return {
    type: RESET_FEED
  }
}

const initial_state = fromJS({
  feed_open: false,
  feed_elements: []
})

export default function feed(state = initial_state, action) {
    switch (action.type) {
      case OPEN_FEED:
        return state.merge({
          feed_open: true
        })
      case CLOSE_FEED:
        return state.merger({
          feed_open: false
        })
      case ADD_REVIEW_TO_FEED:
      case ADD_VOTE_TO_FEED:
        return state.merge({
          feed_elements: state.get('feed_elements').concat(action.vote || action.review)
        })
      case RESET_FEED:
      default:
          return state
    }
}
