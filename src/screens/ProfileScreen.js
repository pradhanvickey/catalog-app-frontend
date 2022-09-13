import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { saveAs } from "file-saver";

import Loader from '../components/Loader';
import Message from '../components/Message';

import { deleteStore, listMyStores } from '../actions/storeActions';
import { STORE_DELETE_RESET, STORE_CREATE_RESET, STORE_UPDATE_RESET } from '../constants/storeConstants';


function ProfileScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const storeListMy = useSelector(state => state.storeListMy)
    const { loading: loadingStores, error: errorStores, stores } = storeListMy

    const storeDelete = useSelector(state => state.storeDelete)
    const { error: errorDelete, success: successDelete } = storeDelete

    const storeCreate = useSelector(state => state.storeCreate)
    const { success: successCreate } = storeCreate

    const storeUpdate = useSelector(state => state.storeUpdate)
    const { success: sucessStoreUpdate } = storeUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            dispatch(listMyStores())
        }

        if (successDelete || sucessStoreUpdate || successCreate) {
            if (successDelete) {
                dispatch({ type: STORE_DELETE_RESET })
            }

            if (sucessStoreUpdate) {
                dispatch({ type: STORE_UPDATE_RESET })
            }

            if (successCreate) {
                dispatch({ type: STORE_CREATE_RESET })
            }

            dispatch(listMyStores())
        }
    }, [dispatch, navigate, successDelete, sucessStoreUpdate, successCreate, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            dispatch(deleteStore(id))
        }
    }

    const saveImageHandler = (image) => {
        let fileName = getFileName(image);
        console.log(fileName)
        saveAs(image, fileName);
    }

    function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1) + ".png"
    }

    return (
        <Row>
            <Col >
                <h2>My Stores  <LinkContainer to={`/stores/add`}>
                    <Button variant='success' className='btn-sm'>
                        <i className='fas fa-plus'></i>
                    </Button>
                </LinkContainer>
                </h2>

                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {loadingStores ? (
                    <Loader />
                ) : errorStores ? (
                    <Message variant='danger'>{errorStores}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Is Active</th>
                                <th>Logo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stores.map(store => (
                                <tr key={store.id}>
                                    <td> <Link to={`/stores/${store.unique_store_key}`}>{store.name}</Link></td>
                                    <td>{store.contact_no}</td>
                                    <td>{store.address}</td>
                                    <td>{store.is_active ? <i className='fas fa-check' style={{ color: 'green' }} /> : (
                                        <i className='fas fa-times' style={{ color: 'red' }} />
                                    )}</td>
                                    <td><img src={store.logo_url} width={60} alt={store.name}/></td>
                                    <td>
                                        <LinkContainer to={`/stores/${store.id}/menu`}>
                                            <Button className='btn-sm'>Menu</Button>
                                        </LinkContainer>
                                        <LinkContainer to={`/stores/${store.id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(store.id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <Button variant='light' className='btn-sm' onClick={() => saveImageHandler(store.qr_code_url)}>
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen;