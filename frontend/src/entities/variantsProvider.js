import api from "./axios.js";

export const createVariant = (data) => {
    return api.post('variants/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getVariant = (id) => {
    return api.get(`variants/${id}`);
}

export const getVariants = async () => {
    return await api.get(`variants/`);
}

export const getVariantsByProduct = async (id) => {
    return await api.get(`variants/product/${id}`);
}

export const updateVariant = (id, data) => {
    return api.patch(`variants/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteVariant = async (id) => {
    return await api.delete(`variants/${id}`);
}