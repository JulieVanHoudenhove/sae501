import api from "./axios.js";

export const login = async (data) => {
    return await api.post('auth/login', data)
}


export const createUser = (data) => {
    return api.post('users/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getUser = (id) => {
    return api.get(`users/${id}`);
}

export const getUsers = async () => {
    return await api.get(`users/`);
}

export const getUsersByProduct = async (id) => {
    return await api.get(`users/product/${id}`);
}

export const updateUser = (id, data) => {
    return api.patch(`users/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteUser = async (id) => {
    return await api.delete(`users/${id}`);
}