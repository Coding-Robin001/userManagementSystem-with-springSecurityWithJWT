import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"
import { registerService } from '../service/UserService'

const RegistrationPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    role: ""
  })
  const [error, setError] = useState("")
  const [submissionInProgress, setSubmissionInProgress] = useState(false)


  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionInProgress(true)

    try {
      const token = localStorage.getItem("token")
      const role = localStorage.getItem("role")

      if (role !== "ADMIN") {
        alert("unathorized access!")
        navigate("/login")
        return
      }
      await registerService(formData, token)

      setFormData({
        name: "",
        email: "",
        city: "",
        password: "",
        role: ""
      })

      alert("user registered successfully!")
      navigate("/admin/userManagement")
    }
    catch (error) {
      console.log(error);
      setError(error.message)
      setTimeout(() => {
        setError("")
      }, 5000);
    }
    setSubmissionInProgress(false)
  }

  return (
    <div className='authContainer'>
      <h2 className='head'>Register</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Full Name</label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Email</label>
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Password</label>
          <input
            type="password"
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>City</label>
          <input
            type="text"
            name='city'
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Role</label>
          <input
            type="text"
            name='role'
            value={formData.role}
            onChange={handleInputChange}
          />
        </div>
        <button
          className={submissionInProgress ? "disabled" : null}
          disabled={submissionInProgress}
          type='submit'
        >
          {submissionInProgress ? "REGISTERING USER. . ." : "REGISTER"}
        </button>
      </form>
      {
        error && <h2 className='errorText'>{error}, Check Internet Connection!!!</h2>
      }

    </div>)
}

export default RegistrationPage
