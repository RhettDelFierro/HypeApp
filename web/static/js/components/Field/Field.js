import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from 'redux/modules/whatever'
import { classType } from './styles.css'

class Field extends Component {
  render() {
    return (
      <input className={this.props.classType} type={this.props.typeOf}
             placeholder={this.props.placeholder} ref={this.props.inputRef} required={true} />
    )
  }
}

export default Field
