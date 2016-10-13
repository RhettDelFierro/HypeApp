import React, { PropTypes, Component} from "react"
import { navbarContainer } from './styles.css'

const Navbar = ({is_authed }) => {
        return (
            <div className={navbarContainer}>
              {is_authed
                ? <Post />
                : <button>{'Sign In'}</button>
              }
            </div>
        )
}

const { bool } = PropTypes
Navbar.propTypes = {
  is_authed: bool.isRequired
}

export default Navbar
