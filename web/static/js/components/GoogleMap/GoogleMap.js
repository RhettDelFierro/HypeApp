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
    this.createPlaceMarkers = this.createPlaceMarkers.bind(this)
    // this.createInfoWindow = this.createInfoWindow.bing(this)
    // this.handleZoomChange = this.handleZoomChange.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.map = this.createMap()
    // this.map = this.createMap()
    //this.createMarker()
    //this.getMarkers() // don't think you have to call props.getPlaces this here.

    // google.maps.event.addListener(map, "zoom_changed", this.handleZoomChange)
    // google.maps.event.addListener(map, "drag", this.handleDrag)
  }
  //on latitude or longitude change, google maps api should update location.
  componentDidUpdate(prevProps,prevState) {
    if (prevProps.lat != this.props.lat || prevProps.lng != this.props.lng) {
      //this.map = this.createMap()
      const center = new google.maps.LatLng(this.props.lat, this.props.lng)
      this.map.setCenter(center)
      //this.createPlaceMarkers(this.props.places)
      //this.marker.setMap(null) <- might want to run this on everything.
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.places != nextProps.places && this.props.places_ready) {
      this.createPlaceMarkers(nextProps.places)
    }
  }

  // componentWillUpdate(nextProps,nextState){
  //     // console.log('current places props:', this.props.places)
  //     // console.log('next places props:', nextProps.places)
  //   if (this.props.places != nextProps.places) {
  //     this.createPlaceMarkers(nextProps.places)
  //   }
  //     // this.createPlaceMarkers(this.props.places)
  //     //this.createPlaceMarkers(this.props.places)
  // }

  createPlaceMarkers(places) {
    places.forEach((v) => {
      let marker =  new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(v.getIn(['coordinates','lat']), v.getIn(['coordinates','lng']))
      })
      this.setInfo(marker, v)
    })
  }

  setInfo(marker,place) {
    let infowindow = new google.maps.InfoWindow({
    content: this.generateInfoElement(place)
    });
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
    console.log(infowindow)
  }

  generateInfoElement(place) {
    return (
      `<div>
        <p>${place.get('name')}</p>
        <p>rating ${place.get('rating')}</p>
        <img height=50px width=50px src="${place.get('image_url')}"/>
       </div>`
   )
  }

  createMap() {
    //get your coordinates from Redux.
    const mapCanvas = this.mapNode
    const lat = this.props.lat
    const lng = this.props.lng
    console.log(lat,lng)
    const mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: this.props.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'satellite']
          }
    }
    return new google.maps.Map(mapCanvas, mapOptions)

  }

  handleDrag() {

  }

  //this will be our center point.
  createCenterMarker() {
    this.marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(this.props.lat,this.props.lng)
    })
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
    zoom: googlemap.get('zoom'),
    places: places.get('places_fetched'),
    places_ready: places.get('places_ready')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...placesActionCreators, ...locationsActionCreators, ...googleMapActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap)
