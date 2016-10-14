import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import * as postActionCreators from 'redux/modules/post'
import { Place } from 'components'

class PlaceContainer extends Component {
  constructor(props) {
    super(props)
    this.handleOpenPost = this.handleOpenPost.bind(this)
    console.log(this.props)
  }

  handleOpenPost() {
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
    return bindActionCreators({...userActionCreators,...listenerActionCreators, ...postActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer)
