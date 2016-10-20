import { Socket, Presence } from 'phoenix'
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
    this.configChannel = this.configChannel.bind(this)
  }

  componentDidMount() {
    this.props.setCurrentPlace(this.props.place_id)
    this.socket = new Socket('/socket',{
      logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) },
      params: socketParams()
    })
    this.socket.onError((error) => console.log(error))
    this.socket.onClose((close) => console.log('I closed the socket to channel', this.channel))
    this.socket.connect()
    this.configChannel()
  }

  configChannel() {
  this.presenceChannel = this.socket.channel(`place:${this.props.place_id}`)
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
        console.log('heres id:',id)
        console.log(`${id} succesfully joined the active_users topic.`)
      })
}
  //channel methods should go here:

  //I will eventually put the presenceChannel a a redux store then
  //trigger events based on the change in Presence state.
  configPlaceChannel() {
    this.channel = this.socket.channel(`place:${this.props.place_id}`)
    this.channel.join()
    .receive("ok", ({ reviews }) => {
      this.props.setCurrentPlace(`place:${this.props.place_id}`)
        // this.setState({
        //   reviews: this.state.reviews.concat([reviews])
        // })
      })
    .receive("error", (error) => {
      this.props.setCurrentPlaceError(`error joining place:${this.props.place_id}`)
      console.log(error)
        this.setState({
          messages,
          currentRoom: room
        })
      })
  }


  render() {
    return (
      <CheckPlace {...this.props} />
    )
  }
}

function mapStateToProps({ users, post, places }, ownProps) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting'),
    current_place: places.get('current_place'),
    place_id: ownProps.params.place_id
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
