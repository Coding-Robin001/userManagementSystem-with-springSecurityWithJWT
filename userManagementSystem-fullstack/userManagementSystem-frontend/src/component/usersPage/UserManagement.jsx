import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers, deleteUser } from '../service/UserService'

const UserManagement = () => {
  // const userss = [
  //   {
  //     id: 1,
  //     name: "adekunle ademola",
  //     email: "adekunle@gmail.com",
  //     role: "ADMIN"
  //   },
  //   {
  //     id: 2,
  //     name: "ola kolawole",
  //     email: "kolawole@gmail.com",
  //     role: "ADMIN"
  //   },
  //   {
  //     id: 3,
  //     name: "saint thomas",
  //     email: "thomas@gmail.com",
  //     role: "USER"
  //   },
  //   {
  //     id: 4,
  //     name: "troy clinton",
  //     email: "TroyclintonN@gmail.com",
  //     role: "USER"
  //   },
  //   {
  //     id: 5,
  //     name: "maisey clinton",
  //     email: "maieyclintonN@gmail.com",
  //     role: "USER"
  //   },
  //   {
  //     id: 6,
  //     name: "olabisi andrews",
  //     email: "olabisi10@gmail.com",
  //     role: "USER"
  //   },
  //   {
  //     id: 7,
  //     name: "ayomide adebanjo",
  //     email: "ayomide20@gmail.com",
  //     role: "USER"
  //   }
  // ]

  const [users, setUsers] = useState([])
  const [deleteError, setDeleteError] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [fetchingInProgress, setFetchingInProgress] = useState(false)
  const [deleteInProgress, setDeleteInProgress] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])


  const fetchUsers = async () => {
    setFetchingInProgress(true)

    try {
      const token = localStorage.getItem("token")
      const response = await getAllUsers(token)
      setUsers(response.ourUsersList)
      setFetchError(null)
    } catch (error) {
      setFetchError(error.message)
    }

    setFetchingInProgress(false)
  }

  const handleDeleteUser = async (userId) => {

    setDeleteInProgress(true)

    try {
      const confirmDeleteUser = window.confirm("are you sure you want to delete user?")
      const token = localStorage.getItem("token")
      if (confirmDeleteUser) {
        await deleteUser(userId, token)
        fetchUsers()
      }
      setDeleteError(null)

    } catch (error) {
      setDeleteError(error.message)
    }

    setDeleteInProgress(false)
  }

  return (
    <div className='userManagementContainer'>
      <h2 className='head'>Manage Users</h2>
      <button className='addBtn'><Link to="/register">Add User</Link></button>
      {
        fetchingInProgress &&
        <p className='fetchMsg'>fetching user, please wait...</p>
      }
      {
        fetchError &&
        <p className='fetchMsg error'>Unable to fetch list of users, {fetchError}!</p>
      }
      {
        deleteError && <h2 className='fetchMsg errorDelete'>unable to delete user, {deleteError}, check internet connection!</h2>
      }
      <div className='table'>
        <div className="tableHead">
          <span>ID</span>
          <span>NAME</span>
          <span>EMAIL</span>
          <span>ROLE</span>
          <span>ACTIONS</span>
        </div>
        <div className="tableBody">
          {
            users.map(user => (
              <div key={user.id} className='tableContent'>
                <span>{user.id}</span>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <div className="btnBox">
                  <button
                    disabled={fetchError != null || deleteInProgress}
                    className={fetchError != null ? "disable" : "btnDelete"}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete User
                  </button>
                  <button
                    disabled={fetchError != null}
                    className={fetchError != null ? "disable" : "btnUpdate"}
                  >
                    <Link
                      to={`/updateUser/${user.id}`}
                    >
                      Update User
                    </Link>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default UserManagement
