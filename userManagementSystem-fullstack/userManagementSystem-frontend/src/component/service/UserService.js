import axios from "axios";

const BASE_URL = "http://localhost:8080";

const loginService = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const registerService = async (userData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { userData },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getProfileInfo = async (token) => {
    try {

        const response = await axios.get(`${BASE_URL}/adminuser/getProfile`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};

const updateUser = async (userId, userData, token) => {
    try {

        const response = await axios.put(`${BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};

const getUserById = async (userId, token) => {
    try {

        const response = await axios.get(`${this.BASE_URL}/admin/getUser/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};



export { loginService, registerService, getProfileInfo, updateUser, getUserById };


class UserService {

    static BASE_URL = "http://localhost:8080"

    static async getAllUsers(token) {
        try {

            const response = await axios.get(`${this.BASE_URL}/admin/getAllUsers`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            return response.data;

        } catch (error) {
            throw error
        }
    }


    static async deleteUser(userId, token) {
        try {

            const response = await axios.delete(`${this.BASE_URL}/admin/deleteUser/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            return response.data;

        } catch (error) {
            throw error
        }
    }


    // AUTHENTICATION CHECKER
    static logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token")
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem("role")
        return role == "ADMIN"
    }

    static isUser() {
        const role = localStorage.getItem("role")
        return role == "USER"
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin()
    }

    // ask chatgpt if a person cannot just go into local storage and change role. if its secure.
}

export default UserService
// export {login}