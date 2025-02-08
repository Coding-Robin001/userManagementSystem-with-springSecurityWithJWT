import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../service/UserService'

const UserManagement = () => {
  const userss = [
    {
      id: 1,
      name: "adewole ademola",
      email: "adewole@gmail.com"
    },
    {
      id: 2,
      name: "adewole kolawole",
      email: "kolawole@gmail.com"
    },
    {
      id: 3,
      name: "adewole thomas",
      email: "thomas@gmail.com"
    },
    {
      id: 4,
      name: "troy ademola",
      email: "adewoleTroy@gmail.com"
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
      <h2 className='head'>User Manager</h2>
      <button className='addBtn'><Link to="/register">Add User</Link></button>

      <div className='table'>
        <div className="tableHead">
          <span>ID</span>
          <span>NAME</span>
          <span>EMAIL</span>
          <span>ACTIONS</span>
        </div>
        <div className="tableBody">
          {
            users.map(user => (
              <div key={user.id} className='tableContent'>
                <span>{user.id}</span>
                <span>{user.name}</span>
                <span>{user.email}</span>
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
