import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { getStoreDetails, updateStoreDetails } from '../actions/storeActions';

import FormContainer from '../components/FormContainer';

function EditStoreScreen() {

    let { storeId } = useParams();

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [address, setAddress] = useState('')
    const [extension, setExtension] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loadingUser, error: loadingError, userInfo } = userLogin

    const storeDetails = useSelector(state => state.storeDetails)
    const { loading: loadingStoreDetail, error: errorStoreDetail, store } = storeDetails

    const storeUpdate = useSelector(state => state.storeUpdate)
    const { loading: loadingStoreUpdate, success: sucessStoreUpdate } = storeUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            if (!store || (Object.keys(store).length === 0 && store.constructor === Object) || sucessStoreUpdate) {
                dispatch(getStoreDetails(storeId))

                if (sucessStoreUpdate) {
                    navigate("/")
                }
            } else {
                setName(store.name)
                setPhone(store.contact_no)
                setAddress(store.address)
            }

        }

    }, [dispatch, userInfo, store, sucessStoreUpdate, navigate, storeId])

    const submitHandler = (e) => {
        e.preventDefault()
        let store = {}
        if (image) {
            store["encoded_photo"] = image
            store["extension"] = extension
        }
        if (name) {
            store["name"] = name
        }
        if (phone) {
            store["contact_no"] = phone
        }
        if (address) {
            store["address"] = address
        }
        dispatch(updateStoreDetails(storeId, store))
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
            <LinkContainer to="/">
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Edit Store</h1>
                {loadingUser && <Loader />}
                {loadingStoreDetail && <Loader />}
                {loadingStoreUpdate && <Loader />}
                {loadingError && <Message variant='danger'>{loadingError}</Message>}
                {errorStoreDetail && <Message variant='danger'>{errorStoreDetail}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Store Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Store Name'
                            value={name}
                            disabled
                            readOnly
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
                            placeholder='Update Address'
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
                            placeholder='Update Contact No'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

export default EditStoreScreen