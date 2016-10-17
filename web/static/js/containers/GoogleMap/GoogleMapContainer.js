import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as placesActionCreators from 'redux/modules/places'
import * as locationsActionCreators from 'redux/modules/locations'
import { GoogleMap } from 'components'

class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.onOnline = this.onOnline.bind(this)
    this.onResume = this.onResume.bind(this)
    this.onDeviceReady = this.onDeviceReady.bind(this)
  }

  componentDidMount() {
    window.addEventListener("deviceready", this.onDeviceReady, false);
    this.loadMaps()
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
      <GoogleMap />
    )
  }
}

function mapStateToProps({ places, locations}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...placesActionCreators, ...locationsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapContainer)
