import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { error } from './styles.css'
import { registrationContainer, connect } from 'react-redux'
import * as userActions from 'redux/modules/users'
import { push } from 'react-router-redux'
import validate from './validate'
import { renderErrors } from 'utils/userFunctions'

class Field extends Component {
  render() {
    return (
      <input type={this.props.typeOf} placeholder={this.props.placeholder} ref={this.props.inputRef} required=true/>
    )
  }
}

class RegistrationContainer extends Component {
  componentDidMount() {

  }

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      first_name: this.refs.firstName.value,
      last_name: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    };

  }
    //could also user handleSubmit(() => register)
    render() {
    const { handleSubmit, pristine, reset, submitting, register } = props
    return (
      <div className={registrationContainer}>
        <form onSubmit={this._handleSubmit}>
            <div className="field">
              <Field inputRef={node => this.firstNameNode = node} placeholder="First Name" typeOf="text"/>
              <input ref="firstName" type="text" placeholder="First name" required={true} />
              {renderErrorsFor(errors, 'first_name')}
            </div>
            <div className="field">
            <Field inputRef={node => this.lastNameNode = node} placeholder="Last Name" typeOf="text"/>
              {renderErrorsFor(errors, 'last_name')}
            </div>
            <div className="field">
            <Field inputRef={node => this.emailNode = node} placeholder="Email" typeOf="text"/>
              {renderErrorsFor(errors, 'email')}
            </div>
            <div className="field">
              <Field inputRef={node => this.passWordNode = node} typeOf="password" placeholder="Password" />
              {renderErrorsFor(errors, 'password')}
            </div>
            <div className="field">
              <Field inputRef={node => this.passwordConfirmNode = node} placeholder="Confirm Password" typeOf="password"/>
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
            <button type="submit">Sign up</button>
        </form>
        <Link to="/sign_in">{'Sign in'}</Link>
      </div>
    )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
