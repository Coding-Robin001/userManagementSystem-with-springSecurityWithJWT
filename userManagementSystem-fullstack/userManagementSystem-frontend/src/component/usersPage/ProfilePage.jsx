import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./UsersPage.css"
import { getProfileInfo } from '../service/UserService'


const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    fetchProfileInfo()
  }, [])

  const fetchProfileInfo = async () => {

    try {
      const token = localStorage.getItem("token")
      const response = await getProfileInfo(token)
      setProfileInfo(response.ourUsers)
    } catch (error) {
      console.log("error loading profile information", error);
    }
  }

  return (
    <div className='usersPageContainer'>
      <h2 className='head'>Profile Information</h2>
      <div className='profileInfoBox'>
        <p>Name: <span> Peter Smith{profileInfo.name}</span></p>
        <p>Email: <span>@PeterSmith23@gmail.com{profileInfo.email} </span></p>
        <p>City: <span>Los Angeles{profileInfo.city} </span></p>
        {
          // profileInfo.role === "ADMIN" &&
          <button>
            <Link
              to={`/updateUser/${profileInfo.id}`}
            >
              Update profile
            </Link>
          </button>
        }
      </div>
    </div>
  )
}

export default ProfilePage
