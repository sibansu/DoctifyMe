import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const getAppointments = async()=>{
    try {
      const res = await axios.get('/api/v1/user/user-appointments',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.data.success){
        setAppointments(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])
  

  const [first, setfirst] = useState()
  return (
    <Layout>
        <h3>Appointments List</h3>
    </Layout>
  )
}

export default Appointments