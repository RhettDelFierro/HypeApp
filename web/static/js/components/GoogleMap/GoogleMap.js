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
    this.setState({ map: this.createMap() })
    const marker = this.createMarker()
    this.getMarkers() // don't think you have to call props.getPlaces this here.

    google.maps.event.addListener(map, "zoom_changed", this.handleZoomChange)
    google.maps.event.addListener(map, "drag", this.handleDrag)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.lat !== this.props.lat || newProps.lng !== this.props.lng) {
      const center = new google.maps.LatLng(newProps.lat,newProps.lng)
      this.setState({ map: this.state.map.setCenter(center) })
    }
  }

  createMap() {
    //get your coordinates from Redux.
    const mapCanvas = this.mapNode
    const lat = this.props.lat
    const lng = this.props.lng
    const mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: this.props.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
          }
    }
    return new google.maps.Map(mapCanvas, mapOptions)

  }

  handleDrag() {

  }

  createMarker() {

  }

  createInfoWindow() {

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
