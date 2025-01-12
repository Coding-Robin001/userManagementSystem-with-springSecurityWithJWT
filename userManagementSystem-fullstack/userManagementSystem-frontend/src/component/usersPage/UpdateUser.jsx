import React, { useEffect, useState } from 'react'
import UserService from '../service/UserService'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateUser = () => {

  const navigate = useNavigate()
  const { userId } = useParams()

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    city: ""
  })

  useEffect(() => {
    fetchUserById(userId)
  }, [userId])

  const fetchUserById = async (userId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await UserService.getUserById(userId, token)
      const { name, email, role, city } = response.ourUsers
      setUserData({ name, email, role, city })
    } catch (error) {
      console.log("error fetching user data", error);
    }
  }

  // use this format in register use input change too
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    e.preventDefault()

    try {
      const confirmUpdate = window.confirm("are you sure you want to update this user?")
      if (confirmUpdate) {
        const token = localStorage.getItem("token")
        const response = await UserService.updateUser(userId, userData, token)
        if(response.statusCode == 200){
          alert("user updated successfully!")
          navigate("/admin/userManagement")
        }
      }

    } catch (error) {
      console.log("error updating user", error);
      alert("error updating user", error)

    }
  }


  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name='name'
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name='email'
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label>Password</label>
          <input
            type="text"
            name='password'
            value={userData.password}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label>City</label>
          <input
            type="text"
            name='city'
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name='role'
            value={userData.role}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Update User</button>
      </form>
      {
        error && <h2>{error}</h2>
      }

    </div>
  )
}

export default UpdateUser
