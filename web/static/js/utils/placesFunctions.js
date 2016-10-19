import axios from 'axios'
import { Socket, Presence } from 'phoenix.js'
import { fromJS }  from 'immutable'

function buildURL({ coords }) {
  return `api/auth/yelp?latitude=${coords.latitude}&longitude=${coords.longitude}`
}

export async function getPlacesAPI({ coords }) {
  try {
    const url = buildURL({ coords })
    const places = await axios.get(url)
    return places.data.places
  } catch (error) {
    console.log(error)
  }
}

export function sortPlaces(places) {
  return places.map((v) => {
    return fromJS(
      {
        coordinates: {
          lat: v.coordinates.latitude,
          lng: v.coordinates.longitude
        },
        id: v.id,
        name: v.name,
        rating: v.rating,
        url: v.url,
        image_url: v.image_url
      }
    )
  })
}

export function setPlacesConnection({ yelp_id, params }) {
  //you should not have to do any of the socket connection
  //set-up for the user and anon users. The data should be in the store.

  //channel variable with the topic we want to subscribe to (users) and
  //also it's subtopic (our user's id)
  const channel = socket.channel(`users:${user_id}`)
  channel.join() //join the channel.
  .receive('ok', callback({ user_conn: { socket, channel } }))
  .receive('error', errorCallback('user channel connection error'))
}
