import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import * as listenerActionCreators from 'redux/modules/listeners'
import { Feed } from 'components'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Feed {...this.props} />
    )
  }
}

function mapStateToProps({ users, post }) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...feedActionCreators, ...listenerActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
