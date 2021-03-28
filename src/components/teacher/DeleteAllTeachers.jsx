import React, { useState } from 'react'
import { deleteAllTeachers } from '../actions/teacher/teacherAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAllNotify, networkErrorNotify } from '../notification';

const DeleteAllTeachersModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal)

    const requestAction = () => {
        if (networkError) return networkErrorNotify()
        dispatch(deleteAllTeachers(userId))
        toggle()
        deleteAllNotify('All teachers')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Teachers
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Teachers</ModalHeader>
                <ModalBody>
                    Are you sure to delete all Teachers?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllTeachersModal

