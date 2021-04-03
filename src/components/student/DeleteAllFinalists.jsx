import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';

import { deleteAllFinalists } from '../actions/student/studentAction'
import { deleteAllNotify, networkErrorNotify } from '../notification';

const DeleteAllFinalistsModal = (props) => {

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
        setTimeout(() => setLoading(true), 1000)
        dispatch(deleteAllFinalists(userId))
        toggle()
        deleteAllNotify('All finalist borrowers')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Finalists Borrowers
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Finalists</ModalHeader>
                <ModalBody>
                    Are you sure to delete all Finalists Borrowers?
                </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}>{loading ? 'Loading' : (<><BsFillTrashFill /> OK</>)}</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllFinalistsModal

