import axios from 'axios'
import uuid from 'uuid'
import { Socket } from 'phoenix'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText)
    error.response = response.response.data;
    throw error;
  }
}

export function setToken({ token_name = 'phoenixAuthToken', token}) {
  window.sessionStorage.setItem(token_name, token)
}

export function getToken({ token_name = 'phoenixAuthToken' }) {
  return window.sessionStorage.getItem(token_name)
}

export function removeToken({ token_name = 'phoenixAuthToken', token}) {
  window.sessionStorage.removeItem(token_name)
}

export async function registerUserAPI({ data }) {
    try {
        const response = await axios.post("/api/v1/registrations", {
            user: data
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        setToken({token: response.data.jwt})
        //window.sessionStorage.setItem('phoenixAuthToken', response.data.jwt)
        return response.data.user
    } catch (error) {
      //we send back 422 on the server if something went wrong,
      //but 422 isn't an error.
      //The catch block in the thunk won't fire
      //unless we handle it as an error.
      const error_object = checkStatus(error)
      return error_object.response
    }
}

export async function loginUserAPI({ data }) {
    try {
        const response = await axios.post("/api/v1/sessions", {
            session: data
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        setToken({ token: response.data.jwt })
        //window.sessionStorage.setItem('phoenixAuthToken', response.data.jwt)
        return response.data.user
    } catch (error) {
      console.log(error)
      const error_object = checkStatus(error)
      return error_object.response
    }
}

export async function getCurrentUserAPI() {
    try {
        const authToken = getToken('phoenixAuthToken')
        const response = await axios.get("/api/v1/current_user", {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return response.data.user
    } catch (error) {
      const error_object = checkStatus(error)
      return error_object.response
    }
}

export async function logoutAPI() {
    try {
        const response = axios.delete('/api/v1/sessions', {
            headers: {
              // make another function to get the auth token instead?
                'Authorization': getToken('phoenixAuthToken'),
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        //sessionStorage.removeItem('phoenixAuthToken')
        removeToken('phoenixAuthToken')
        return response
    } catch (error) {
        console.log(error)
    }
}

function makeAnonUser() {
  if (!localStorage.hypeapp_uuid) {
     localStorage.hypeapp_uuid = uuid.v4()
   }

   return localStorage.hypeapp_uuid
}

export function socketParams() {
  const token = getToken('phoenixAuthToken')
  const params = token ? { token } : { anonymous_user: makeAnonUser() }
  return params
}

export function userSocketAPI({ user_id, callback, errorCallback }) {
  const token = getToken('phoenixAuthToken')
  const params = token ? { token } : { anonymous_user: user_id }
  // build a new socket connection and pass in the path ('/socket') where
  // the server is listening along with the jwt token and a logger as option params:
  const socket = new Socket('/socket', {
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) },
    params
  });
  //connect it.
  socket.onError((error) => errorCallback('user socket connection error'))
  socket.onClose(() => console.log('The user socket connection was closed.'))
  return socket
}

export function userConnectionChannelAPI({ socket }){
  //channel variable with the topic we want to subscribe to (users) and
  //also it's subtopic (our user's id)
  const channel = socket.channel(`users:${user_id}`)
  channel.join() //join the channel.
  .receive('ok', callback({ user_conn: { socket, channel } }))
  .receive('error', errorCallback('user channel connection error'))
}
