import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from './Loader';
import Message from './Message';

import { listMenu } from '../actions/menuActions';

function ProductCarousel({ storeUniqueKey }) {
    const dispatch = useDispatch()
    const menuList = useSelector(state => state.menuList)
    const { error, loading, menus } = menuList

    useEffect(() => {
        dispatch(listMenu(storeUniqueKey))
    }, [dispatch, storeUniqueKey])
    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {menus.map(menu => (
                        <Carousel.Item key={menu.id}>
                            <Link to={`/stores/${storeUniqueKey}/menus/${menu.id}`}>
                                <Image src={menu.image_url} alt={menu.title} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{menu.title}</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel