import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap' 
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux' 
import Loader from '../components/Loader' 
import Message from '../components/Message' 
import FormContainer from '../components/FormContainer' 
import { listPuntoriDetails, updatePuntori } from '../actions/puntoriActions' 
import {  PUNTORI_UPDATE_RESET } from '../constants/puntoriConstants'

function PuntoriEditScreen() {
    const history = useNavigate() 
    const location = useLocation() 
    const dispatch = useDispatch() 
    const { id } = useParams() 
    const puntoriId = id 
  
    const [name, setName] = useState('') 
    const [shembull, setShembull] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    // const [kontrataList, setKontrataList] = useState(false)
    // const [selectedKontrata, setSelectedKontrata] = useState(null)
  
    const puntoriDetails = useSelector((state) => state.puntoriDetails) 
    const { error, loading, puntori } = puntoriDetails 

    const puntoriUpdate = useSelector(state => state.puntoriUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = puntoriUpdate
  
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PUNTORI_UPDATE_RESET })
            history('/admin/puntorilist')
        } else {
            if (!puntori.name || puntori.puntoriId !== Number(puntoriId)) {
                dispatch(listPuntoriDetails(puntoriId))
            } else {
                setName(puntori.name)
            }
        }
    }, [dispatch, puntori, puntoriId, history, successUpdate])
  
    // const fetchKontratas = async () => {
    //   const { data } = await axios.get("api/kontratas")
    //   setKontrataList(data.kontratas)
    // }

    // useEffect(() => {
    //   fetchKontratas()
    // },[])

    const submitHandler = (e) => {
        // console.log('U perditesua')
        e.preventDefault()
        dispatch(
          updatePuntori({
            puntoriId: puntoriId,
            // kontrataId: selectedKontrata,
            name
        })
      )
    } 
  

    return (
      <div>
        <Link to="/admin/puntorilist/">Go Back</Link>

  
        <FormContainer>
          <h1>Edit Puntori</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control

                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="kontrata">
                <Form.Label>Kontrata</Form.Label>
                <Form.Control

                  type="kontrata"
                  placeholder="Choose Kontrata"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
              </Form.Group> */}

              {/* {kontrataList && (
                <Form.Group controlId="kontrataId">
                  <Form.Label>Kontrata</Form.Label>
                  <Form.Select defaultValue={
                    puntori.kontrataId 
                    ? puntori.kontrataId.kontrataId
                    : "Select Kontrata"
                  }
                  on onChange={(e) => setSelectedKontrata(e.target.value)}
                  >
                    <option value={"Select Kontrata"} disabled></option>
                    {kontrataList?.map((kontrata,idx)=> {
                      return (
                        <option key={idx} value={kontrata.kontrataId}>
                          {kontrata?.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              )

              } */}



              {/* { uploading && <Loader />}  */}

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control

                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
    

              <Button type="submit" variant="primary">
                Update Puntori
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    ) 
}

export default PuntoriEditScreen
