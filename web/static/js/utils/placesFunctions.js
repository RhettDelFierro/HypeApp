import axios from 'axios'
import { Socket } from 'phoenix.js'
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
