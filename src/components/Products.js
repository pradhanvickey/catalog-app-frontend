import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Product({ product}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Img src={product.image_url} width="250px" height="250px"/>
            <Card.Body>
                <Card.Title>
                    <strong>{product.title.split(" ").reduce((s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "), '')}</strong>
                </Card.Title>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item ><strong>Description: </strong> {product.description}</ListGroup.Item>
                    <ListGroup.Item><strong>Price: </strong> Rs {product.price}</ListGroup.Item>
                    <ListGroup.Item><strong>Available: </strong> {product.is_active ? "Yes" : "No"}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default Product;