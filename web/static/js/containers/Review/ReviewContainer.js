import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import { Review } from 'components'

class ReviewContainer extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <Review {...this.props} />
    )
  }
}

function mapStateToProps({}, ownProps) {
    console.log('OWN PROPS', ownProps)
  return {
    user: ownProps.info.user,
    body: ownProps.info.body,
    timestamp: ownProps.info.timestamp
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer)
