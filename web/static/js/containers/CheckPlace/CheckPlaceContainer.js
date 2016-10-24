import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as connectionsActionCreators from 'redux/modules/connections'
import * as placesActionCreators from 'redux/modules/places'
import * as postActionCreators from 'redux/modules/post'
import { CheckPlace } from 'components'
import { socketParams } from 'utils/userFunctions'

class CheckPlaceContainer extends React.Component {
  constructor(props) {
    super(props)

    this.opts = {
        presence: true,
        presenceOpts: {
          topic: "place",
          subtopic: this.props.place_id,
          zip_code: this.props.zip_code
        },
        topic: "place",
        subtopic: this.props.place_id,
        params: {
            zip_code: this.props.zip_code
        }
      }
  }

  //socket should also go in redux store?
  componentDidMount() {
    if(!this.props.socket) {
        this.props.setupSocket(this.opts)
    }
  }

  render() {
    return (
      <CheckPlace {...this.props} />
    )
  }
}

function mapStateToProps({ users, post, places, connections }, ownProps) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting'),
    current_place: places.get('current_place'),
    place_id: ownProps.params.place_id,
    socket: connections.get('socket'),
    zip_code: ownProps.params.zip_code
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      ...userActionCreators,
      ...connectionsActionCreators,
      ...placesActionCreators
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPlaceContainer)
