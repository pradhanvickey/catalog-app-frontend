import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { createMenu } from '../actions/menuActions';

import FormContainer from '../components/FormContainer';
import { MENU_CREATE_RESET } from '../constants/menuConstants';

function CreateMenuScreen() {
    let { storeId } = useParams();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [extension, setExtension] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const menuCreate = useSelector(state => state.menuCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = menuCreate

    useEffect(() => {
        if (userInfo && successCreate) {
            if(successCreate){
                dispatch({ type: MENU_CREATE_RESET })
                navigate(`/stores/${storeId}/menu`)
            }
        }
    }, [navigate, userInfo, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createMenu(storeId, { name, image, extension }))
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
            <LinkContainer to={`/stores/${storeId}/menu`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Create Menu</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Store Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Menu Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Menu Image</Form.Label>
                        <Form.Control type="file" size="sm" onChange={uploadFileHandler} />
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


export default CreateMenuScreen
