import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import { logout } from '../actions/userActions';

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    let { userInfo } = userLogin;

    const storeDetailsKey = useSelector(state => state.storeDetailsKey)
    const { store } = storeDetailsKey
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        {store.name && store.logo_url ? (<Navbar.Brand><img
                            src={store.logo_url}
                            width="50"
                            height="30"
                            className="d-inline-block align-top"
                            alt={store.name}
                        />  {store.name}</Navbar.Brand>) : <Navbar.Brand>Catalog-App</Navbar.Brand>}

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {!store.name && !store.logo_url && userInfo ? (
                                    <NavDropdown title={userInfo.email} id='email'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/profile/edit'>
                                            <NavDropdown.Item>Update Password</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : ("")
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div >
    )
}

export default Header;