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
    this.socket = new Socket('/socket', socketParams())
    this.socket.onError((error) => console.log(error))
    this.socket.onClose((close) => console.log('I closed the socket to channel', this.channel))
    this.socket.connect()
    this.configChannel()
  }

  //channel methods should go here:
  configChannel() {
    this.channel = this.socket.channel(`place:${this.props.id}`)
    this.channel.join()
    .receive("ok", ({ reviews }) => {
      this.props.setCurrentPlace(`place:${this.props.id}`)
        this.setState({
          reviews: this.state.reviews.concat([reviews])
        })
      })
    .receive("error", (error) => {
      this.props.setCurrentPlaceError(`error joining place:${this.props.id}`)
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
    id: ownProps.params.id
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, ...connectionsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPlaceContainer)
