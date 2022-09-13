import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../actions/productActions";

function ProductDetailScreen() {
    let { storeId, menuId, id } = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    let { error, loading, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(menuId, id))
    }, [dispatch, menuId, id])

    console.log(product)
    return (
        <div>
            <Link to={`/store/${storeId}/menu/${menuId}`} className='btn btn-dark my-3'>Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image_url} alt={product.title} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.title}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: Rs {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetailScreen;