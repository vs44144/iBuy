import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap' 
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux' 
import Loader from '../components/Loader' 
import Message from '../components/Message' 
import FormContainer from '../components/FormContainer' 
import { listSatelliteDetails, updateSatellite } from '../actions/satelliteActions' 
import {  SATELLITE_UPDATE_RESET } from '../constants/satelliteConstants'

function SatelliteEditScreen() {
    const history = useNavigate() 
    const location = useLocation() 
    const dispatch = useDispatch() 
    const { id } = useParams() 
    const satelliteId = id 
  
    const [name, setName] = useState('') 
    const [shembull, setShembull] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
  
    const satelliteDetails = useSelector((state) => state.satelliteDetails) 
    const { error, loading, satellite } = satelliteDetails 

    const satelliteUpdate = useSelector(state => state.satelliteUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = satelliteUpdate
  
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SATELLITE_UPDATE_RESET })
            history('/admin/satellitelist')
        } else {
            if (!satellite.name || satellite._id !== Number(satelliteId)) {
                dispatch(listSatelliteDetails(satelliteId))
            } else {
                setName(satellite.name)
                setShembull(satellite.shembull)
                setDescription(satellite.description)
            }
        }
    }, [dispatch, satellite, satelliteId, history, successUpdate])
  
    const submitHandler = (e) => {
        // console.log('U perditesua')
        e.preventDefault()
        dispatch(updateSatellite({
            _id: satelliteId,
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
    //     formData.append('satellite_id', satelliteId)

    //     setUploading(true)

    //     try {
    //       const config = {
    //           headers: {
    //               'Content-Type': 'multipart/form-data'
    //           }
    //       }

    //       const { data } = await axios.post('/api/satellites/upload/', formData, config)


    //       setImage(data)
    //       setUploading(false)

    //     } catch (error) {
    //         setUploading(false)
    //     }
    //   }


    return (
      <div>
        <Link to="/admin/satellitelist/">Go Back</Link>

  
        <FormContainer>
          <h1>Edit Satellite</h1>
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
                Update Satellite
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    ) 
}

export default SatelliteEditScreen
