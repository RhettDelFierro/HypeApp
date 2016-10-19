import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as connectionsActionCreators from 'redux/modules/connections'
import * as postActionCreators from 'redux/modules/post'
import { Place } from 'components'
import { push } from 'react-router-redux'

class PlaceContainer extends Component {
  constructor(props) {
    super(props)
    //this.handleOpenPost = this.handleOpenPost.bind(this)
  }

  componentDidMount() {
    //set-up the review feed on this smart component.
    //will make an AJAX call (thunk) to yelp from this container.
    //for now, just use dummy data.
    //this.props.getPlace()

    //set up the socket and the channel methods on the component.
  }

  componentWillUnmount() {
    this.props.leavePlace()
  }

  handleOpenPost() {
     this.props.open_post()
  }

  render() {
    return (
      <Place {...this.props} />
    )
  }
}

function mapStateToProps({ users, post }) {
  return {
    is_authed:  users.get('is_authed'),
    is_posting: post.get('is_posting'),
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      ...userActionCreators,
      ...connectionsActionCreators,
      ...postActionCreators,
      change_route: (url) => push(url),
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer)
