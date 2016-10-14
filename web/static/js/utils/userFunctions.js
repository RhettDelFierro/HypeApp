import axios from 'axios'
import { Socket } from 'phoenix'

//will use to render errors on form.
export function renderErrorsFor(errors, ref) {
    if (!errors) return false;

    return errors.map((error, i) => {
        if (error[ref]) {
            return <div key={i} className = "error" > { error[ref]} </div>;
        }
    });
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

        window.sessionStorage.setItem('phoenixAuthToken', response.data.jwt)
        return response.data.user
    } catch (error_object) {
      return error_object
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

        window.sessionStorage.setItem('phoenixAuthToken', response.data.jwt)
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUserAPI() {
    try {
        const authToken = sessionStorage.getItem('phoenixAuthToken')
        const response = await axios.get("/api/v1/current_user", {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}

export async function logoutAPI() {
    try {
        const response = axios.delete('/api/v1/sessions', {
            headers: {
              // make another function to get the auth token instead?
                'Authorization': window.sessionStorage.getItem('phoenixAuthToken'),
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        sessionStorage.removeItem('phoenixAuthToken')
        return response
    } catch (error) {
        console.log(error)
    }
}

export function userConnectionAPI({ callback, errorCallback }) {
  // build a new socket connection and pass in the path ('/socket') where
  // the server is listening along with the jwt token and a logger as option params:
  const socket = new Socket('/socket', {
    // this is all getting passed to Hypeapp.UserSocket.connect/2
    params: { token: window.sessionStorage.getItem('phoenixAuthToken') },
    logger: ({ kind,msg,data }) => { console.log(`${kind}: ${msg}`, data) }
  });

  //connect it.
  socket.onError(() => errorCallback(socket))
  socket.onClose(() => console.log('The connection was closed.'))
  socket.connect();

}
