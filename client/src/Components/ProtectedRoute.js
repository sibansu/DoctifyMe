import React, { useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from '../redux/features/userSlice'

function ProtectedRoute({children}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)

  const getUser = async()=>{
    try {
      dispatch(showLoading())
      const res =await axios.post('/api/v1/user/getUserData',
      {token: localStorage.getItem('token')},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }else{
        <Navigate to='/login'></Navigate>
        localStorage.clear()
      }
      // dispatch(showLoading())
      // const res = await axios.post('/api/v1/user/getUserData')
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!user){
       getUser()
    }
  },[user, getUser])

  if(localStorage.getItem('token')){
    return children;
  }
  else{
    return <Navigate to='/login'></Navigate>;
  }
}

export default ProtectedRoute