import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { push } from 'react-router-redux'
import validate from './validate'
import { renderErrorsFor } from 'utils/userFunctions'
import { Field } from 'components'
import { loginContainer, field, error, submitRegistration } from './styles.css'

class Login extends Component {

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      first_name: this.firstNameNode.value,
      last_name: this.lastNameNode.value,
      email: this.emailNode.value,
      password: this.passwordNode.value,
      password_confirmation: this.passwordConfirmationNode.value,
    };
    this.props.registerUser({data})
  }

  _renderError() {
    let { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
  return (
    <div className={loginContainer}>
      <form onSubmit={this._handleSubmit}>
          {this._renderError()}
          <div className={field}>
            <Field inputRef={node => this.firstNameNode = node} placeholder="First Name" typeOf="text"/>
            {renderErrorsFor(this.props.errors, 'first_name')}
          </div>
          <div className={field}>
          <Field inputRef={node => this.lastNameNode = node} placeholder="Last Name" typeOf="text"/>
            {renderErrorsFor(this.props.errors, 'last_name')}
          </div>
          <div className={field}>
          <Field inputRef={node => this.emailNode = node} placeholder="Email" typeOf="text"/>
            {renderErrorsFor(this.props.errors, 'email')}
          </div>
          <div className={field}>
            <Field inputRef={node => this.passWordNode = node} typeOf="password" placeholder="Password" />
            {renderErrorsFor(this.props.errors, 'password')}
          </div>
          <div className={field}>
            <Field inputRef={node => this.passwordConfirmationNode = node} placeholder="Confirm Password" typeOf="password"/>
            {renderErrorsFor(this.props.errors, 'password_confirmation')}
          </div>
          <button type={submitRegistration}>Sign up</button>
      </form>
      <Link to="/sign_in">{'Sign in'}</Link>
    </div>
  )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    errors: users.get('errorObject')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators,dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
