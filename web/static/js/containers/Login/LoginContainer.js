import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import { Login } from 'components'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

    )
  }
}

function mapStateToProps({user}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(usersActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
