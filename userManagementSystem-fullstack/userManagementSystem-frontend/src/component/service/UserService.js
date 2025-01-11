import axios from "axios";

class UserService{
    // ask chatgpt a way to create this methods/functions in ajaacsript/non-class way
    static BASE_URL = "http://localhost:1010"

    static async login(email, password){
        try {

            const response = await axios.post(`${this.BASE_URL}/auth/login`, {email, password})
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    // only an admin can register a user
    static async register(userData, token){
        try {

            const response = await axios.post(`${this.BASE_URL}/auth/register`, {userData},
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    static async getAllUsers(token){
        try {

            const response = await axios.get(`${this.BASE_URL}/admin/getAllUsers`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    static async getProfileInfo(token){
        try {

            const response = await axios.get(`${this.BASE_URL}/adminuser/getProfile`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    static async getUserById(userId, token){
        try {

            const response = await axios.get(`${this.BASE_URL}/admin/getUser/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    static async updateUser(userId, userData, token){
        try {

            const response = await axios.get(`${this.BASE_URL}/admin/getUser/${userId}`, {userData},
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }

    static async deleteUser(userId, token){
        try {

            const response = await axios.delete(`${this.BASE_URL}/admin/deleteUser/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        } catch (error) {
            throw error
        }
    }


    // AUTHENTICATION CHECKER
    static logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    static isAuthenticated(){
        const token = localStorage.getItem("token")
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem("role")
        return role == "ADMIN"
    }

    static isUser(){
        const role = localStorage.getItem("role")
        return role == "USER"
    }

    static isAdminOnly(){
        return this.isAuthenticated() && this.isAdmin()
    }

    // ask chatgpt if a person cannot just go into local storage and change role. if its secure.
}

export default UserService