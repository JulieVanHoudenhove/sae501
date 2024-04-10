import api from "./axios.js";

export const createProduct = (data) => {
    return api.post('products/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getProduct = (id) => {
    return api.get(`products/${id}`);
}

export const getProducts = async () => {
    return await api.get(`products/`);
}

export const updateProduct = (id, data) => {
    return api.patch(`products/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteProduct = async (id) => {
    return await api.delete(`products/${id}`);
}