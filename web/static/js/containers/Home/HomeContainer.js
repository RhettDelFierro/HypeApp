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
    this.props.getCurrentLocation()
    // this.opts = {
    //     presence: true,
    //     presenceOpts: {
    //       topic: "Home",
    //       subtopic: this.props.place_id, //multiple zipcodes
    //       zip_code: this.props.zip_code
    //     },
    //   }
    // this.props.setUserSocket()
    //subscribe to places:local/city channel?
  }

  componentWillReceiveProps(newProps) {
    // if (this.props.zip_codes != newProps.zip_codes) {
    //
    // }
  }

  componentDidMount() {
    if (!this.props.socket) {

    }
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
