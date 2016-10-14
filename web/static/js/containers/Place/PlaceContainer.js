import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import * as postActionCreators from 'redux/modules/post'
import { Place } from 'components'
import { push } from 'react-router-redux'

class PlaceContainer extends Component {
  constructor(props) {
    super(props)
    this.handleOpenPost = this.handleOpenPost.bind(this)
  }

  handleOpenPost() {
    if (!this.props.is_authed) {
      return this.props.change_route('/sign_in')
    }
     this.props.open_post()
  }

  render() {
    return (
      <Place onOpenPost={this.handleOpenPost}/>
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
    return bindActionCreators({
      ...userActionCreators,
      ...listenerActionCreators,
      ...postActionCreators,
      change_route: (url) => push(url),
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer)
