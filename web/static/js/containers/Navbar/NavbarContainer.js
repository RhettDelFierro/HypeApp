import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import * as navActionCreators from 'redux/modules/nav'
import { Navbar } from 'components'

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar {...this.props} />
    )
  }
}

function mapStateToProps({ users, listeners, post }) {
  return {
    is_authed: users.get('is_authed'),
    is_posting: post.get('is_posting')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
      {
        ...userActionCreators, ...listenerActionCreators, ...navActionCreators
      }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
