import React from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'
import { useEffect, useState } from 'react'
function Doctors() {
    const [doctors, setDoctors] = useState([])

    const getDoctors = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllDoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus',
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: "Status",
            dataIndex: 'status'
        },
        {
            title: "Specialization",
            dataIndex: 'specialization'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {
                        record.status === 'pending' ? (<button className='btn btn-success' onClick={() => handleAccountStatus(record, "Approved")}>Approve</button>) : (<button className='btn btn-danger' onClick={() => handleAccountStatus(record, "Pending")}>Reject</button>)
                    }
                </div>
            )
        }
    ]

    return (
        <Layout>
            <h1 className='text-center m-5'>Doctors</h1>
            <Table columns={columns} dataSource={doctors}></Table>
        </Layout>
    )
}

export default Doctors