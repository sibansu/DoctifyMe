import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
function Appointments() {

  const [appointments, setAppointments] = useState([])
  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/user/user-appointments', {
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
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   )
    // },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.phone}
    //     </span>
    //   )
    // },
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
    }
  ]

  const [first, setfirst] = useState()
  return (
    <Layout>
      <h3>Appointments List</h3>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  )
}

export default Appointments