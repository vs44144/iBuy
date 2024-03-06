import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap' 
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux' 
import Loader from '../components/Loader' 
import Message from '../components/Message' 
import FormContainer from '../components/FormContainer' 
import { listShembujetepareDetails, updateShembullipare } from '../actions/shembullipareActions' 
import {  SHEMBULLIPARE_UPDATE_RESET } from '../constants/shembullipareConstants'

function ShembulliPareEditScreen() {
    const history = useNavigate() 
    const location = useLocation() 
    const dispatch = useDispatch() 
    const { id } = useParams() 
    const shembullipareId = id 
  
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const [uploading, setUploading] = useState(false)
      
    const shembullipareDetails = useSelector((state) => state.shembullipareDetails) 
    const { error, loading, shembullipare } = shembullipareDetails 

    const shembullipareUpdate = useSelector(state => state.shembullipareUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = shembullipareUpdate
  
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SHEMBULLIPARE_UPDATE_RESET })
            history('/admin/shembulliparelist')
        } else {
            if (!shembullipare.name || shembullipare.shembulliPareId !== Number(shembullipareId)) {
                dispatch(listShembujetepareDetails(shembullipareId))
            } else {
                setName(shembullipare.name)
                setType(shembullipare.type)
                setImage(shembullipare.image)
                setIsDeleted(shembullipare.isDeleted)
            }
        }
    }, [dispatch, shembullipare, shembullipareId, history, successUpdate])
  
    const submitHandler = (e) => {
        // console.log('U perditesua')
        e.preventDefault()
        dispatch(updateShembullipare({
            shembulliPareId: shembullipareId,
            name,
            type,
            image,
            isDeleted,
        }))
    } 
  
    const uploadFileHandler = async (e) => {
        // console.log('Image is uploaded')
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('shembulliPareId', shembullipareId)

        setUploading(true)

        try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

          const { data } = await axios.post('/api/shembujtepare/upload/', formData, config)


          setImage(data)
          setUploading(false)

        } catch (error) {
            setUploading(false)
        }
      }


    return (
      <div>
        <Link to="/admin/shembulliparelist/">Go Back</Link>

  
        <FormContainer>
          <h1>Edit Shembulli pare</h1>
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


              <Form.Group controlId="image">
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
              </Form.Group>

              { uploading && <Loader />} 

              <Form.Group controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control

                  type="text"
                  placeholder="Enter Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                ></Form.Control>
              </Form.Group>
    

              <Button type="submit" variant="primary">
                Update Shembulli Pare
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    ) 
}

export default ShembulliPareEditScreen
