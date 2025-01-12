import React, { useEffect, useState } from 'react'
import UserService from '../service/UserService'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    fetchProfileInfo()
  }, [])

  const fetchProfileInfo = async () => {
    const token = localStorage.getItem("token")
    const response = await UserService.getProfileInfo(token)
    setProfileInfo(response.ourUsers)
  }

  return (
    <div>

    </div>
  )
}

export default ProfilePage
