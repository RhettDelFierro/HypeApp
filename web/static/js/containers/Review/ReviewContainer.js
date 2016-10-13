import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import { Review } from 'components'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Review />
    )
  }
}

function mapStateToProps({}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer)