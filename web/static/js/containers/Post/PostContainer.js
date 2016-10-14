import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as postActionCreators from 'redux/modules/post'
import { Post } from 'components'
import { push } from 'react-router-redux'

class PostContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const authToken = window.sessionStorage.getItem('phoenixAuthToken')
    if (!this.props.is_authed && authToken) {
      this.props.getCurrentUser();
    } else if (!authToken) {
      this.props.change_route('/sign_in')
      return
    }
  }

  componentWillUpdate(newProps) {
    const authToken = window.sessionStorage.getItem('phoenixAuthToken')
    if (!newProps.is_authed && authToken) {
      this.props.getCurrentUser();
    } else if (!authToken) {
      this.props.change_route('/sign_in')
      return
    }
  }

  render() {
    return (
      <Post {...this.props} />
    )
  }

}

function mapStateToProps({ users, post }) {
  return {
    user_id: users.getIn(['current_user','id']),
    post_text: post.get('post_text')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      ...userActionCreators,
      ...postActionCreators,
      change_route: (url) => push(url),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
