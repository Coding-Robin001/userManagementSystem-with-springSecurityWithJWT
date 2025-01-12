import React from 'react'
import UserService from '../service/UserService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await UserService.login(email, password)

      if (userData.token) {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('role', userData.role)
        navigate("/profile")
      } else {
        setError(userData.error)
      }

    } catch (error) {
      console.log(error);
      setError(error)
      setTimeout(() => {
        setError("")
      }, 5000);

    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {
        error && <h2>{error}</h2>
      }

    </div>
  )
}

export default LoginPage
