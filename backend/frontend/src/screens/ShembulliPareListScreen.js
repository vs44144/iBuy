import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listShembujtepare, deleteShembullipare, createShembullipare } from '../actions/shembullipareActions'
import { SHEMBULLIPARE_CREATE_RESET } from '../constants/shembullipareConstants'

function ShembulliPareListScreen() {

    const dispatch = useDispatch()

    const history = useNavigate()
    const location = useLocation()

    const shembullipareList = useSelector(state => state.shembullipareList)
    const { loading, error, shembujtepare, page, pages } = shembullipareList

    const shembullipareDelete = useSelector(state => state.shembullipareDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = shembullipareDelete

    const shembullipareCreate = useSelector(state => state.shembullipareCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, shembullipare: createdShembullipare } = shembullipareCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch({ type: SHEMBULLIPARE_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history(`/login`)
        }

        if (successCreate) {
            history(`/admin/shembullipare/${createdShembullipare.shembulliPareId}/edit`)
        } else {
            dispatch(listShembujtepare(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdShembullipare, keyword])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this shembullipare')) {
            dispatch(deleteShembullipare(id))
        }
    }
    const createShembullipareHandler = (shembullipare) => {
        // console.log('U krijua')
        dispatch(createShembullipare())
    }

    // Extract the base path from the current URL
    const basePath = location.pathname;
    console.log('Pathi',basePath)

    console.log(shembullipareList, "shembullipareList")     


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Shembujtepare</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 d-inline-block cpb' onClick={createShembullipareHandler}>
                        <i className='fas fa-plus'></i> Create Shembullipare
                    </Button>
                </Col>
            </Row>
            
            

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : shembujtepare ? (
                <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>TYPE</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {shembujtepare.map(shembullipare => (
                                <tr key={shembullipare.id}>
                                    <td>{shembullipare.shembulliPareId}</td>
                                    <td>{shembullipare.name}</td>
                                    <td>{shembullipare.type}</td>

                                    <td>
                                        <LinkContainer to={`/admin/shembullipare/${shembullipare.shembulliPareId}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(shembullipare.shembulliPareId)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </div>
            ) : (
                <Message variant='info'>No shembujtepare found</Message>
            )}
        </div>
    )
}

export default ShembulliPareListScreen
