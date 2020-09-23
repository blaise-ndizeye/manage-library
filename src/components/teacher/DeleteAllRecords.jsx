import React, { useState } from 'react'
import { deleteAllRecords } from '../actions/teacher/teacherAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAllNotify } from '../notification';

const DeleteAllTeacherRecordsModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal);

    const requestAction = () => {
        dispatch(deleteAllRecords(userId))
        toggle()
        deleteAllNotify('All teacher records')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Teacher Records
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Records</ModalHeader>
                <ModalBody>
                    Are you sure to delete all Teacher Records?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllTeacherRecordsModal

