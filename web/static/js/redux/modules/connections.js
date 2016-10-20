import { Presence, Socket } from 'phoenix'
import { fromJS } from 'immutable'
import { socketParams } from 'utils/userFunctions'
import { addReviewToFeed, addVoteToFeed } from 'redux/modules/feed'

const SET_USER_SOCKET   = 'SET_USER_SOCKET'
const SET_SOCKET_ERROR  = 'SET_SOCKET_ERROR'
const SET_CURRENT_PLACE_CHANNEL = 'SET_CURRENT_PLACE_CHANNEL'
const SET_HOME_CHANNEL = 'SET_HOME_CHANNEL'

/*
opts = {
  {
    presence: true,
    presenceOpts: {
      topic: ""
      subtopic: ""
    }
    topic: "place",
    subtopic: "place_id"
  }
}
*/

function switchPresenceChannels({ dispatch, socket, opts }) {
  switch (presenceOpts.topic) {
    case "place":
      return dispatch(setAndJoinPresenceChannel({
        socket,
        presence_channel: `${opts.topic}:${opts.subtopic}`
        }))
    case default:
      return dispatch(setSocketError("topic not found. switchChannels()"))
  }
}

function switchChannels ({ dispatch, socket, opts }) {
  switch(opts.topic) {
    case "place":
      return dispatch(setAndJoinPlaceChannel({ place_id: opts.subtopic, socket }))
    case "home":
      return dispatch(setAndJoinHomeChannel({ zip_code: opts.subtopic, socket }))
    case default:
      return dispatch(setSocketError("topic not found. switchChannels()"))
  }
}

export function setupSocket(opts) {

  return async function (dispatch,getState) {
    const socket = new Socket('/socket',{
      logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) },
      params: socketParams()
    })
    socket.onError((error) => dispatch(setSocketError(error)))
    socket.onClose((close) => console.log('I closed the socket to channel'))
    socket.connect()
    dispatch(setUserSocket(socket))
    if (opts.presence) {
      switchPresenceChannels({ dispatch, socket, opts })
    } else {
      switchChannels({ dispatch, socket, opts })
    }

  }
}

export function setUserSocket(socket) {
  return {
    type: SET_USER_SOCKET,
    socket
  }
}

export function setSocketError(error) {
  return {
    type: SET_SOCKET_ERROR,
    error
  }
}

function setCurrentPlaceChannel(channel) {
  return {
    type: SET_CURRENT_PLACE_CHANNEL,
    channel
  }
}

export function setAndJoinPlaceChannel({ place_id, socket }) {
  return function (dispatch,getState) {
    //do I want this socket just stored in our state?
    const channel = socket.channel(`place:${place_id}`)
      channel.join()
        .receive("ok", () => {
          console.log("YESSIR")
          dispatch(setCurrentPlaceChannel(channel))
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

function setHomeChannel({ home_channel_name, channel }) {
  return {
    type: SET_HOME_CHANNEL,
    home_channel_name,
    channel
  }
}

export function setAndJoinHomeChannel({ zip_code, zipcode }) {
  return function (dispatch,getState) {

  }
}

export function setPresences({ presence_channel, presences }) {
  return {
    type: SET_PRESENCES,
    presence_channel,
    presences
  }
}

export function setAndJoinPresenceChannel({ presence_channel, socket}) {
  return function (dispatch,getState) {
    const presenceChannel = socket.channel(presence_channel)
      presenceChannel.on("presence_state", state => {
        const presences = Presence.syncState(getState().connections.get('presences'), state)
        console.log('Presences after sync: ', presences)
        dispatch(setPresences({ presence_channel, presences }))
      })
      presenceChannel.on("presence_diff", state => {
        const presences = Presence.syncDiff(getState().connections.get('presences'), state)
        console.log('Presences after diff: ', presences)
        dispatch(setPresences({ presence_channel, presences }))
      })
      presenceChannel.join()
        .receive("ok", (id) => {
          console.log(`${id} succesfully joined the active_users topic.`)
      })
  }
}

const initial_state = fromJS({
  socket: null,
  location_channel: null,
  current_place_channel: null,
  home_channels: null,
  votes_channel: null,
  reviews_channel: null,
  replies_channel: null,
  error: null
})

export default function connections(state = initial_state, action) {
    switch (action.type) {
      case SET_USER_SOCKET:
        return state.merge({
          socket: action.socket
        })
      case SET_SOCKET_ERROR:
        return state.merge({
          error: action.error
        })
      case SET_CURRENT_PLACE_CHANNEL:
        return state.merge({
          current_place_channel: action.channel
        })
      case SET_HOME_CHANNEL:
        return state.merge({
          home_channels: state.setIn(['home_channel', action.home_channel_name],action.channel)
        })
        default:
            return state
    }
}
