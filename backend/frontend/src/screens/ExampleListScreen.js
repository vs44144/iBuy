import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listExamples, deleteExample, createExample } from '../actions/exampleActions'
import { EXAMPLE_CREATE_RESET } from '../constants/exampleConstants'

function ExampleListScreen() {

    const dispatch = useDispatch()

    const history = useNavigate()
    const location = useLocation()

    const exampleList = useSelector(state => state.exampleList)
    const { loading, error, examples, page, pages } = exampleList

    const exampleDelete = useSelector(state => state.exampleDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = exampleDelete

    const exampleCreate = useSelector(state => state.exampleCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, example: createdExample } = exampleCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch({ type: EXAMPLE_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history(`/login`)
        }

        if (successCreate) {
            history(`/admin/example/${createdExample._id}/edit`)
        } else {
            dispatch(listExamples(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdExample, keyword])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this example')) {
            dispatch(deleteExample(id))
        }
    }
    const createExampleHandler = (example) => {
        // console.log('U krijua')
        dispatch(createExample())
    }

    // Extract the base path from the current URL
    const basePath = location.pathname;
    console.log('Pathi',basePath)

    console.log(exampleList, "exampleList")     


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Examples</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 d-inline-block cpb' onClick={createExampleHandler}>
                        <i className='fas fa-plus'></i> Create Example
                    </Button>
                </Col>
            </Row>
            
            

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>DESCRIPTION</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                        {examples.map(example => {
                        return (
                            <tr key={example.id}>
                                <td>{example._id}</td>
                                <td>{example.name}</td>
                                <td>{example.description}</td>

                                <td>
                                    <LinkContainer to={`/admin/example/${example._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(example._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>                


            </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
                    )}
        </div>
    )
}

export default ExampleListScreen
