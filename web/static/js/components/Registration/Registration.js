import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { push } from 'react-router-redux'
//import { renderErrorsFor } from 'utils/userFunctions'
import { registrationContainer, field, errorStyle, submitRegistration } from './styles.css'
import { Field } from 'components'

class Registration extends Component {
  constructor() {
    super()
  }

  componentDidMount() {

  }

  comonentWillReceiveProps(newProps) {
    console.log('new errors', newProps)
  }

  _handleSubmit(e) {
    e.preventDefault();

    const data = {
      first_name: this.firstNameNode.value,
      last_name: this.lastNameNode.value,
      email: this.emailNode.value,
      password: this.passwordNode.value,
      password_confirmation: this.passwordConfirmationNode.value,
    }

    this.props.registerUser({ data })
  }

  _renderErrorsFor(errors, ref) {
    if (!errors) return false;

    return errors.map((error, i) => {
        if (error.get(ref)) {
            return <div key={i} className={errorStyle} >{error.get(ref)}</div>
        }
    });
  }

    //could also user handleSubmit(() => register)
    render() {
    return (
      <div className={registrationContainer}>
        <form onSubmit={(event) => this._handleSubmit(event)}>
            <div className={field}>
              <Field inputRef={node => this.firstNameNode = node} placeholder="First Name" typeOf="text"/>
              {this._renderErrorsFor(this.props.errors, 'first_name')}
            </div>
            <div className={field}>
            <Field inputRef={node => this.lastNameNode = node} placeholder="Last Name" typeOf="text"/>
              {this._renderErrorsFor(this.props.errors, 'last_name')}
            </div>
            <div className={field}>
            <Field inputRef={node => this.emailNode = node} placeholder="Email" typeOf="text"/>
              {this._renderErrorsFor(this.props.errors, 'email')}
            </div>
            <div className={field}>
              <Field inputRef={node => this.passwordNode = node} typeOf="password" placeholder="Password" />
              {this._renderErrorsFor(this.props.errors, 'password')}
            </div>
            <div className={field}>
              <Field inputRef={node => this.passwordConfirmationNode = node} placeholder="Confirm Password" typeOf="password"/>
              {this._renderErrorsFor(this.props.errors, 'password_confirmation')}
            </div>
            <button type={submitRegistration}>Sign up</button>
        </form>
        <Link to="/sign_in">{'Sign In'}</Link>
      </div>
    )
    }
}

const mapStateToProps = ({ users }) => {
  return {
    errors: users.get('error_register_object')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
