import axios from 'axios'
import { Socket } from 'phoenix.js'

export const getCurrentLocationHelper = ({ callback, errorCallback }) => {
  return (
    navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(callback)
    : errorCallback("Geolocation is not supported by this browser.")
  )
}
