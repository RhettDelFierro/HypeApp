import React {Proptypes, Component}      from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { push } from 'react-router-redux'

export default function Authenticate(WrappedComponent) {
  class AuthenticatedContainer extends Component {
    componentWillMount() {
      console.log(this.props)
      const authToken = window.sessionStorage.getItem('phoenixAuthToken')
      if (!this.props.is_authed && authToken) {
        this.props.getCurrentUser();
      } else if (!authToken) {
        this.props.change_route('/sign_in')
        return
      }
    }

    componentWillUpdate(newProps) {
      const authToken = window.sessionStorage.getItem('phoenixAuthToken')
      if (!newProps.is_authed && authToken) {
        this.props.getCurrentUser();
      } else if (!authToken) {
        this.props.change_route('/sign_in')
        return
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }

  }

  const mapStateToProps = ({ users }) => {
    return {
      is_authed: users.get('is_authed'),
      current_user: users.get('current_user')
    }
  };

  const mapDispatchToProps = (dispatch) => {
      return bindActionCreators(
      {
        ...userActionCreators,
        changeRoute: (url) => dispatch(push(url))
      }
        ,dispatch
      )
  }

  return connect(mapStateToProps,mapDispatchToProps)(AuthenticatedContainer);
}
