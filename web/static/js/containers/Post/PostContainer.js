import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActionCreators from 'redux/modules/post'
import { Post } from 'components'

function mapStateToProps({ users, post }) {
  return {
    user_id: users.getIn(['current_user','id']),
    post_text: post.get('post_text')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(postActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
