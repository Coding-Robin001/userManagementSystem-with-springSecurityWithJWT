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

        const response = await axios.get(`${BASE_URL}/admin/getUser/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};

const getAllUsers = async (token) => {
    try {

        const response = await axios.get(`${BASE_URL}/admin/getAllUsers`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};

const deleteUser = async (userId, token) => {
    try {

        const response = await axios.delete(`${BASE_URL}/admin/deleteUser/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data;

    } catch (error) {
        throw error
    }
};


const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
}

const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    return !!token
}

const isAdmin = () => {
    const role = localStorage.getItem("role")
    return role === "ADMIN"
}

const isUser = () => {
    const role = localStorage.getItem("role")
    return role === "USER"
}

const adminOnly = () => {
    return isAuthenticated() && isAdmin()
}

export {
    loginService, registerService, getProfileInfo, updateUser, getUserById,
    getAllUsers, deleteUser, logout, isAuthenticated, isAdmin, isUser, adminOnly
};

