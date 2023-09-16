import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { DatePicker, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from "../redux/features/alertSlice"
import { isImmutableDefault } from '@reduxjs/toolkit'
function AppointmentPage() {
  const { user } = useSelector(state => state.user)
  const params = useParams()
  const [doctors, setDoctors] = useState([])
  const [date, setDate] = useState()
  const [available, setAvailable] = useState(false)

  const dispatch = useDispatch()
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

  
  const handleBooking = async () => {
    try {
      setAvailable(true);
      if(!date){
        return alert("Date is required")
      }
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/book-appointment",
        {
          // doctorId: params.doctorId,
          // userId: user._id,
          // doctorInfo: doctors,
          // userInfo: user,
          // date: date

        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        
        )
        dispatch(hideLoading())
        if(res.data.success){
          setAvailable(true)
          message.success(res.data.message)
        }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }

  }


  const handleAvailabiliy = async()=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/booking-availability',
      {doctorId:params.doctorId,
      date},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        setAvailable(true)
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
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
                <DatePicker format="DD-MM-YYYY" onChange={(e) =>{setDate(moment(e).format("DD-MM-YYYY")); setAvailable(true);}}></DatePicker>
                {<div className="btn bg-success text-white mt-2" onClick={handleBooking}>Book now</div>}
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default AppointmentPage