import React, { useState } from 'react'
import { deleteAllBooks } from '../actions/book/bookAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAllNotify, networkErrorNotify } from '../notification';

const DeleteAllBooksModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal)

    const requestAction = () => {
        if (networkError) return networkErrorNotify()
        dispatch(deleteAllBooks(userId))
        toggle()
        deleteAllNotify('All books')
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <BsFillTrashFill /> Delete All Books
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Books</ModalHeader>
                <ModalBody>
                    Are you sure to delete all books?
                </ModalBody>
                <ModalFooter>
                    <Button block
                        color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteAllBooksModal

