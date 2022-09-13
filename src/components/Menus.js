import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Menu({ menu }) {
    return (
        <Card className="my-3 p-3 rounded"  style={{ width: '18rem'}}>
            <Link to={`/store/${menu.store_id}/menu/${menu.id}`}>
                <Card.Img src={menu.image_url} class="card-img-top img-fluid"/>
            </Link>

            <Card.Body>
                <Link to={`/store/${menu.store_id}/menu/${menu.id}`}>
                    <Card.Title as="div">
                        <strong>{menu.title}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Menu;