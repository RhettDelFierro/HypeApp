import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as placesActionCreators from 'redux/modules/places'
import { Button } from 'components'
import { voteContainer } from './styles.css'

class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = { can_vote: false }
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentDidMount() {
    //only can vote if authed.
    if (this.props.is_authed) {
      this.setState({ can_vote: true })
    }
  }

  voteDown() {
    this.props.current_place_channel.push('vote:down')
    this.setState({ can_vote: true })
  }

  voteUp() {
    this.props.current_place_channel.push('vote:up')
    this.setState({ can_vote: true })
  }

  vote(type) {
    this.params = {
      coordinates:
      vote_type: type
    }

    const params =

    this.props.current_place_channel.push('vote:new', {
      coordinates: {
        lat: this.props.current_place.getIn(['coordinates', 'lat']),
        lng: this.props.current_place.getIn(['coordinates', 'lng'])
      },
      vote_type: type
    })
    this.setState({ can_vote: true })
  }

  render() {
    return (
      <div className={voteContainer}>
        <Button styling={"vote"} onClick={(type) => this.vote(5)}
                text={"Vote Down"} disabled={this.state.can_vote} />
              <Button styling={"vote"} onClick={(type) => this.vote(6)}
          text={"Vote Up"} disabled={this.state.can_vote} />
      </div>
    )
  }
}

function mapStateToProps({ users, connections, places }) {
  return {
    is_authed: users.get('is_authed'),
    current_place_channel: connections.get('current_place_channel'),
    current_place: places.get('current_place')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
