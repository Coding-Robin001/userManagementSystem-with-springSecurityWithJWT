import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./Auth.css"
import { loginService } from '../service/UserService'


const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submissionInProgress, setSubmissionInProgress] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionInProgress(true)

    try {
      const userData = await loginService(email, password)

      if (userData.token) {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('role', userData.role)
        alert(userData.token)
        navigate("/profile")
      } else {
        setError(userData.error + "error")
      }

    } catch (error) {
      console.log(error.message);
      setError(error.message)
      setTimeout(() => {
        setError("")
      }, 10000);
    }
    setSubmissionInProgress(false)
  }

  return (
    <div className='authContainer'>
      <h2 className='head'>Login</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='formItem'>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={submissionInProgress ? "disabled" : null}
          type='submit'
          disabled={submissionInProgress}
        >
          {submissionInProgress ? "LOGGING YOU IN. . ." : "LOGIN"}
        </button>
      </form>
      {
        error && <h2 className='errorText'>{error}, Check Internet Connection!!!</h2>
      }

    </div>
  )
}

export default LoginPage
