import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { getMenuDetails, updateMenuDetails } from '../actions/menuActions';
import { MENU_DETAILS_RESET, MENU_UPDATE_RESET } from '../constants/menuConstants';

import FormContainer from '../components/FormContainer';

function EditMenuScreen() {

    let { storeId, menuId } = useParams();

    const [name, setName] = useState('')
    const [is_active, setActive] = useState('')
    const [image, setImage] = useState('')
    const [extension, setExtension] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loadingUser, error: errorUser, userInfo } = userLogin

    const menuDetails = useSelector(state => state.menuDetails)
    const { loading: loadingMenuDetail, error: errorMenuDetail, menu } = menuDetails

    const menuUpdate = useSelector(state => state.menuUpdate)
    const { loading: loadingMenuUpdate, success: sucessMenuUpdate } = menuUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            if (!menu || (Object.keys(menu).length === 0 && menu.constructor === Object) || sucessMenuUpdate) {
                dispatch(getMenuDetails(storeId, menuId))
                if (sucessMenuUpdate) {
                    dispatch({ type: MENU_UPDATE_RESET })
                    dispatch({ type: MENU_DETAILS_RESET})
                    navigate(`/stores/${storeId}/menu`)
                }
            } else {
                setName(menu.title)
                let active = menu.is_active == true ? "Yes" : "No"
                setActive(active)
            }
        }

    }, [dispatch, userInfo, menu, sucessMenuUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        let menu = {}
        if (image) {
            menu["encoded_photo"] = image
            menu["extension"] = extension
        }
        if (name && menu.title != name) {
            menu["title"] = name
        }
        if (is_active) {
            menu["is_active"] = is_active.toLowerCase() == "yes" ? true : false
        }
        dispatch(updateMenuDetails(storeId, menuId, menu))
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
            <LinkContainer to={`/stores/${storeId}/menu`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>

            <FormContainer>
                <h1>Edit Store</h1>
                {loadingUser && <Loader />}
                {loadingMenuDetail && <Loader />}
                {loadingMenuUpdate && <Loader />}
                {errorMenuDetail && <Message variant='danger'>{errorMenuDetail}</Message>}
                {errorUser && <Message variant='=danger'>{errorUser}</Message>}
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
                        <Form.Label>Menu Logo</Form.Label>
                        <Form.Control type="file" size="sm" onChange={uploadFileHandler} />
                    </Form.Group>
                    <br></br>
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
export default EditMenuScreen