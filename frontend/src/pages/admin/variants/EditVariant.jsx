import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getVariant, updateVariant} from "../../../entities/variantsProvider.js";


function EditProductPage() {
    let { id, productId, variantId } = useParams();
    const [variant, setVariant] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        materialFile: null,
        textureFile: null
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMaterialFileChange = (e) => {
        setFormData({ ...formData, materialFile: e.target.files[0] });
    };

    const handleTextureFileChange = (e) => {
        setFormData({ ...formData, textureFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        if (formData.materialFile) {
            formDataToSend.append('materialFile', formData.materialFile);
        }

        if (formData.textureFile) {
            formDataToSend.append('textureFile', formData.textureFile);
        }


        try {
            const response = await updateVariant(variantId, formDataToSend);
            if (response.data) {
                navigate(`/admin/categories/${id}/products/${productId}/variants`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getVariant(variantId).then(response => {
            setVariant(response.data);
        })
    }, []);

    useEffect(() => {
        if (variant) {
            setFormData({ ...formData, name: variant.name })
        }
    }, [variant]);

    return (
        <div>
            <h1>Edit Variant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Material File:</label>
                    <input
                        type="file"
                        name="materialFile"
                        onChange={handleMaterialFileChange}
                    />
                </div>
                <div>
                    <label>Texture File:</label>
                    <input
                        type="file"
                        name="textureFile"
                        onChange={handleTextureFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {variant && variant.material ? <div>{variant.material}</div> : <div>No file linked</div>}
            {variant && variant.textureImage ? <div>{variant.textureImage}</div> : <div>No file linked</div>}
        </div>
    );
}

export default EditProductPage;