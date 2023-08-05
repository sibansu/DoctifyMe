import React, {useState, useEffect} from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'
function Users() {
  const [users, setUsers] = useState([])

  const getUsers = async()=>{
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  
  const hadndleOnClick=async (record)=>{
    try {
      const res = await axios.post('/api/v1/admin/block-user',
      {userId: record.userId},
      {
          headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      if(res.data.success){
          message.success(res.data.message)
          window.location.reload()
      }
  } catch (error) {
      console.log(error);
      message.error("Something went wrong")
  }
  }

  //antd tables.
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: "Doctor",
      dataIndex: 'isDoctor',
      render:(text, record)=>(
        <span>
          {record.isDoctor? 'Yes': "No"}
        </span>
      )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record)=>(
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-5 '>Users</h1>
        <Table columns={columns} dataSource={users}></Table>
    </Layout>
  )
}

export default Users