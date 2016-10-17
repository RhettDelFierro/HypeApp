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
    this.props.getCurrentLocation()
    this.props.getLocalPlaces()
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
