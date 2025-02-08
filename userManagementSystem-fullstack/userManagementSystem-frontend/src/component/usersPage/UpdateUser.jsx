import React, { useEffect, useState } from 'react'
import { updateUser, getUserById } from '../service/UserService'
import { useParams, useNavigate } from 'react-router-dom'
import "../auth/Auth.css"

const UpdateUser = () => {

  const navigate = useNavigate()
  const { userId } = useParams()

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    city: ""
  })
  const [error, setError] = useState("")
  const [submissionInProgress, setSubmissionInProgress] = useState(false)


  useEffect(() => {
    fetchUserById(userId)
  }, [userId])

  const fetchUserById = async (userId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await getUserById(userId, token)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionInProgress(true)

    try {

      const confirmUpdate = window.confirm("are you sure you want to update this user?")
      if (confirmUpdate) {
        const token = localStorage.getItem("token")
        const response = await updateUser(userId, userData, token)
        if (response.statusCode == 200) {
          alert("user updated successfully!")
          navigate("/admin/userManagement")
        }
      }

    } catch (error) {
      console.log("error updating user", error);
      setError(error.message)
      alert("error updating user", error)
    }
    setSubmissionInProgress(false)
  }


  return (
    <div className='authContainer'>
      <h2 className='head'>Update User</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Name</label>
          <input
            type="text"
            name='name'
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
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
        <div className='formItem'>
          <label>City</label>
          <input
            type="text"
            name='city'
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Role</label>
          <input
            type="text"
            name='role'
            value={userData.role}
            onChange={handleInputChange}
          />
        </div>
        <button
          className={submissionInProgress ? "disabled" : null}
          disabled={submissionInProgress}
          type='submit'
        >
          {submissionInProgress ? "UPDATING USER..." : "UPDATE USER"}
        </button>
      </form>
      {
        error && <h2 className='errorText'>{error}, Check Internet Connection!!!</h2>
      }

    </div>
  )
}

export default UpdateUser
