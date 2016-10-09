import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { push } from 'react-router-redux'
import { renderErrorsFor } from 'utils/userFunctions'
import { Field } from 'components'
import { loginContainer, loginForm, field, error, submitLogin } from './styles.css'

class Login extends Component {

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      email: this.emailNode.value,
      password: this.passwordNode.value,
    };
    this.props.loginUser({data})
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
      <form className={loginForm} onSubmit={this._handleSubmit}>
          {this._renderError()}
          <div className={field}>
            <Field inputRef={node => this.firstNameNode = node} placeholder="Email" typeOf="text"/>
            {renderErrorsFor(this.props.errors, 'first_name')}
          </div>
          <div className={field}>
          <Field inputRef={node => this.lastNameNode = node} placeholder="Password" typeOf="password"/>
            {renderErrorsFor(this.props.errors, 'last_name')}
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
    errors: users.get('errorLoginObject')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators,dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
