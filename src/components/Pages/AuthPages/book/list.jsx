import React, { Component } from 'react'
import { Table, Container } from 'reactstrap'
import ListItem from './listItem'
import { Redirect } from 'react-router-dom'
import Loader from '../../../pageEffect/loader'
import { connect } from 'react-redux'
import { bookSuccess, searchBook } from '../../../actions/book/bookAction'
import InputForm from '../student/input'
import { GoBook } from 'react-icons/go'
import { Pagination } from '../pagination'

class BookList extends Component {
    state = {
        q: "",
        currentPage: 1,
        booksPerPage: 5
    }
    componentDidMount() {
        const { auth, bookSuccess } = this.props
        bookSuccess(auth.user._id)
    }
    componentDidUpdate() {
        const { auth, bookSuccess } = this.props
        if (!this.state.q) {
            bookSuccess(auth.user._id)
        }
    }

    onChange = async (val) => {
        const { searchBook } = this.props
        await this.setState({ q: val })
        await searchBook(this.state.q)
    }
    render() {

        const { auth, isLoading, books } = this.props
        const indexOfLastBook = this.state.currentPage * this.state.booksPerPage
        const indexOfFirstBook = indexOfLastBook - this.state.booksPerPage
        const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)

        const paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

        const singleBook = currentBooks.map((book, index) => {
            return <ListItem key={book._id}
                numOfBooks={book.numOfBooks}
                typeOfBooks={book.typeOfBooks}
                date={book.date}
                index={index}
                id={book._id}
                userId={book.userId}
            />
        })
        const noBooksFound = <h3 className="text-center text-danger display-4">No Books found!!</h3>
        if (isLoading) {
            return <Loader />
        }
        else if (!auth.isAunthenticated) {
            return <Redirect to="/" />
        }

        return <Container>
            <h2 className="display-5 text-primary"><GoBook /> Books List</h2>
            <div style={{ marginBottom: '20px' }}>
                <InputForm setQ={this.onChange} q={this.state.q} />
            </div>
            <Table responsive className="table-hover table-dark">
                <thead color="dark">
                    <tr>
                        <th>Index</th>
                        <th>Number Of Books</th>
                        <th>Type Of Books</th>
                        <th>Date Added</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {singleBook}
                </tbody>
            </Table>
            {!books.length && noBooksFound}

            {books.length > 5 && <Pagination
                dataPerPage={this.state.booksPerPage}
                totalDatas={books.length}
                paginate={paginate} />}
        </Container>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isLoading: state.book.isLoading,
    books: state.book.books
})

export default connect(mapStateToProps, { bookSuccess, searchBook })(BookList);