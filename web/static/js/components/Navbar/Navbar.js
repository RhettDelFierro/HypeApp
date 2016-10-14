import React, { PropTypes, Component} from "react"
import { Link } from 'react-router'
import { Button } from 'components'
import { navbarContainer } from './styles.css'

const Navbar = ({is_authed, logout, changeRoute }) => {

        return (
            <div className={navbarContainer}>

                <Link to={'/places'}>{'View a page'}</Link>
                  {is_authed
                    ? <Button onClick={logout} styling='user' text='Log Out'/>
                    : <Button onClick={() => changeRoute('/sign_in')} styling='user' text='Sign In'/>
                  }

            </div>
        )
}

const { bool, func } = PropTypes
Navbar.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired,
  logout: func.isRequired,
  changeRoute: func.isRequired
}

export default Navbar
