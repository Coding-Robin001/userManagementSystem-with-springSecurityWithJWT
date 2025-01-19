import React, { useState } from 'react'
import UserService from '../service/UserService'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"

const RegistrationPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    role: ""
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      const userData = await UserService.register(userData, token)

      setFormData({
        name: "",
        email: "",
        city: "",
        password: "",
        role: ""
      })

      alert("user registered successfully!")
      navigate("/admin/userManagement")


    } catch (error) {
      console.log(error);
      // setError(error)
      setTimeout(() => {
        setError("")
      }, 5000);
    }
  }

  return (
    <div className='authContainer'>
      <h2 className='head'>Register</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Password</label>
          <input
            type="text"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>City</label>
          <input
            type="text"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='formItem'>
          <label>Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      {/* {
        error && <h2>{error}</h2>
      } */}

    </div>)
}

export default RegistrationPage
