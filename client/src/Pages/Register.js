import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import '../Styles/Login.css'
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinishHandler = async (data) => {
        // console.log(data);
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/signup', data)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success("Registered succesfuly")
                navigate('/login')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong")
        }
    }
    return (
        <div className="login-container">
            <div className="image-container"></div>
            <div className="form-container">
                <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
                    <h3 className="text-center">Sign up form</h3>
                    <Form.Item name="email" label="Email">
                        <input type="text" required />
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <input type="password" required />
                    </Form.Item>
                    <Link to="/login" className="m-2">
                        Click here already registered
                    </Link>
                    <button className="btn btn-primary" type="submit">
                        Sign up
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default Register