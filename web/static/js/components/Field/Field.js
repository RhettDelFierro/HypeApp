import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { field } from './styles.css'

class Field extends Component {
  render() {
    return (
      <input className={field} type={this.props.typeOf}
             placeholder={this.props.placeholder} ref={this.props.inputRef} required={true} />
    )
  }
}

export default Field
