import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate   } from 'react-router-dom'
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {

   const history = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)


    const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(saveShippingAddress({address, city, postalCode, country, phoneNumber}))
      history(`/payment`)
  }


  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
               <Form.Label>Address</Form.Label>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='Enter Address' 
                    value={address ? address : ''} 
                    onChange={(e) => setAddress(e.target.value)} > 
                </Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
               <Form.Label>City</Form.Label>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='Enter City' 
                    value={city ? city : ''} 
                    onChange={(e) => setCity(e.target.value)} > 
                </Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
               <Form.Label>Postal Code</Form.Label>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='Enter postal code' 
                    value={postalCode ? postalCode : ''} 
                    onChange={(e) => setPostalCode(e.target.value)} > 
                </Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
               <Form.Label>Country </Form.Label>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='Enter country' 
                    value={country ? country : ''} 
                    onChange={(e) => setCountry(e.target.value)} > 
                </Form.Control>
          </Form.Group>

          <Form.Group controlId='phoneNumber'>
               <Form.Label>Phone Number </Form.Label>
                  <Form.Control 
                    required 
                    type='text' 
                    placeholder='Enter Phone Number' 
                    value={phoneNumber ? phoneNumber : ''} 
                    onChange={(e) => setPhoneNumber(e.target.value)} > 
                </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Continue
        </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
