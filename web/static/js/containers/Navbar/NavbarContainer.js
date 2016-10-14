import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import * as navActionCreators from 'redux/modules/nav'
import { Navbar } from 'components'
import { push } from 'react-router-redux'

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
    current_user: users.get('current_user'),
    is_posting: post.get('is_posting')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
      {

        ...userActionCreators,
        ...listenerActionCreators,
        ...navActionCreators,
        changeRoute: (url) => push(url)

      }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
