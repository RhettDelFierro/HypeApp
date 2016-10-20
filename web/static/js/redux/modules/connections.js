import { fromJS } from 'immutable'
import { userSocketAPI } from 'utils/userFunctions'

const SET_USER_SOCKET   = 'SET_USER_SOCKET'
const SET_CONNECTION_ERROR  = 'SET_CONNECTION_ERROR'
const SET_CURRENT_PLACE_CHANNEL = 'SET_CURRENT_PLACE_CHANNEL'

//listeners should be on places, users, votes, reviews, replies

export function setupUserSocket({ user_id, params }) {
  return async function (dispatch,getState) {
    userSocketAPI({
      user_id,
      callback: (socket) => dispatch(setUserSocket(socket)),
      errorCallback: (error) => dispatch(setConnectionError(error))
    })
  }
}

export function setUserConnection(socket) {
  return {
    type: SET_USER_SOCKET,
    socket
  }
}

export function setConnectionError(error) {
  return {
    type: SET_CONNECTION_ERROR,
    error
  }
}

function setCurrentPlaceChannel(channel) {
  return {
    type: SET_CURRENT_PLACE_CHANNEL,
    channel
  }
}

export function setAndJoinPlaceChannel({ socket, place_id }) {
  return function (dispatch,getState) {
    const channel = socket.channel(`place:${place_id}`)
      channel.join()
        .receive("ok", () => {
          dispatch(setCurrentChannelPlace(channel))
          //dispatch(updateFeed(reviews))
        })
        .receive("error", (error) => {
          console.log('error in join place:', error)
          dispatch(setConnectionError(`error joining place:${place_id}`))
        })
      channel.on("review:new", payload => {
        dispatch(addReviewToFeed(payload))
      })
      channel.on("vote:new", payload =>{
        dispatch(addVoteToFeed(payload))
      })
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
        user_socket: fromJS(action.user_conn.socket),
        user_channel: fromJS(action.user_conn.channel)
      })
    default:
        return state
  }
}

const initial_state = fromJS({
  user_socket: {},
  location_channel: null,
  current_place_channel: null,
  votes_channel: null,
  reviews_channel: null,
  replies_channel: null,
  error: null
})

export default function connections(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_SOCKET:
        return state.merge({
          user_socket: action.socket
        })
      case SET_CONNECTION_ERROR:
        return state.merge({
          error: action.error
        })
      case SET_CURRENT_PLACE_CHANNEL:
        return state.merge({
          current_place_channel: action.channel
        })
        default:
            return state
    }
}
