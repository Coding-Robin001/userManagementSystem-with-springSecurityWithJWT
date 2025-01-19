import React, { useEffect, useState } from 'react'
import UserService from '../service/UserService'
import { Link } from 'react-router-dom'
import "./UsersPage.css"


const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    fetchProfileInfo()
  }, [])

  const fetchProfileInfo = async () => {

    try {
      const token = localStorage.getItem("token")
      const response = await UserService.getProfileInfo(token)
      setProfileInfo(response.ourUsers)
    } catch (error) {
      console.log("error loading profile information", error);
    }
  }

  return (
    <div className='usersPageContainer'>
      <h2 className='head'>Profile Information</h2>
      <div className='profileInfoBox'>
        <p>Name: <span>{profileInfo.name} adewole ademola</span></p>
        <p>Email: <span>{profileInfo.email} adewole@gmail.com</span></p>
        <p>City: <span>{profileInfo.city} jamaica</span></p>
        {
          profileInfo.role === "ADMIN" &&
          <button>
            <Link
              to={`/updateUser/${profileInfo.id}`}
            >
              Update this profile
            </Link>
          </button>
        }
      </div>
    </div>
  )
}

export default ProfilePage
