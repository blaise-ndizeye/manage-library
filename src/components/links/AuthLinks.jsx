import React from 'react'
import { NavItem } from 'reactstrap'
import Logout from '../auth/Logout'
import { NavLink } from 'react-router-dom'
import CheckPasswordModal from '../auth/CheckPassword'

const AuthLinks = (props) => {
    return (
        <>
            <NavItem className="nav-item">
                <NavLink className="nav-link" to="/home">Home</NavLink>
            </NavItem>
            <NavItem>
                <CheckPasswordModal />
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    );
}

export default AuthLinks;