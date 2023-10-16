import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate,useLocation } from 'react-router-dom'

function SearchBox() {

    const history = useNavigate()
    const location = useLocation()
    
    const[keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
        history(`/?keyword=${keyword}&page=1`)
    } else {
        history('/?page=1')
    }
}

const changeHandler = (e) => {
    setKeyword(e.target.value)
    if (e.target.value === '') {
        history('/?page=1')
    }
}

    return (
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        className='mr-sm-2 ml-sm-5'
                    ></Form.Control>
                </Col>
                <Col>
                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2'
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
  )
}

export default SearchBox
