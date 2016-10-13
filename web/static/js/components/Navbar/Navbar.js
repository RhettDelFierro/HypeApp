import React, { PropTypes, Component} from "react"
import { Link } from 'react-router'
import { navbarContainer } from './styles.css'

const Navbar = ({is_authed }) => {
        return (
            <div className={navbarContainer}>
              
                <Link to={'/places'}>{'Sign In'}</Link>

            </div>
        )
}

const { bool } = PropTypes
Navbar.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired
}

export default Navbar
