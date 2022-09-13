import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { updateProductDetails, listProductDetails } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAIL_RESET } from '../constants/productConstants';

import FormContainer from '../components/FormContainer';

function EditProductScreen() {

    let { storeId, menuId, productId } = useParams();

    const [name, setName] = useState('')
    const [is_active, setActive] = useState('')
    const [image, setImage] = useState('')
    const [extension, setExtension] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loadingUser, error: errorUser, userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProductDetail, error: errorProductDetail, product: item, success } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingProductUpdate, error: errorProductUpdate, success: sucessProductUpdate } = productUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            if (!success) {
                dispatch({ type: PRODUCT_DETAIL_RESET })
                dispatch(listProductDetails(menuId, productId))
            } else {
                setName(item.title)
                let active = item.is_active == true ? "Yes" : "No"
                setActive(active)
                setPrice(item.price)
                setDescription(item.description)
            }

            if (sucessProductUpdate) {
                dispatch({ type: PRODUCT_DETAIL_RESET })
                dispatch({ type: PRODUCT_UPDATE_RESET })
                navigate(`/stores/${storeId}/menus/${menuId}/items`)
            }
        }

    }, [userInfo, sucessProductUpdate, success, storeId, menuId, productId])

    const submitHandler = (e) => {
        e.preventDefault()
        let product = {}
        if (image) {
            product["encoded_photo"] = image
            product["extension"] = extension
        }
        if (name && product.title != name) {
            product["title"] = name
        }
        if (description && product.description != description) {
            product["description"] = description
        }
        if (price && product.price != price) {
            product["price"] = price
        }
        if (is_active) {
            console.log(is_active)
            product["is_active"] = is_active.toLowerCase() == "yes" ? true : false
        }
        dispatch(updateProductDetails(storeId, menuId, productId, product))
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const base64 = await convertBase64(file);
            setImage(base64.split(",")[1], typeof base64)
            setExtension(file.name.split(".")[1])
        }
    }

    return (
        <div>
            <LinkContainer to={`/stores/${storeId}/menus/${menuId}/items`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUser && <Loader />}
                {loadingProductDetail && <Loader />}
                {loadingProductUpdate && <Loader />}
                {errorProductDetail && <Message variant='danger'>{errorProductDetail}</Message>}
                {errorUser && <Message variant='danger'>{errorUser}</Message>}
                {errorProductUpdate && <Message variant='danger'>{errorProductUpdate}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Store Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Update Product Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" size="sm" onChange={uploadFileHandler} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='price'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Update Product Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Update Product Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='is_active'>
                        <Form.Label>Is Available</Form.Label>
                        <Form.Control
                            type='is_active'
                            placeholder='Enter Yes if available else No'
                            value={is_active}
                            onChange={(e) => setActive(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </FormContainer >
        </div>
    )
}
export default EditProductScreen