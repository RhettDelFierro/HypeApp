import { Presence, Socket } from 'phoenix'
import { fromJS } from 'immutable'
import { socketParams } from 'utils/userFunctions'
import { addReviewToFeed, addVoteToFeed } from 'redux/modules/feed'
import { setTrendingPlace, setCooledPlace } from 'redux/modules/places'

const SET_USER_SOCKET   = 'SET_USER_SOCKET'
const SET_SOCKET_ERROR  = 'SET_SOCKET_ERROR'
const SET_CURRENT_PLACE_CHANNEL = 'SET_CURRENT_PLACE_CHANNEL'
const SET_HOME_CHANNEL = 'SET_HOME_CHANNEL'
const SET_PRESENCES = 'SET_PRESENCES'

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
    zip_code

    topic: "home",
    subtopics: [zip_codes]
  }
}
*/

function switchPresenceChannels({ dispatch, socket, opts }) {
  switch (opts.topic) {
    case "place":
      return dispatch(setAndJoinPresenceChannel({
        socket,
        presence_channel: `${opts.topic}:${opts.subtopic}`
        }))
    default:
      return dispatch(setSocketError("topic not found. switchChannels()"))
  }
}

function switchChannels ({ dispatch, socket, opts, zip_code }) {
  switch(opts.topic) {
    case "place":
      return dispatch(setAndJoinPlaceChannel({ place_id: opts.subtopic, params: opts.params, socket }))
    case "home":
      opts.subtopics.forEach((item) => dispatch(setAndJoinHomeChannel({ zip_code: item, socket })))
    default:
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

    if (opts.presence) {
      switchPresenceChannels({ dispatch, socket, opts: opts.presenceOpts })
    }
    switchChannels({ dispatch, socket, opts })

    dispatch(setUserSocket(socket))
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

export function setAndJoinPlaceChannel({ place_id, socket, params }) {
  return function (dispatch,getState) {
    //do I want this socket just stored in our state?
    const channel = socket.channel(`place:${place_id}`, params)
      channel.join()
        .receive("ok", ({ data }) => {
          //remove the console.log and dispatch an action to tell the user they've joined.
          //maybe like a green light next to the user name.
          console.log("YESSIR PALCE CHANNEL", data)
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
      channel.on("vote:new", payload => {
        console.log('VOTE:NEW', payload)
        dispatch(addVoteToFeed(payload))
      })
      channel.on("join_feed", payload => {
        console.log('JOIN_FEED', payload)
        dispatch(catchUpFeed(payload))
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

export function setAndJoinHomeChannel({ zip_code, socket }) {
  return function (dispatch,getState) {
    const channel = socket.channel(`home:${zip_code}`)
      channel.join()
        .receive("ok", () => {
          console.log("YESSIR HOME CHANNEL")
          dispatch(setHomeChannel({
            home_channel_name: `home:${zip_code}`,
            channel
          }))
          //dispatch(updateFeed(reviews))
        })
        .receive("error", (error) => {
          console.log('error in join place:', error)
          dispatch(setConnectionError(`error joining home:${zip_code}`))
        })
      //the payload is the full json object of the trending place_id
      //render the Place a different marker after it goes to the store.
      channel.on("trending:new", payload => {
        payload.trending = true
        dispatch(setTrendingPlace(payload))
      })
      //cooled place is for the place_id that is no longer trending.
      //cooled is default (regular marker)
      channel.on("trending:cooled", payload =>{
        dispatch(cooledPlace(fromJS(payload)))
      })
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
        dispatch(setPresences({ presence_channel, presences }))
      })
      presenceChannel.on("presence_diff", state => {
        const presences = Presence.syncDiff(getState().connections.get('presences'), state)
        dispatch(setPresences({ presence_channel, presences }))
      })
      presenceChannel.join()
        .receive("ok", (id) => {
          console.log(`${id} (you) succesfully joined the active_users topic.`)
      })
  }
}

const initial_state = fromJS({
  socket: null,
  location_channel: null,
  current_place_channel: null,
  home_channels_joined: {},
  presences: {},
  presence_channel: null,
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
          home_channels_joined: state.setIn(['home_channels_joined', action.home_channel_name], action.channel)
        })
      case SET_PRESENCES:
        return state.merge({
          presence_channel: action.presence_channel,
          presences: action.presences
        })
        default:
            return state
    }
}
