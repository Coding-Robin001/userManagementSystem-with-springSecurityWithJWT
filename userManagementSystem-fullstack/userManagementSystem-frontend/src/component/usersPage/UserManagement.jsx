import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../service/UserService'

const UserManagement = () => {
  const userss = [
    {
      id: 1,
      name: "adekunle ademola",
      email: "adekunle@gmail.com",
      role: "ADMIN"
    },
    {
      id: 2,
      name: "ola kolawole",
      email: "kolawole@gmail.com",
      role: "ADMIN"
    },
    {
      id: 3,
      name: "saint thomas",
      email: "thomas@gmail.com",
      role: "USER"
    },
    {
      id: 4,
      name: "troy clinton",
      email: "TroyclintonN@gmail.com",
      role: "USER"
    },
    {
      id: 5,
      name: "maisey clinton",
      email: "maieyclintonN@gmail.com",
      role: "USER"
    },
    {
      id: 6,
      name: "olabisi andrews",
      email: "olabisi10@gmail.com",
      role: "USER"
    },
    {
      id: 7,
      name: "ayomide adebanjo",
      email: "ayomide20@gmail.com",
      role: "USER"
    }
  ]


  const [users, setUsers] = useState(userss)



  // useEffect(() => {
  //   fetchUsers()
  // }, [])

  const fetchUsers = async () => {

    try {
      const token = localStorage.getItem("token")
      const response = await UserService.getAllUsers(token)
      setUsers(response.ourUsersList)

    } catch (error) {
      console.log("error fetching user", error);
    }
  }

  const deleteUser = async (userId) => {

    try {
      const confirmDeleteUser = window.confirm("are you sure yu want to delete user?")
      const token = localStorage.getItem("token")
      if (confirmDeleteUser) {
        await UserService.deleteUser(userId)
        fetchUsers()
      }

    } catch (error) {
      console.log("error deleting user", error);
    }
  }

  return (
    <div className='userManagementContainer'>
      <h2 className='head'>Manage Users</h2>
      <button className='addBtn'><Link to="/register">Add User</Link></button>

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
                    className='btnDelete'
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete User
                  </button>
                  <button
                    className='btnUpdate'>
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
