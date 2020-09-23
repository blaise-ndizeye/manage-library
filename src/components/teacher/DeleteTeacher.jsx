import React, { useState } from 'react'
import { deleteTeacher, deleteSuccess } from '../actions/teacher/teacherAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteNotify } from '../notification';

const DeleteTeacher = (props) => {

  const { teacherId } = props
  const [modal, setModal] = useState(false);
  const userId = useSelector(state => state.auth.user._id)

  const toggle = () => {
    props.deleteSuccess()
    setModal(!modal)
  }

  const requestAction = () => {
    props.deleteTeacher({ userId, teacherId })
    deleteNotify('Teacher')
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        <BsFillTrashFill />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Teacher</ModalHeader>
        <ModalBody>
          Are you sure to delete this teacher?
          </ModalBody>
        <ModalFooter>
          <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}
DeleteTeacher.propTypes = {
  deleteTeacher: PropTypes.func.isRequired
}

export default connect(null, { deleteTeacher, deleteSuccess })(DeleteTeacher)

