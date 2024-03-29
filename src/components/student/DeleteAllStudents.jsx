import React, { useState } from 'react'
import { deleteAllStudents } from '../actions/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAllNotify, networkErrorNotify } from '../notification';

const DeleteAllStudentsModal = (props) => {

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)
    const dispatch = useDispatch()

    const toggle = () => {
        setLoading(false)
        setModal(!modal)
    }

    const requestAction = () => {
        if (networkError) return networkErrorNotify()
        setLoading(true)
        dispatch(deleteAllStudents(userId))
        toggle()
        deleteAllNotify('All students')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Students
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Students</ModalHeader>
                <ModalBody>
                    Are you sure to delete all Students?
                </ModalBody>
                <ModalFooter>
                    <Button disabled={loading} block color="danger" onClick={requestAction}>{loading ? 'Loading' : (<><BsFillTrashFill /> OK</>)}</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllStudentsModal

