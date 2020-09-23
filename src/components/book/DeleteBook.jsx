import React, { useState } from 'react'
import { deleteBook, deleteSuccess } from '../actions/book/bookAction'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteNotify } from '../notification';

const DeleteBook = (props) => {

  const { bookId } = props
  const [modal, setModal] = useState(false);
  const userId = useSelector(state => state.auth.user._id)

  const toggle = () => {
    props.deleteSuccess()
    setModal(!modal)
  }

  const requestAction = () => {
    props.deleteBook({ userId, bookId })
    deleteNotify('Book')
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        <BsFillTrashFill />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><BsFillTrashFill /> Delete Book</ModalHeader>
        <ModalBody>
          Are you sure to delete this book?
          </ModalBody>
        <ModalFooter>
          <Button block color="danger" onClick={requestAction}><BsFillTrashFill /> OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}
DeleteBook.propTypes = {
  deleteBook: PropTypes.func.isRequired
}

export default connect(null, { deleteBook, deleteSuccess })(DeleteBook)

