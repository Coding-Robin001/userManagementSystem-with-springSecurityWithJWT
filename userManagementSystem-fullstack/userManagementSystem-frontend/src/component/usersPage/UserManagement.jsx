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
    <div>
      <h2>User Management Page</h2>
      <button><Link to="/register">Add User</Link></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete User
                  </button>
                  <button>
                    <Link
                      to={`/updateUser/${user.id}`}
                    >
                      Update User
                    </Link>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default UserManagement
