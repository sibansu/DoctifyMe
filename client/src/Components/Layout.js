import React from 'react'
import '../Styles/Layout.css'
import { Badge, message } from 'antd'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { adminMenu, userMenu } from '../Data/Data'
import { useSelector } from 'react-redux'
function Layout({ children }) {
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.clear()
        message.success("Logged out successfuly")
        navigate("/login")
    }

    const { user } = useSelector(state => state.user)
     const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house-user"
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "fa-light fa-list"
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user"
        },
       
    ];

    const location = useLocation()
    const sideBarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <Link to='/' className='text-white' style={{ textDecoration: "none" }}><h6>DoctifyMe</h6></Link>
                        </div>
                        <div className="bar"></div>
                        <div className="menu">{sideBarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                            <div className={`menu-item`} onClick={handleLogOut}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content" style={{ cursor: "pointer" }}>
                                <Badge count={user && user.notification.length} onClick={() => navigate('/notification')}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to='/profile'>{user?.name.toUpperCase()}</Link>

                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout