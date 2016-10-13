import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { NavbarContainer } from 'containers'
import { mainContainer } from './styles.css'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={mainContainer}>
        <NavbarContainer />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps({ users, listeners }) {
  return {
    is_authed: users.get('is_authed')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}

export default MainContainer
