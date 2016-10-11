import axios from 'axios'

//will use to render errors on form.
export function renderErrorsFor(errors, ref) {
    if (!errors) return false;

    return errors.map((error, i) => {
        if (error[ref]) {
            return ( <
                div key = {
                    i
                }
                className = "error" > {
                    error[ref]
                } <
                /div>
            );
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
    } catch (error) {
        console.log(error)
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
        console.log('no error!:', response)
        return response.data.user
    } catch (error) {
        console.log(error)
            //return JSON.parse(error)
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
    } catch (error) {
        return error
    }
}

export async function logoutAPI() {
    try {
        const authToken = sessionStorage.getItem('phoenixAuthToken')
        const response = axtion.delete('/api/v1/sessions', {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        sessionStorage.removeItem('phoenixAuthToken')
        return response
    } catch (error) {
        return error
    }
}
