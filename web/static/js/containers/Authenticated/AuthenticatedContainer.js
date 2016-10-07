import React {Proptypes, Component}      from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

class AuthenticatedContainer extends Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;

    if (sessionStorage.getItem('phoenixAuthToken')) {
      //something here.
    } else {
      this.props.changeRoute.push('/sign_up');
    }
  }

  render() {
    // ...
  }
}

const mapStateToProps = ({}) => {
  return {
    currentUser: .get('currentUser')
  }
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators({...actionCreators, changeRoute: (url) => dispatch(push(url)) },dispatch)
    return {
      changeRoute: (url) => dispatch(push(url)),
      dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthenticatedContainer);

container
