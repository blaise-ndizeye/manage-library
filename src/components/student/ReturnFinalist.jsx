import React, { useState } from 'react'
import { returnForFinalists, deleteSuccess } from '../actions/student/studentAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AiOutlineImport } from 'react-icons/ai';
import { returnNotify } from '../notification';

const FinalistReturnModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const { studentId } = props

    const toggle = () => {
        setModal(!modal)
    };

    const handleReturn = () => {
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
                    <Button block color="warning" onClick={handleReturn}><AiOutlineImport /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}
FinalistReturnModal.propTypes = {
    returnForFinalists: PropTypes.func.isRequired
}

export default connect(null, { returnForFinalists, deleteSuccess })(FinalistReturnModal)