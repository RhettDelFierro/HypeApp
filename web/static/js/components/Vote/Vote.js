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
    console.log('vote up!!')
    this.props.current_place_channel.push('vote:up')
    this.setState({ can_vote: true })
  }

  render() {
    return (
      <div className={voteContainer}>
        <Button styling={"vote"} onClick={this.voteDown}
                text={"Vote Down"} disabled={this.state.can_vote} />
        <Button styling={"vote"} onClick={this.voteUp}
          text={"Vote Up"} disabled={this.state.can_vote} />
      </div>
    )
  }
}

function mapStateToProps({ users, connections }) {
  return {
    is_authed: users.get('is_authed'),
    current_place_channel: connections.get('current_place_channel')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
