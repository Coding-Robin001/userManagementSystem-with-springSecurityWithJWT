import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'

const Navbar = () => {

    const isAuthenticated = UserService.isAuthenticated()
    const isAdmin = UserService.isAdmin()

    return (
        <div className='navbar-container'>
            <div className='nav-list'>
                <Link to="/">
                    <div className='nav_logo'>
                        <img src="https://ik.imagekit.io/zn8ucbmpm/global5050%20assets/WhatsApp%20Image%202024-12-02%20at%2015.40.16.jpeg?updatedAt=1733242095759" alt="" />
                    </div>
                </Link>
                {/* <h1>GLOBAL 50/50</h1> */}
                <div className='sub-nav'>
                    <Link to="/home">
                        <p>Home</p>
                    </Link>
                    <Link to="/about">
                        <p>About Us</p>
                    </Link>
                    <Link to="/contact">
                        <p>Contact</p>
                    </Link>
                </div>
                {/* <div className='btn-box'> */}
                <button className='nav-btn'>
                    Contact Us
                </button>
                {/* </div> */}
            </div>

        </div>
    )
}

export default Navbar
