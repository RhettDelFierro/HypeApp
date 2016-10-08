import axios from 'axios'

//will use to render errors on form.
export function renderErrorsFor(errors, ref) {
  if (!errors) return false;

  return errors.map((error, i) => {
    if (error[ref]) {
      return (
        <div key={i} className="error">
          {error[ref]}
        </div>
      );
    }
  });
}

export async function registerUserAPI({ data,errorCallBack }) {
  try {
        const response = axios.post("/api/v1/registrations", {data: {user: data}});
        window.sessionStorage.setItem('phoenixAuthToken', response.jwtToken)
        return response.user
    } catch (error) {
        let errorObject = JSON.parse(error)
        errorCallBack({errorObject: errorObject})
    }
}
