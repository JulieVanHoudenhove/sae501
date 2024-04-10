import React, {useState} from "react";
import {createVariant} from "../../../entities/variantsProvider.js";
import {useNavigate, useParams} from "react-router-dom";


function NewVariantPage() {
    let { id, productId } = useParams();
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
        formDataToSend.append('productId', productId);

        if (formData.materialFile) {
            formDataToSend.append('materialFile', formData.materialFile);
        }

        if (formData.textureFile) {
            formDataToSend.append('textureFile', formData.textureFile);
        }


        try {
            const response = await createVariant(formDataToSend);
            if (response.data) {
                navigate(`/admin/categories/${id}/products/${productId}/variants`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>New Variant</h1>
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
        </div>
    );
}

export default NewVariantPage;