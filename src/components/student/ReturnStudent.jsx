import React, { useState } from 'react'
import { studentReturnSuccess, deleteSuccess } from '../actions/student/studentAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AiOutlineImport } from 'react-icons/ai';
import { returnNotify } from '../notification';

const StudentReturnModal = (props) => {

    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)
    const { bookId, bookName, bookType, studentId } = props

    const toggle = () => {
        setModal(!modal)
    };

    const handleReturn = () => {
        props.studentReturnSuccess({ bookId, bookName, bookType, studentId, userId })
        returnNotify()
    }

    return (
        <div>
            <Button outline color="warning" onClick={toggle}>
                <AiOutlineImport />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><AiOutlineImport /> Return For Student</ModalHeader>
                <ModalBody>
                    Are you sure to return this student's book?
          </ModalBody>
                <ModalFooter>
                    <Button block color="warning" onClick={handleReturn}><AiOutlineImport /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}
StudentReturnModal.propTypes = {
    studentReturnSuccess: PropTypes.func.isRequired
}

export default connect(null, { studentReturnSuccess, deleteSuccess })(StudentReturnModal)