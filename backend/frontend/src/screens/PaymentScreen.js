import React, {useState, useEffect, useRef} from 'react'
import { useLocation, useNavigate   } from 'react-router-dom'
import { Button, Form , Col} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {

    const history = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const formRef = useRef()

    if(!shippingAddress.address){
        history(`/shipping`)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history(`/placeorder`)
    }
    const handlePaymentMethodChange = (e) => {
        const selectedMethod = e.target.value
        setPaymentMethod(selectedMethod)
      }
      useEffect(() => {
        const paypalRadioButton = formRef.current.querySelector('#paypal');
        const cashRadioButton = formRef.current.querySelector('#cash');
    
        if (paymentMethod === 'PayPal or Credit Card') {
          paypalRadioButton.checked = true;
          cashRadioButton.checked = false;
        } else if (paymentMethod === 'Cash') {
          cashRadioButton.checked = true;
          paypalRadioButton.checked = false;
        } else {
          cashRadioButton.checked = false;
          paypalRadioButton.checked = false;
        }
      }, [paymentMethod]);

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form ref={formRef} onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    value='PayPal or Credit Card'
                    checked={paymentMethod === 'PayPal or Credit Card'}
                    onChange={handlePaymentMethodChange}
                    >
                    </Form.Check>
                </Col>
                <Col>
                <Form.Check
                type='radio'
                label='Cash'
                id='cash'
                name='paymentMethod'
                value='Cash'
                checked={paymentMethod === 'Cash'}
                onChange={handlePaymentMethodChange}
                >
                    
                </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary' className='btn-block'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
