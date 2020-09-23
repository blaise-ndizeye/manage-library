import React, { useState } from 'react'
import { deleteAccount } from '../actions/auth/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAccountNotify } from '../notification';

const DeleteAccountModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal)

    const requestAction = () => {
        dispatch(deleteAccount(userId))
        toggle()
        deleteAccountNotify()
    }

    return (
        <>
            <Button color="danger" outline onClick={toggle}>
                <BsFillTrashFill /> Delete Account
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Account</ModalHeader>
                <ModalBody>
                    Are you sure to delete your Account?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAccountModal

