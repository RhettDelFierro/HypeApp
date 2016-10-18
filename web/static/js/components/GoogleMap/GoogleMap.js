import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as placesActionCreators from 'redux/modules/places'
import * as locationsActionCreators from 'redux/modules/locations'
import * as googleMapActionCreators from 'redux/modules/googlemap'
import { googleMapContainer, googleMap } from './styles.css'

class GoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.createMap = this.createMap.bind(this)
    this.createMarker = this.createMarker.bind(this)
    // this.createInfoWindow = this.createInfoWindow.bing(this)
    // this.handleZoomChange = this.handleZoomChange.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    const map = this.createMap()
    const marker = this.createMarker()
    this.props.getPlaces()

    //google.maps.event.addListener(map, "zoom_changed", this.handleZoomChange)
  }

  createMap() {
    //get your coordinates from Redux.
    const mapCanvas = this.mapNode
    const lat = this.props.lat
    const lng = this.props.lng
    const mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: this.props.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    return new google.maps.Map(mapCanvas, mapOptions)

  }

  createMarker() {

  }

  createInfoWindow() {

  }

  onOnline() {
    this.loadMaps()
  }

  onResume() {
    this.loadMaps()
  }

  onDeviceReady() {
    window.addEventListener("online", this.onOnline, false);
    window.addEventListener("resume", this.onResume, false);
  }

  loadMaps() {
    if(navigator.connection.type === Connection.NONE || google.maps) {
            return;
        }
    //$.getScript('https://maps.googleapis.com/maps/api/js?key=API_KEY&sensor=true&callback=onMapsApiLoaded');
  }

  handleZoomChange() {

  }

  render() {
    return (
      <div className={googleMapContainer}>
        <div className={googleMap} ref={(item) => this.mapNode = item}>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ places, locations, googlemap }) {
  return {
    lat: googlemap.get('lat'),
    lng: googlemap.get('lng'),
    zoom: googlemap.get('zoom')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...placesActionCreators, ...locationsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap)
