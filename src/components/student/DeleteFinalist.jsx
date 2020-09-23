import React, { useState } from 'react'
import { deleteFinalist } from '../actions/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteNotify } from '../notification';

const DeleteFinalistModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const dispatch = useDispatch()
    const { studentId } = props

    const toggle = () => setModal(!modal)

    const requestAction = () => {
        dispatch(deleteFinalist({ userId, studentId }))
        toggle()
        deleteNotify('Finalist')
    }

    return (
        <>
            <Button color="danger" onClick={toggle}>
                <BsFillTrashFill />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Finalistt</ModalHeader>
                <ModalBody>
                    Are you sure to delete this finalist borrower?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteFinalistModal

