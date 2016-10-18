import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as locationsActionCreators from 'redux/modules/locations'
import * as placesActionCreators from 'redux/modules/places'
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
      ...locationsActionCreators},
      dispatch
    )
}

export default HomeContainer
