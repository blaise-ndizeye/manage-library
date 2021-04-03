import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editBook, deleteSuccess } from '../actions/book/bookAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { networkErrorNotify, updateNotify } from '../notification'

class EditBookModal extends Component {
    state = {
        modal: false,
        numOfBooks: '',
        typeOfBooks: '',
        msg: null,
        dropdownOpen: false,
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editBook: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess, networkError } = this.props
        if (networkError) {
            networkErrorNotify()
        }
        if (error !== prevProps.error) {
            this.setState({ loading: false })
            if (error.id === 'EDIT_BOOK_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    numOfBooks: '',
                    typeOfBooks: ''
                })
            }
        }

        if (this.state.modal) {
            if (!isAunthenticated) {
                return <Redirect to="/" />
            }
            else if (success) {
                this.toggle()
                deleteSuccess()
                updateNotify('book')
            }
        }
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({ loading: false })
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        let { numOfBooks, typeOfBooks } = this.state
        if (!numOfBooks) {
            numOfBooks = this.props.numOfBooks
        }
        if (!typeOfBooks) {
            typeOfBooks = this.props.typeOfBooks
        }
        const userId = this.props.user
        const bookId = this.props.bookId

        const updatedTeacher = { numOfBooks, userId, typeOfBooks, bookId }
        this.setState({ loading: true })
        this.props.editBook(updatedTeacher)
    }

    render() {
        const { numOfBooks, typeOfBooks } = this.props
        return (<>

            <Button outline color="primary" onClick={this.toggle} >
                <AiOutlineEdit />
            </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineEdit /> Edit Book</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="numOfBooks">Number Of Books</Label>
                            <Input type="number"
                                name="numOfBooks"
                                id="numOfBooks"
                                placeholder="Add Number Of Books"
                                className="mb-3"
                                defaultValue={numOfBooks}
                                onChange={this.onChange} required />

                            <Label for="typeOfBooks">Type Of Books</Label>
                            <Input type="text"
                                name="typeOfBooks"
                                id="typeOfBooks"
                                minLength="2"
                                placeholder="Add the type of books number"
                                className="mb-3"
                                defaultValue={typeOfBooks}
                                onChange={this.onChange} required />

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (<><AiOutlineEdit /> Edit</>)}
                        </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

        </>);
    }
}
const mapStateToProps = state => ({
    isAunthenticated: state.auth.isAunthenticated,
    error: state.error,
    success: state.book.success,
    user: state.auth.user._id,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { editBook, clearErrors, clearSuccess, deleteSuccess })(EditBookModal);