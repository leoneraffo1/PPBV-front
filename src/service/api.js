import axios from 'axios';
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
    baseURL: `${BASE_URL}/api/`,
    transformRequest: [(data, headers) => {
        headers['Authorization'] = `Bearer ${localStorage.getItem("token_ppv")}`
        return data
    }, ...axios.defaults.transformRequest],
})

api.interceptors.response.use(response => response, error => {
    if (error.response) {
        const response = error.response.data

        // if (code === 401) {
        //     setTimeout(async () => {
        //         await window.location.assign('#/Login')
        //     }, 2000)
        // }

        return Promise.reject(response)
    }
})

export default api;