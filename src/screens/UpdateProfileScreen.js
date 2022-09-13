import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


function UpdateProfileScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { error: errorUserUpdateProfile, success, msg } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            if (!user || !user.email || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, user, success, userInfo, msg])

    function greet() {
        setMessage('');
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (!password) {
            setMessage('Passwords cannot be empty')
        } else {
            dispatch(updateUserProfile({
                'email': user.email,
                'password': password
            }))
            setTimeout(greet, 1000);
            setMessage('Password updated.')
        }
    }

    return (
        <div>
            <FormContainer>
                <h2>Password Update</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {msg && <Message variant='success'>{msg}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {errorUserUpdateProfile && <Message variant='danger'>{errorUserUpdateProfile}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            disabled
                            readOnly>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Update Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default UpdateProfileScreen;