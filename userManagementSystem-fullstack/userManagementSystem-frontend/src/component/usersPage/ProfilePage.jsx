import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./UsersPage.css"
import { getProfileInfo } from '../service/UserService'


const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({})
  const [error, setError] = useState("")
  const [fetchingInProgress, setFetchingInProgress] = useState(false)


  useEffect(() => {
    fetchProfileInfo()
  }, [])

  const fetchProfileInfo = async () => {
    setFetchingInProgress(true)

    try {
      const token = localStorage.getItem("token")
      const response = await getProfileInfo(token)
      setProfileInfo(response.ourUsers)
    } catch (error) {
      setError("error loading profile information, " + error.message)
    }

    setFetchingInProgress(false)
  }

  return (
    <div className='usersPageContainer'>
      <h2 className='head'>Profile Information</h2>
      <div className='profileInfoBox'>
        {
          fetchingInProgress && <span className='fetchingMsg'>fetching user please wait...</span>
        }
        <p>Name: <span> {profileInfo.name}</span></p>
        <p>Email: <span>{profileInfo.email} </span></p>
        <p>City: <span>{profileInfo.city} </span></p>
        {
          profileInfo.role === "ADMIN" && 
          <button>
            <Link
              to={`/updateUser/${profileInfo.id}`}
            >
              Update profile
            </Link>
          </button>
        }
      </div>
      {
        error && <h2 className='errorText'>{error}!</h2>
      }
    </div>
  )
}

export default ProfilePage
