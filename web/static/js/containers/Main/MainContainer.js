import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { NavbarContainer } from 'containers'
import { mainContainer } from './styles.css'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const scriptTag = document.createElement(tag), // create a script tag
        firstScriptTag = document.getElementsByTagName(tag)[0]; // find the first script tag in the document
    scriptTag.src = 'your-script.js'; // set the source of the script to your script
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); // append the script to the DOM

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3&callback=initGmaps';
    document.body.appendChild(script);
  }

  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className={mainContainer}>
        <NavbarContainer />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps({ users, listeners }) {
  return {
    is_authed: users.get('is_authed')
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
