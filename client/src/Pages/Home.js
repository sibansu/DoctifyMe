import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { Row } from 'antd'
import ListDocs from '../Components/ListDocs'
const Home = () => {
  const [doctors, setDoctors] = useState([])
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
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
    <div>
      <Layout>
        <h4 className='text-center'>Home Page</h4>
        <Row>
          {doctors && doctors.map(doctor=>(
            <ListDocs doctor={doctor}/>
          ))}
        </Row>
      </Layout>
    </div>
  )
}

export default Home