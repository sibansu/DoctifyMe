import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { DatePicker } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
function AppointmentPage() {
  const params = useParams()
  const [doctors, setDoctors] = useState([])
  const [date, setDate] = useState()
  const [available, setAvailable] = useState()
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/doctor/getADoctor', { doctorId: params.doctorId }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)

      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <Layout>
      <h3 className='text-center'>Appointment Page</h3>
      <div className="container">
        {
          doctors && (
            <div>
              <h4>Dr {doctors.firstName} {doctors.lastName} </h4>
              <h4>Fees {doctors.fees}</h4>
              <div className="d-flex flex-column w-50">
                <DatePicker format="DD-MM-YYYY" onChange={(e)=>setDate(moment(e).format("DD-MM-YYYY"))}></DatePicker>
                <div className="btn bg-primary text-white mt-2">Check availability</div>
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default AppointmentPage