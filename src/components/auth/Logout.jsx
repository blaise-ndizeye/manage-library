import React, { useState } from 'react'
import { logout } from '../actions/auth/authActions'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GoSignOut } from 'react-icons/go'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { logoutNotify } from '../notification'

const Logout = (props) => {

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const requestAction = async () => {
    await props.logout()
    await logoutNotify()
  }

  return (
    <>
      <NavLink className="nav-link" onClick={toggle} to="#">
        Logout
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><GoSignOut /> Logout</ModalHeader>
        <ModalBody>
          Are you sure to logout?
          </ModalBody>
        <ModalFooter>
          <Button block color="danger" onClick={requestAction}><GoSignOut /> OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}
Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)

