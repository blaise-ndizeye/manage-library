import React, { useState } from 'react'
import { promoteStudents } from '../actions/student/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AiOutlineVerticalAlignTop } from 'react-icons/ai';
import { networkErrorNotify, promoteNotify } from '../notification';

const PromoteStudentsModal = (props) => {

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
        dispatch(promoteStudents(userId))
        toggle()
        promoteNotify()
    }

    return (
        <>
            <Button color="warning" outline onClick={toggle}>
                <AiOutlineVerticalAlignTop /> Promote All Students
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><AiOutlineVerticalAlignTop /> Promote Students</ModalHeader>
                <ModalBody>
                    Are you sure to promote all students and update the repeating ones manually?
                </ModalBody>
                <ModalFooter>
                    <Button disabled={loading} block color="danger" onClick={requestAction}> {loading ? 'Loading' : (<><AiOutlineVerticalAlignTop /> OK</>)}</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default PromoteStudentsModal

