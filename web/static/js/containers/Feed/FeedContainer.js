import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import * as connectionsActionCreators from 'redux/modules/connections'
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

function mapStateToProps({ users, post, feed }) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting'),
    feed_elements: feed.get('feed_elements')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...feedActionCreators, ...connectionsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
