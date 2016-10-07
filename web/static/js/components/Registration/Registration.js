import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { error } from './styles.css'
import { registrationContainer, connect } from 'react-redux'
import * as userActions from 'redux/modules/users'
import { push } from 'react-router-redux'
import validate from './validate'
import { renderErrors } from 'utils/userFunctions'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

let Registration = (props) => {
    //could also user handleSubmit(() => register)
    const { handleSubmit, pristine, reset, submitting, register } = props
    return (
      <div className={registrationContainer}>
        <form onSubmit={::this._handleSubmit}>
            <div className="field">
              <input ref="firstName" type="text" placeholder="First name" required={true} />
              {renderErrorsFor(errors, 'first_name')}
            </div>
            <div className="field">
              <input ref="lastName" type="text" placeholder="Last name" required={true} />
              {renderErrorsFor(errors, 'last_name')}
            </div>
            <div className="field">
              <input ref="email" type="email" placeholder="Email" required={true} />
              {renderErrorsFor(errors, 'email')}
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required={true} />
              {renderErrorsFor(errors, 'password')}
            </div>
            <div className="field">
              <input ref="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
            <button type="submit">Sign up</button>
        </form>
        <Link to="/sign_in">{'Sign in'}</Link>
      </div>
    )
}

RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterForm)

RegisterForm = connect(
    null,
    userActions
)(RegisterForm)

export default Registration
