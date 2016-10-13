import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as listenerActionCreators from 'redux/modules/listeners'
import { Place } from 'components'
import {  } from './styles.css'

class PlaceContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Place />
    )
  }
}

function mapStateToProps({}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators,...listenerActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer)
