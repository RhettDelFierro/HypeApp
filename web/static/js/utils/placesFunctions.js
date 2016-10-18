import axios from 'axios'
import { Socket } from 'phoenix.js'

function buildURL({ coords }) {
  return `api/auth/yelp?latitude=${coords.latitude}&longitude=${coords.longitude}`
}

export async function getPlacesAPI({ coords }) {
  try {
    const url = buildURL({ coords })
    const places = await axios.get(url)
    console.log(places)
  } catch (error) {
    console.log(error)
  }
}
