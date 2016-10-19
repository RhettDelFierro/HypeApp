import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as connectionsActionCreators from 'redux/modules/connections'
import { CheckPlace } from 'components'

class CheckPlaceContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  //channel methods should go here:


  render() {
    return (
      <CheckPlace {...this.props} />
    )
  }
}

function mapStateToProps({ users, post, places }) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting'),
    current_place: places.get('current_place')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, ...connectionsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPlaceContainer)
