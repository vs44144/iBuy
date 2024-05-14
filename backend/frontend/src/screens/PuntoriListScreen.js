import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listPuntoris, deletePuntori, createPuntori } from '../actions/puntoriActions'
import { PUNTORI_CREATE_RESET } from '../constants/puntoriConstants'

function PuntoriListScreen() {

    const dispatch = useDispatch()

    const history = useNavigate()
    const location = useLocation()

    const puntoriList = useSelector(state => state.puntoriList)
    const { loading, error, puntoris, page, pages } = puntoriList

    const puntoriDelete = useSelector(state => state.puntoriDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = puntoriDelete

    const puntoriCreate = useSelector(state => state.puntoriCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, puntori: createdPuntori } = puntoriCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch({ type: PUNTORI_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history(`/login`)
        }

        if (successCreate) {
            history(`/admin/puntori/${createdPuntori.puntoriId}/edit`)
        } else {
            dispatch(listPuntoris(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdPuntori, keyword])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this puntori')) {
            dispatch(deletePuntori(id))
        }
    }
    const createPuntoriHandler = () => {
        // console.log('U krijua')
        dispatch(createPuntori())
    }

    // Extract the base path from the current URL
    // const basePath = location.pathname;
    // console.log('Pathi',basePath)

    // console.log(puntoriList, "puntoriList")     


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Puntoris</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 d-inline-block cpb' onClick={createPuntoriHandler}>
                        <i className='fas fa-plus'></i> Krijo Puntorin
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
                                        {/* <th>AKTIV</th> */}
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                        {puntoris.map(puntori => {
                        return (
                            <tr key={puntori.id}>
                                <td>{puntori.puntoriId}</td>
                                <td>{puntori.name}</td>
                                {/* <td>{puntori.isActive}</td> */}
                                {/* <td>{puntori.isDeleted}</td> */}

                                <td>
                                    <LinkContainer to={`/admin/puntori/${puntori.puntoriId}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(puntori.puntoriId)}>
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

export default PuntoriListScreen
