import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    getVariantImage,
    updateVariantImage
} from "../../../entities/variantImagesProvider.js";


function EditProductPage() {
    let { id, productId, variantId, variantImageId } = useParams();
    const [variantImage, setVariantImage] = useState(null);

    const [formData, setFormData] = useState({
        file: null,
    });
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }
        formDataToSend.append('variantId', variantId);

        try {
            const response = await updateVariantImage(variantImageId, formDataToSend);
            if (response.data) {
                navigate(`/admin/categories/${id}/products/${productId}/variant/${variantId}/images`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getVariantImage(variantImageId).then(response => {
            setVariantImage(response.data);
        })
    }, []);

    return (
        <div>
            <h1>Edit Variant Image</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>File:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {variantImage && variantImage.image ? <div>{variantImage.image}</div> : <div>No file linked</div>}
        </div>
    );
}

export default EditProductPage;