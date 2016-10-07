import React, { PropTypes,Component } from "react"
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
//import * as ActionCreators from 'redux/modules/whatever'
import { Home } from 'components'

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Home />
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

export default HomeContainer
