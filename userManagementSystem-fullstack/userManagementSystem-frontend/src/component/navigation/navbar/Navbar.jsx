import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'

const Navbar = () => {

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
                            CODING ROBIN
                        </div>
                    </Link>
                }
                {
                    isAuthenticated &&
                    <Link to="/profile">
                        <p>profile</p>
                    </Link>
                }
                {
                    isAdmin &&
                    <Link to="/admin/userManagement">
                        <p>user management</p>
                    </Link>
                }
                {
                    isAuthenticated &&
                    <Link
                        to="/"
                        onClick={handleLogout}
                    >
                        <p>About Us</p>
                    </Link>
                }
            </div>

        </div>
    )
}

export default Navbar
