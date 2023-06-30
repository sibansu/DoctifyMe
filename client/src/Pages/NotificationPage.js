// import { Layout } from 'antd'
import React from 'react'
import Layout from '../Components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
function NotificationPage() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
            window.location.reload()
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong")
        }
    }
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading())
            const res =await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong in notifications")
        }
    }
    return (
        <Layout>
            <h4 className='text-center p-3'>Notification page</h4>
            <Tabs>
                <Tabs.TabPane tab="Unread" key={0}>
                    <div className="d-flex justify-content-end">
                        <h3 className='p-2 text-primary' onClick={handleMarkAllRead}>Mark all read</h3>
                    </div>
                    {
                        user?.notification.map((msg) => (
                            <div className="card" style={{ cursor: "pointer" }} >
                                <div className="card-text p-2 hover-text-red">{msg.message}</div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h3 className='p-2 text-primary' style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>Delete all read</h3>
                    </div>
                    {
                        user?.seennotification.map((msg) => (
                            <div className="card" style={{ cursor: "pointer" }} >
                                <div className="card-text p-2">{msg.message}</div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage