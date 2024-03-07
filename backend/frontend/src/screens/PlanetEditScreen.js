import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap' 
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux' 
import Loader from '../components/Loader' 
import Message from '../components/Message' 
import FormContainer from '../components/FormContainer' 
import { listPlanetDetails, updatePlanet } from '../actions/planetActions' 
import {  PLANET_UPDATE_RESET } from '../constants/planetConstants'

function PlanetEditScreen() {
    const history = useNavigate() 
    const location = useLocation() 
    const dispatch = useDispatch() 
    const { id } = useParams() 
    const planetId = id 
  
    const [name, setName] = useState('') 
    const [shembull, setShembull] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
  
    const planetDetails = useSelector((state) => state.planetDetails) 
    const { error, loading, planet } = planetDetails 

    const planetUpdate = useSelector(state => state.planetUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = planetUpdate
  
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PLANET_UPDATE_RESET })
            history('/admin/planetlist')
        } else {
            if (!planet.name || planet._id !== Number(planetId)) {
                dispatch(listPlanetDetails(planetId))
            } else {
                setName(planet.name)
                setShembull(planet.shembull)
                setDescription(planet.description)
            }
        }
    }, [dispatch, planet, planetId, history, successUpdate])
  
    const submitHandler = (e) => {
        // console.log('U perditesua')
        e.preventDefault()
        dispatch(updatePlanet({
            _id: planetId,
            name,
            shembull,
            description
        }))
    } 
  
    // const uploadFileHandler = async (e) => {
    //     // console.log('Image is uploaded')
    //     const file = e.target.files[0]
    //     const formData = new FormData()

    //     formData.append('image', file)
    //     formData.append('planet_id', planetId)

    //     setUploading(true)

    //     try {
    //       const config = {
    //           headers: {
    //               'Content-Type': 'multipart/form-data'
    //           }
    //       }

    //       const { data } = await axios.post('/api/planets/upload/', formData, config)


    //       setImage(data)
    //       setUploading(false)

    //     } catch (error) {
    //         setUploading(false)
    //     }
    //   }


    return (
      <div>
        <Link to="/admin/planetlist/">Go Back</Link>

  
        <FormContainer>
          <h1>Edit Planet</h1>
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


              {/* <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control

                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                
              </Form.Group>

              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control 
                    type="file" 
                    placeholder='Choose File'
                    multiple 
                    onChange={uploadFileHandler}
                />
              </Form.Group> */}

              { uploading && <Loader />} 

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
                Update Planet
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    ) 
}

export default PlanetEditScreen
