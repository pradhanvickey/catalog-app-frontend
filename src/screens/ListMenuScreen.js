import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listMenuWithId, deleteMenu } from "../actions/menuActions";
import { MENU_DELETE_RESET } from '../constants/menuConstants';

function ListMenuScreen() {

    let { storeId } = useParams();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loadingUser, error: errorUser, userInfo } = userLogin

    const menuIdList = useSelector(state => state.menuIdList)
    const { loading: loadingMenuIdList, error: errorMenuIdList, menus } = menuIdList

    const menuDelete = useSelector(state => state.menuDelete)
    const { loading: loadingMenuDelete, error: errorMenuDelete, success: successMenuDelete } = menuDelete

    useEffect(() => {
        if (userInfo || (userInfo && successMenuDelete)) {
            if (successMenuDelete) {
                dispatch({ type: MENU_DELETE_RESET })
            }
            dispatch(listMenuWithId(storeId))
        }
    }, [dispatch, userInfo, successMenuDelete, storeId])

    const deleteHandler = (menuId) => {
        if (window.confirm('Are you sure you want to delete this Menu?')) {
            dispatch(deleteMenu(storeId, menuId))
        }
    }

    return (
        <div>
            <h1>Menu <LinkContainer to={`/stores/${storeId}/menus/add`}>
                <Button variant='success' className='btn-sm'>
                    <i className='fas fa-plus'></i>
                </Button>
            </LinkContainer>
            </h1>
            {errorUser && <Message variant='danger'>{errorUser}</Message>}
            {errorMenuIdList && <Message variant='danger'>{errorMenuIdList}</Message>}
            {errorMenuDelete && <Message variant='danger'>{errorMenuDelete}</Message>}
            {loadingUser && <Loader />}
            {loadingMenuIdList && <Loader />}
            {loadingMenuDelete && <Loader />}
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>IsAvailable</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {menus.map(menu => (
                        <tr key={menu.id}>
                            <td>{menu.title}</td>
                            <td><img src={menu.image_url} width={60} alt={menu.title}/> </td>
                            <td>{menu.is_active ? (
                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                            ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/stores/${storeId}/menus/${menu.id}/items`}>
                                    <Button className='btn-sm'>Product</Button>
                                </LinkContainer>
                                <LinkContainer to={`/stores/${storeId}/menus/${menu.id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(menu.id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <LinkContainer to={`/profile`}>
                <Button className='btn-sm'>Go Back</Button>
            </LinkContainer>
        </div>
    )
}

export default ListMenuScreen