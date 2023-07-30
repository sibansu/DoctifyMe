import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment'

function DoctorAppointments() {
    const handleStatus = async(record, status) => {
        try {
            const res = await axios.post('/api/v1/doctor/update-status',{
                appointmentId: record._id,
                status
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
        }
    }

    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getAppointments()
    }, [])
    const columns = [
        {
            title: "ID",
            dataIndex: "_id"
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text, record) => (
            <span>
              {record?.firstName} {record?.lastName}
            </span>
          )
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          render: (text, record) => (
            <span>
              {record?.phone}
            </span>
          )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'Pending' && (
                        <div className="d-flex items-center justify-center">
                            <button className="btn btn-success" onClick={() => handleStatus(record, 'Approved')}>Approve</button>
                            <button className="btn btn-danger ml-2" onClick={() => handleStatus(record, 'reject')}>Reject</button>
                        </div>
                    )}
                </div>
            )
        },
    ]
    return (
        <Layout>
            <h3>Doctor appointments list</h3>
            <Table columns={columns} dataSource={appointments}></Table>
        </Layout>
    )
}

export default DoctorAppointments