import React, { useState } from 'react'
import { returnForFinalists, deleteSuccess } from '../actions/student/studentAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AiOutlineImport } from 'react-icons/ai';
import { networkErrorNotify, returnNotify } from '../notification';

const FinalistReturnModal = (props) => {

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)
    const { studentId } = props

    const toggle = () => {
        setLoading(false)
        setModal(!modal)
    };

    const handleReturn = () => {
        if (networkError) return networkErrorNotify()
        setTimeout(() => setLoading(true), 1000)
        props.returnForFinalists({ studentId, userId })
        toggle()
        returnNotify()
    }

    return (
        <div>
            <Button outline color="warning" onClick={toggle}>
                <AiOutlineImport />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><AiOutlineImport /> Return For Finalist</ModalHeader>
                <ModalBody>
                    Are you sure to return this finalist's book?
          </ModalBody>
                <ModalFooter>
                    <Button block color="warning" onClick={handleReturn}>{loading ? 'Loading' : (<><AiOutlineImport /> OK</>)}</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}
FinalistReturnModal.propTypes = {
    returnForFinalists: PropTypes.func.isRequired
}

export default connect(null, { returnForFinalists, deleteSuccess })(FinalistReturnModal)