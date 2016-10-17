import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as placesActionCreators from 'redux/modules/places'
import * as locationsActionCreators from 'redux/modules/locations'
import { googleMapContainer } from './styles.css'

class GoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.createMap = this.createMap.bind(this)
    this.createMarker = this.createMarker.bind(this)
    this.createInfoWindow = this.createInfoWindow.bing(this)
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    this.createMap()
    this.createMarker()
    this.props.getPlaces()
  }

  createMap() {
    //get your coordinates from Redux.
    const map = new google.maps.Map(,options)

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
    $.getScript('https://maps.googleapis.com/maps/api/js?key=API_KEY&sensor=true&callback=onMapsApiLoaded');
  }

  render() {
    return (
      <div className={googleMapContainer}>
        <div mapRef={(ref) => this.mapNode = ref}>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ places, locations}) {
  return {
    user_location:
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...placesActionCreators, ...locationsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap)
