import api from "./axios.js";

export const createVariantImage = (data) => {
    return api.post('variant-images/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getVariantImage = (id) => {
    return api.get(`variant-images/${id}`);
}

export const getVariantImages = async () => {
    return await api.get(`variant-images/`);
}

export const getVariantImagesByVariant = async (id) => {
    return await api.get(`variant-images/variant/${id}`);
}

export const updateVariantImage = (id, data) => {
    return api.patch(`variant-images/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteVariantImage = async (id) => {
    return await api.delete(`variant-images/${id}`);
}