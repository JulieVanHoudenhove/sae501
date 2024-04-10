import api from "./axios.js";

export const createCategory = (data) => {
    return api.post('categories/', data)
}

export const getCategory = (id) => {
    return api.get(`categories/${id}`);
}

export const getCategories = async () => {
    return await api.get(`categories/`);
}

export const updateCategory = (id, data) => {
    return api.patch(`categories/${id}`, data)
}

export const deleteCategory = async (id) => {
    return await api.delete(`categories/${id}`);
}