import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate   } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen() {
    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector (state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
                history(redirect)
            }
        }, [history, userInfo, redirect])

    
    const submitHandler = (e) => {
        e.preventDefault()
        //console.log('Submitted')
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <h1>Sign in</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} > 
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} > 
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="btn-block" style={{ marginTop: '30px' }}> Sign In</Button>
            
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer? <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
            </Link>
            </Col>
        </Row>
        
    </FormContainer>
  )
}

export default LoginScreen
