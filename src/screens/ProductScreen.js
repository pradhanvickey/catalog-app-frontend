import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


import Product from '../components/Products';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { Button } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { listProduct } from "../actions/productActions";
import { getStoreDetailsUsingKey } from "../actions/storeActions";

function ProductScreen() {
    let { storeUniqueKey, menuId } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    const storeDetailsKey = useSelector(state => state.storeDetailsKey)
    const { error: errorStoreDetailsKey, loading: loadingStoreDetailsKey, store, success } = storeDetailsKey

    useEffect(() => {
        dispatch(getStoreDetailsUsingKey(storeUniqueKey))
        if(success){
            dispatch(listProduct(store.id, menuId))
        }
    }, [dispatch, storeUniqueKey, menuId, success])

    return (
        <div>
            <LinkContainer to={`/stores/${store.unique_store_key}`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>
            {loadingStoreDetailsKey && <Loader />}
            {errorStoreDetailsKey && <Message variant='danger'>{errorStoreDetailsKey}</Message>}
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} storeUniqueKey={storeUniqueKey} menuId={menuId} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }
        </div >
    )
}

export default ProductScreen;