import { fromJS } from 'immutable'
import { userChannelAPI } from 'utils/userFunctions'

const SET_USER_CONNECTION   = 'SET_USER_CONNECTION'
const SET_CONNECTION_ERROR  = 'SET_CONNECTION_ERROR'

//listeners should be on places, users, votes, reviews, replies

export function setupSocketConnection() {
  return (dispatch,getState) => {
    userChannelAPI({
      callback: (connection_info) => dispatch(setUserConnection(connection_info)),
      errorCallback: (error) => dispatch(setConnectionError(error))})
  }
}

export function setUserConnection({ connection_info }) {
  return {
    type: SET_USER_CONNECTION,
    connection_info
  }
}

export function setConnectionError({ error }) {
  return {
    type: SET_CONNECTION_ERROR,
    error
  }
}

const initial_state = fromJS({
  users_socket: null,
  users_channel: null,
  location_channel: null,
  places_channel: null,
  votes_channel: null,
  reviews_channel: null,
  replies_channel: null
})

export default function listeners(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_CONNECTION:
      return state.merge({
        users_socket: connection_info.users_socket,
        users_channel: connection_info.users_channel
      })
      case SET_CONNECTION_ERROR:

        default:
            return state
    }
}
