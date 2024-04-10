import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
});

api.interceptors.response.use((response) => {return response},
    (error) => {
        if (error?.response?.data?.statusCode === 401) {
            localStorage.removeItem('access_token');
            location.href = '/admin/login';
        }

        return error;
    })

export default api;