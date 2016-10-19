import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'uuid'
import * as usersActionCreators from 'redux/modules/users'
import * as locationsActionCreators from 'redux/modules/locations'
import * as placesActionCreators from 'redux/modules/places'
import * as connectionsActionCreators from 'redux/modules/connections'
import { Home } from 'components'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //subscribe to places:local/city channel?
  }

  componentDidMount() {
    //thunk to get places nearby that were set by getCurrentLocation
    // this.props.getLocalPlaces()
    // this.props.getLocalReviews()
    //maybe here join the places:local/city channel/feed?

  //   if (!localStorage.hype_uuid) {
  //    localStorage.hype_uuid = uuid.v4()
  //  }
  //
  //  this.uuid = localStorage.hype_uuid
  //  this.props.setupUserSocketConnection({ user_id: this.uuid })
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

function mapStateToProps({ users, places }) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      ...usersActionCreators,
      ...placesActionCreators,
      ...locationsActionCreators,
      ...connectionsActionCreators},
      dispatch
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer)
