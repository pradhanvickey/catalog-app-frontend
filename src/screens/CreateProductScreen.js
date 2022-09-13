import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { createProduct } from '../actions/productActions';

import FormContainer from '../components/FormContainer';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function CreateProductScreen() {
    let { storeId, menuId } = useParams();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [extension, setExtension] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate

    useEffect(() => {
        if (userInfo && successCreate) {
            if (successCreate) {
                dispatch({ type: PRODUCT_CREATE_RESET })
                navigate(`/stores/${storeId}/menus/${menuId}/items`)
            }
        }
    }, [navigate, userInfo, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(storeId, menuId, { name, image, extension, price, description }))
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
        const base64 = await convertBase64(file);
        setImage(base64.split(",")[1], typeof base64)
        setExtension(file.name.split(".")[1])
    }

    return (
        <div>
            <LinkContainer to={`/stores/${storeId}/menus/${menuId}/items`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Create Product</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Product Name'
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
                            placeholder='Enter Product Price'
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
                            placeholder='Enter Product Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Button type='submit' variant='primary'>
                        Create
                    </Button>
                </Form>
            </FormContainer >
        </div>
    )
}


export default CreateProductScreen
