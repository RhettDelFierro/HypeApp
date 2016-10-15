import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { push } from 'react-router-redux'
import { Field } from 'components'
import { loginContainer, loginForm, field, loginError, submitLogin } from './styles.css'

class Login extends Component {

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      email: this.emailNode.value,
      password: this.passwordNode.value,
    };

    this.props.loginUser({ data })
  }

  _renderError() {
    let { error } = this.props;

    if (!error) return false;

    return (
      <div className={loginError}>
        {error}
      </div>
    );
  }

  render() {
  return (
    <div className={loginContainer}>
      <form className={loginForm} onSubmit={(event) => this._handleSubmit(event)}>
          {this._renderError()}
          <div className={field}>
            <Field inputRef={node => this.emailNode = node} placeholder="Email" typeOf="text"/>
          </div>
          <div className={field}>
          <Field inputRef={node => this.passwordNode = node} placeholder="Password" typeOf="password"/>
          </div>
          <button type={submitLogin}>Sign In</button>
      </form>
      <Link to="/sign_up">{'Sign Up'}</Link>
    </div>
  )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    error: users.get('error_login')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
