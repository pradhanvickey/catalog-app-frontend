import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


import Product from '../components/Products';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductUsingStoreName } from "../actions/productActions";
import { getStoreDetailsUsingKey } from "../actions/storeActions";

import ProductCarousel from '../components/ProductCarousel';


function MenuScreen() {
    let { storeUniqueKey } = useParams();
    const dispatch = useDispatch();

    const productListWithStore = useSelector(state => state.productListWithStore)
    const { error, loading, products } = productListWithStore

    const storeDetailsKey = useSelector(state => state.storeDetailsKey)
    const { error: errorStoreDetailsKey, loading: loadingStoreDetailsKey, success } = storeDetailsKey

    useEffect(() => {
        dispatch(listProductUsingStoreName(storeUniqueKey))
        dispatch(getStoreDetailsUsingKey(storeUniqueKey))
    }, [dispatch, storeUniqueKey, success])

    return (
        <div>
            {loadingStoreDetailsKey && <Loader />}
            {errorStoreDetailsKey && <Message variant='danger'>{errorStoreDetailsKey}</Message>}
            <h2>What would you like to order?</h2>
            {<ProductCarousel storeUniqueKey={storeUniqueKey} />}
            <br></br>
            <h3>Latest Items </h3>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }
        </div >
    )
}

export default MenuScreen;