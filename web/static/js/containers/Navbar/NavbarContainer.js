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
      <Navbar />
    )
  }
}

function mapStateToProps({ users, listeners }) {
  return {
    is_authed: users.get('is_authed')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
