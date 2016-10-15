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

  render() {
    return (
      <CheckPlace {...this.props} />
    )
  }
}

function mapStateToProps({ users, post }) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, ...connectionsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPlaceContainer)
