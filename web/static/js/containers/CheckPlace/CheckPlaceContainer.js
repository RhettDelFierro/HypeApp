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
    this.state = {
      presences:{},
      reviews: []
    }
    this.configPresenceChannel = this.configPresenceChannel.bind(this)
    this.configPlaceChannel = this.configPlaceChannel.bind(this)
  }

  //socket should also go in redux store?
  componentDidMount() {
    this.props.setupSocket()
    this.props.setCurrentPlace(this.props.place_id)
    // if (!this.props.socket) {
    //   this.props.setupSocket()
    // }
    this.configPresenceChannel()
    this.configPlaceChannel()
  }

  //I will eventually put the presenceChannel a a redux store
  configPresenceChannel() {
    console.log('socket yes or no?', this.props.socket)
  this.presenceChannel = this.props.socket.channel(`place:${this.props.place_id}`)
    this.presenceChannel.on("presence_state", state => {
      const presences = Presence.syncState(this.state.presences, state)
      console.log('Presences after sync: ', presences)
      this.setState({ presences })
    })
    this.presenceChannel.on("presence_diff", state => {
      const presences = Presence.syncDiff(this.state.presences, state)
      console.log('Presences after diff: ', presences)
      this.setState({ presences })
    })
    this.presenceChannel.join()
      .receive("ok", (id) => {
        console.log(`${id} succesfully joined the active_users topic.`)
    })
  }

  configPlaceChannel() {
    this.props.setAndJoinPlaceChannel({ place_id: this.props.place_id })
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
    socket: connections.get('socket')
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
