import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Input, Row, TimePicker, message } from 'antd'
import Form from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import moment from 'moment'
function Profile() {
    const {user} = useSelector(state=>state.user)
    const [doctor, setDoctor] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnFinish = async (data) => {
        // console.log(data);
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/doctor/updateProfile', { ...data, userId: user._id, timings:[
                moment(data.timings[0].format("HH:mm")),
                moment(data.timings[1].format("HH:mm"))
            ] }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
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

    const getDoctorInfo = async()=>{
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',{userId: useParams.id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
      getDoctorInfo()
    }, [])
    
    return (
        <Layout>
            <h3>
                Manage profiles
            </h3>
            {doctor && (
                <Form className='m-3' layout='vertical' onFinish={handleOnFinish} initialValues={
                    {...doctor,
                    timings:[
                        moment(doctor.timings[0], "HH:mm"),
                        moment(doctor?.[1], "HH:mm")
                    ]}
                }>
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
                            <button className="btn btn-primary" type='submit'>Update</button>
                        </div>
                    </Col>
                </Row>
            </Form>
            )}
        </Layout>
    )
}

export default Profile