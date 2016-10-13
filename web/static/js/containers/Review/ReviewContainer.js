import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from 'redux/modules/whatever'
import { Review } from 'components'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer)
