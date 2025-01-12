import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../service/UserService'

const UserManagement = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {

    try {
      const token = localStorage.getItem("token")
      const response = await UserService.getAllUsers(token)
      setUsers(response.ourUsersList)
      
    } catch (error) {
      console.log("error fetching user", error);
    }
  }


  return (
    <div>

    </div>
  )
}

export default UserManagement
