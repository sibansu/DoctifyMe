import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ListDocs.css'
const ListDocs = ({ doctor }) => {

  const navigate = useNavigate();

  return (
    <div className='p-3'>
      <div className="card shadow-sm" style={{ cursor: "pointer" }} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p><b>Specialization:</b> {doctor.specialization}</p>
          <p><b>Experience:</b> {doctor.experience}</p>
          <p><b>Fees for each consultation:</b> {doctor.fees}</p>
          <p><b>Timings:</b> {doctor.timings[0]?.substring(11, 16)} to {doctor.timings[1]?.substring(11, 16)}</p>
        </div>
      </div>
    </div>
  )
}

export default ListDocs