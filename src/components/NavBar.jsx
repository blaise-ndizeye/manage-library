import React, { Component } from 'react'
import {
    Collapse, Navbar,
    NavbarToggler,
    Nav,
    Container
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'

import AuthLinks from './links/AuthLinks'
import UnAuthLinks from './links/UnAuthLinks'


class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        AuthLinks: PropTypes.func,
        UnAuthLinks: PropTypes.func,
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAunthenticated } = this.props.auth
        return (
            <div className="row">
                <Navbar color="dark" dark expand="sm" className="mb-0.2 col-md-12 col-sm-12">
                    <Container>
                        <NavLink className="nav-link" to={'/'}>ONLINE LIBRARY</NavLink>
                        <NavbarToggler onClick={this.toggle} />

                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto">
                                {
                                    isAunthenticated ? (
                                        <AuthLinks />
                                    ) : (
                                            <UnAuthLinks />
                                        )
                                }
                            </Nav>
                        </Collapse>
                    </Container>

                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(AppNavBar));