import React from 'react'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { Form, message } from 'antd'
import axios from 'axios'
import '../Styles/Login.css'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinishHandler = async (data) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/login', data)
            window.location.reload()
            dispatch(hideLoading())
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
                message.success("Login successfuly")
                navigate('/')
            }else{
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
          <h3 className="text-center">Login form</h3>
          <Form.Item name="email" label="Email">
            <input type="text" required />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" required />
          </Form.Item>
          <Link to="/signup" className="m-2">
            Click here if new user
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
    
  )
}

export default Login