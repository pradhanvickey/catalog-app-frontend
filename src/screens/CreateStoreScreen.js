import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { createStore } from '../actions/storeActions';

import FormContainer from '../components/FormContainer';

function CreateStoreScreen() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [address, setAddress] = useState('')
    const [extension, setExtension] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const storeCreate = useSelector(state => state.storeCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = storeCreate

    useEffect(() => {
        if (successCreate && userInfo) {
            navigate("/profile")
        }
    }, [navigate, userInfo, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createStore({ name, phone, image, address, extension }))
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
            <LinkContainer to="/">
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Create Store</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Store Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Store Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Store Logo</Form.Label>
                        <Form.Control type="file" size="sm" onChange={uploadFileHandler} />
                    </Form.Group>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='phone'>
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Contact No'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

export default CreateStoreScreen