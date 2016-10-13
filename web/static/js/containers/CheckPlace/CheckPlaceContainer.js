import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import { CheckPlace } from 'components'

class CheckPlaceContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CheckPlace />
    )
  }
}

function mapStateToProps({}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, ...listenerActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPlaceContainer)
