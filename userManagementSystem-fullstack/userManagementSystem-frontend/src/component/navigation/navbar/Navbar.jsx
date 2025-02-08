import React, { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'

const Navbar = () => {
    const navbarLinks = [
        { id: 0, name: "PROFILE", link: "/profile" },
        { id: 1, name: "USER MANAGEMENT", link: "/admin/userManagement" },
        { id: 2, name: "LOGOUT", link: "/logout" },
    ]

    const [active, setActive] = useState(0)

    const handleChangeActive = (currentActive) => {
        setActive(currentActive)
    }


    const isAuthenticated = UserService.isAuthenticated()
    const isAdmin = UserService.isAdmin()

    const handleLogout = () => {
        const confirmDeleteToken = window.confirm("are you sure you want to logout this user?")
        if (confirmDeleteToken) {
            UserService.logout();
        }
    }
    return (
        <div className='navbar-container'>
            <div className='nav-list'>
                {!isAuthenticated &&
                    <Link to="/">
                        <div className='nav_logo'>
                            USER MANAGER
                        </div>
                    </Link>
                }

                {
                    isAuthenticated &&
                    <Link onClick={() => handleChangeActive(0)} to="/profile"  >
                        <p className={active == 0 ? "active" : null}
                        >PROFILE</p>
                    </Link>
                }
                {
                    isAdmin &&
                    <Link onClick={() => handleChangeActive(1)} to="/admin/userManagement" >
                        <p className={active == 1 ? "active" : null}
                        >USER MANAGEMENT</p>
                    </Link>
                }
                {
                    isAuthenticated &&
                    <Link to="/" onClick={handleLogout}  >
                        <p className={active == 2 ? "active" : null}>  LOGOUT</p>
                    </Link>
                }
            </div>

        </div >
    )
}

export default Navbar
