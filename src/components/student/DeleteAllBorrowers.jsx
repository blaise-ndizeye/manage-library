import React, { useState } from 'react'
import { deleteAllBorrowers } from '../actions/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAllNotify, networkErrorNotify } from '../notification';

const DeleteAllStudentBorrowersModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal)

    const requestAction = () => {
        if (networkError) return networkErrorNotify()
        dispatch(deleteAllBorrowers(userId))
        toggle()
        deleteAllNotify('All student borrowers')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Student Borrowers
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Borrowers</ModalHeader>
                <ModalBody>
                    Are you sure to delete all Student Borrowers?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllStudentBorrowersModal

