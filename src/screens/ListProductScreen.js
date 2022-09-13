import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProduct, deleteProduct } from "../actions/productActions";
import { PRODUCT_DELETE_RESET, PRODUCT_DETAIL_RESET } from '../constants/productConstants';

function ListProductScreen() {

    let { storeId, menuId } = useParams();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loadingUser, error: errorUser, userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading: loadingProductList, error: errorProductList, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingProductDelete, error: errorProductDelete, success: successProductDelete } = productDelete

    const productDetails = useSelector(state => state.productDetails)
    const { success: successProductDetails } = productDetails

    useEffect(() => {
        if (userInfo || (userInfo && successProductDelete)) {
            if (successProductDelete) {
                dispatch({ type: PRODUCT_DELETE_RESET })
            }
            dispatch(listProduct(storeId, menuId))
        }

        if (successProductDetails) {
            dispatch({ type: PRODUCT_DETAIL_RESET })
        }
    }, [dispatch, userInfo, successProductDelete, productDetails, successProductDetails, storeId, menuId])

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(storeId, menuId, productId))
        }
    }

    return (
        <div>
            <h1>Products <LinkContainer to={`/stores/${storeId}/menus/${menuId}/items/add`}>
                <Button variant='success' className='btn-sm'>
                    <i className='fas fa-plus'></i>
                </Button>
            </LinkContainer>
            </h1>
            {errorUser && <Message variant='danger'>{errorUser}</Message>}
            {errorProductList && <Message variant='danger'>{errorProductList}</Message>}
            {errorProductDelete && <Message variant='danger'>{errorProductDelete}</Message>}
            {loadingProductList && <Loader />}
            {loadingProductDelete && <Loader />}
            {loadingUser && <Loader />}
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>IsAvailable</th>
                        <th>Price</th>
                        <th>Decription</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td><img src={product.image_url} width={60} alt={product.title}/> </td>
                            <td>{product.is_active ? (
                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                            ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}</td>
                            <td>Rs {product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <LinkContainer to={`/stores/${storeId}/menus/${menuId}/items/${product.id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product.id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <LinkContainer to={`/stores/${storeId}/menu`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>
        </div>
    )
}

export default ListProductScreen