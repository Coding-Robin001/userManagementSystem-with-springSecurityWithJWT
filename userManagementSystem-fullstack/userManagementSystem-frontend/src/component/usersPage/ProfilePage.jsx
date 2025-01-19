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
      <p>name: {profileInfo.name}</p>
      <p>email: {profileInfo.email}</p>
      <p>city: {profileInfo.city}</p>
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
  )
}

export default ProfilePage
