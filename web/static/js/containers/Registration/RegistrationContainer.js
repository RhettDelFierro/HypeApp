import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from 'redux/modules/whatever'
import { Registration } from 'components'

class RegistrationContainer extends Component {
  constructor(props) {
    super(props)
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

    dispatch(Actions.signUp(data));
  }

  render() {
    return (
      <Registration />
    )
  }
}

function mapStateToProps({}) {
  return {

  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
