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
  const [submitError, setSubmitError] = useState("")
  const [fetchError, setFetchError] = useState("")
  const [fetchingInProgress, setFetchingInProgress] = useState(false)
  const [submissionInProgress, setSubmissionInProgress] = useState(false)


  useEffect(() => {
    fetchUserById(userId)
  }, [userId])

  const fetchUserById = async (userId) => {
    setFetchingInProgress(true)

    try {
      const token = localStorage.getItem("token")
      const response = await getUserById(userId, token)
      const { name, email, role, city } = response.ourUsers
      setUserData({ name, email, role, city })
      setFetchError(null)
    } catch (error) {
      setFetchError(error.message)
    }

    setFetchingInProgress(false)
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
      setSubmitError(error.message)
      alert("error updating user", error)
    }
    setSubmissionInProgress(false)
  }


  return (
    <div className='authContainer'>
      <h2 className='head'>Update User</h2>
      {
        fetchingInProgress &&
          <p className='fetchMsg'>fetching user, please wait...</p>
      }
      {
        fetchError &&
        <p className='fetchMsg error'>Unable to fetch to-be-updated user, {fetchError}!</p>
      }
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
          className={submissionInProgress || fetchError.trim().length > 0 ? "disabled" : null}
          disabled={submissionInProgress || fetchError}
          type='submit'
        >
          {submissionInProgress ? "UPDATING USER..." : "UPDATE USER"}
        </button>
      </form>
      {
        submitError && <h2 className='errorText'>{submitError}, check internet connection!</h2>
      }

    </div>
  )
}

export default UpdateUser
