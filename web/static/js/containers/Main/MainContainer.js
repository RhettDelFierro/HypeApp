import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as ActionCreators from 'redux/modules/whatever'
// import {  } from 'components'
import { mainContainer } from './styles.css'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps({}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default MainContainer
