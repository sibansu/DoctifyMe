import React from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { Col, Input, Row, TimePicker, message } from 'antd'
import Form from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
function ApplyDoctor() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnFinish = async (data) => {
        // console.log(data);
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', { ...data, userId: user._id, timings:[
                moment(data.timings[0].format("HH:mm")),
                moment(data.timings[1].format("HH:mm"))
            ] }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
                navigate('/')
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h2 className='text-center'>Apply doctor</h2>
            <Form className='m-3' layout='vertical' onFinish={handleOnFinish}>
                <h4 className="">Personal Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='First Name' name='firstName' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your first name' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Last Name' name='lastName' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your last name' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Address' name='address' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your address' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Phone Number' name='phone' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your first name' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Email' name='email' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your email Id' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Website' name='website'>
                            <Input placeholder='Enter your website (if any)' />
                        </FormItem>
                    </Col>
                </Row>

                <h4 className="">Personal Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Specialization' name='specialization' required rules={[{ required: true }]}>
                            <Input placeholder='Your specialization' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Experience' name='experience' required rules={[{ required: true }]}>
                            <Input placeholder='Your experience' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Fees per cunsultation' name='fees' required rules={[{ required: true }]}>
                            <Input placeholder='Enter your fees' />
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <FormItem label='Timings' name='timings' >
                            {/* <Input placeholder='Enter your available timings' /> */}
                            <TimePicker.RangePicker format="HH:mm"></TimePicker.RangePicker>
                        </FormItem>
                    </Col>
                    <Col xs={24} md={12} lg={8}></Col>
                    <Col xs={24} md={12} lg={8}>
                        <div className="d-flex justify-content-start mt-3">
                            <button className="btn btn-primary" type='submit'>Submit</button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor