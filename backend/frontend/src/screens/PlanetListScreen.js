import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listPlanets, deletePlanet, createPlanet } from '../actions/planetActions'
import { PLANET_CREATE_RESET } from '../constants/planetConstants'

function PlanetListScreen() {

    const dispatch = useDispatch()

    const history = useNavigate()
    const location = useLocation()

    const planetList = useSelector(state => state.planetList)
    const { loading, error, planets, page, pages } = planetList

    const planetDelete = useSelector(state => state.planetDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = planetDelete

    const planetCreate = useSelector(state => state.planetCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, planet: createdPlanet } = planetCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch({ type: PLANET_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history(`/login`)
        }

        if (successCreate) {
            history(`/admin/planet/${createdPlanet.planetId}/edit`)
        } else {
            dispatch(listPlanets(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdPlanet, keyword])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this planet')) {
            dispatch(deletePlanet(id))
        }
    }
    const createPlanetHandler = (planet) => {
        // console.log('U krijua')
        dispatch(createPlanet())
    }

    // Extract the base path from the current URL
    const basePath = location.pathname;
    console.log('Pathi',basePath)

    console.log(planetList, "planetList")     


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Planets</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 d-inline-block cpb' onClick={createPlanetHandler}>
                        <i className='fas fa-plus'></i> Create Planet
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
                        {planets.map(planet => {
                        return (
                            <tr key={planet.id}>
                                <td>{planet.planetId}</td>
                                <td>{planet.name}</td>
                                <td>{planet.type}</td>
                                {/* <td>{planet.isDeleted}</td> */}

                                <td>
                                    <LinkContainer to={`/admin/planet/${planet.planetId}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(planet.planetId)}>
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

export default PlanetListScreen
