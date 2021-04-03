import React, { useState } from 'react'
import { deleteStudent, deleteSuccess } from '../actions/student/studentAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteNotify, networkErrorNotify } from '../notification';

const DeleteStudent = (props) => {

  const { studentId } = props
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
    setLoading(true)
    props.deleteStudent({ userId, studentId })
    toggle()
    deleteNotify('Student')
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        <BsFillTrashFill />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Student</ModalHeader>
        <ModalBody>
          Are you sure to delete this student?
          </ModalBody>
        <ModalFooter>
          <Button disabled={loading} block color="danger" onClick={requestAction}>{loading ? 'Loading' : (<><BsFillTrashFill /> OK</>)}</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}
DeleteStudent.propTypes = {
  deleteStudent: PropTypes.func.isRequired
}

export default connect(null, { deleteStudent, deleteSuccess })(DeleteStudent)

