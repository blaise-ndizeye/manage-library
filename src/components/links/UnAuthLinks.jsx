import React from 'react'
import { NavItem } from 'reactstrap'
import LoginModal from '../auth/LoginModal'
import RegisterModal from '../auth/RegisterModal'
import { NavLink } from 'react-router-dom'


const UnAuthLinks = () => {
    return (
        <>
            <NavItem className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
            </NavItem>
            <NavItem className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
            <NavItem>
                <RegisterModal />
            </NavItem>
        </>
    );
}

export default UnAuthLinks;