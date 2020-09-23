import React, { useState } from 'react'
import { deleteBorrowers, deleteSuccess } from '../actions/teacher/teacherAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteNotify } from '../notification'

const DeleteBorrower = (props) => {

    const { teacherId, bookName, bookType, deleteBorrowers } = props
    const [modal, setModal] = useState(false);
    const userId = useSelector(state => state.auth.user._id)

    const toggle = () => {
        props.deleteSuccess()
        setModal(!modal)
    }

    const requestAction = () => {
        deleteBorrowers({ userId, teacherId, bookType, bookName })
        deleteNotify('Teacher borrower')
    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                <BsFillTrashFill />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Borrower</ModalHeader>
                <ModalBody>
                    Are you sure to delete this borrower?
          </ModalBody>
                <ModalFooter>
                    <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}
DeleteBorrower.propTypes = {
    deleteBorrowers: PropTypes.func.isRequired
}

export default connect(null, { deleteBorrowers, deleteSuccess })(DeleteBorrower)

