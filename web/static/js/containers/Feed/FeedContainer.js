import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as listenerActionCreators from 'redux/modules/listeners'
import { Feed } from 'components'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Feed />
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
