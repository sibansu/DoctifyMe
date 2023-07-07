import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import NotificationPage from './Pages/NotificationPage';
import Users from './Pages/admin/Users';
import Doctors from './Pages/admin/Doctors';
import Profile from './Pages/Doctor/Profile';
import AppointmentPage from './Pages/AppointmentPage';
import Appointments from './Pages/Appointments';
function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner></Spinner>) : (
          <Routes>
            <Route path='/' exact element=
              {
                <ProtectedRoute>
                  <Home></Home>
                </ProtectedRoute>
              }></Route>
            <Route path='/notification' exact element=
              {
                <ProtectedRoute>
                  <NotificationPage></NotificationPage>
                </ProtectedRoute>
              }></Route>
            <Route path='/apply-doctor' exact element=
              {
                <ProtectedRoute>
                  <ApplyDoctor></ApplyDoctor>
                </ProtectedRoute>
              }></Route>
            <Route path='/admin/users' exact element=
              {
                <ProtectedRoute>
                  <Users></Users>
                </ProtectedRoute>
              }></Route>
            <Route path='/doctor/profile/:id' exact element=
              {
                <ProtectedRoute>
                  <Profile></Profile>
                </ProtectedRoute>
              }></Route>
            <Route path='/doctor/book-appointment/:doctorId' exact element=
              {
                <ProtectedRoute>
                  <AppointmentPage></AppointmentPage>
                </ProtectedRoute>
              }></Route>
            <Route path='/appointments' exact element=
              {
                <ProtectedRoute>
                  <Appointments></Appointments>
                </ProtectedRoute>
              }></Route>
            <Route path='/admin/doctors' exact element=
              {
                <ProtectedRoute>
                  <Doctors></Doctors>
                </ProtectedRoute>
              }></Route>
            <Route path='/login' element=
              {
                <PublicRoute>
                  <Login></Login>
                </PublicRoute>
              }></Route>
            <Route path='/signup' element=
              {
                <PublicRoute>
                  <Register></Register>
                </PublicRoute>
              }></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
