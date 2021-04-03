import React, { useState } from 'react'
import { deleteBorrowers, deleteSuccess } from '../actions/student/studentAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteNotify, networkErrorNotify } from '../notification'

const DeleteBorrower = (props) => {

    const { studentId, bookId, bookName, bookType, deleteBorrowers } = props
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const userId = useSelector(state => state.auth.user._id)
    const networkError = useSelector(state => state.auth.networkError)

    const toggle = () => {
        setLoading(false)
        props.deleteSuccess()
        setModal(!modal)
    }

    const requestAction = () => {
        if (networkError) return networkErrorNotify()
        setTimeout(() => setLoading(true), 1000)
        deleteBorrowers({ userId, studentId, bookId, bookType, bookName })
        deleteNotify('Student borrower')
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
                    <Button block color="danger" onClick={requestAction}>{loading ? 'Loading' : (<><BsFillTrashFill /> OK</>)}</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}
DeleteBorrower.propTypes = {
    deleteBorrowers: PropTypes.func.isRequired
}

export default connect(null, { deleteBorrowers, deleteSuccess })(DeleteBorrower)

