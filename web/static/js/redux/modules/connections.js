import { fromJS } from 'immutable'
import { userConnectionAPI } from 'utils/userFunctions'

const SET_USER_CONNECTION   = 'SET_USER_CONNECTION'
const SET_CONNECTION_ERROR  = 'SET_CONNECTION_ERROR'

//listeners should be on places, users, votes, reviews, replies

export function setupSocketConnection() {
  return (dispatch,getState) => {
    userConnectionAPI({
      user: getState().users.get('current_user'),
      callback: ({ user }) => {
        return dispatch(setUserConnection({ user }))
      },
      errorCallback: (error) => dispatch(setConnectionError(error))
    )
  }
}

export function setUserConnection({ user }) {
  return {
    type: SET_USER_CONNECTION,
    user
  }
}

export function setConnectionError(error) {
  return {
    type: SET_CONNECTION_ERROR,
    error
  }
}

const initial_user_connection_state = fromJS({
  socket: null,
  channel: null
})

function user_connection(state = initial_user_connection_state, action) {
  switch (action.type) {
    case SET_USER_CONNECTION:
      return state.merge({
        user_socket: fromJS(action.user.socket),
        user_channel: fromJS(action.user.channel)
      })
    default:
        return state
  }
}

const initial_state = fromJS({
  user_connection: {}
  location_channel: null,
  places_channel: null,
  votes_channel: null,
  reviews_channel: null,
  replies_channel: null,
  error: null
})

export default function connections(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_CONNECTION:
        return state.merge({
          user_connection: user_connection(state.get('user_connection'),action)
        })
      case SET_CONNECTION_ERROR:
        return state.merge({
          error: action.error
        })
        default:
            return state
    }
}
