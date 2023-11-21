import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} className='a-tag'>
                <Card.Title as="div">
                    <strong> {product.name} </strong>
                </Card.Title>
            </Link>
        </Card.Body>

        <div className='my-3'>
            <Card.Text>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`} />
            </Card.Text>
        </div>
        <Card.Text as="h5">
            €{product.price}
        </Card.Text>
    </Card>
  )
}

export default Product
