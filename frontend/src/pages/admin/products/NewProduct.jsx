import React, {useState} from "react";
import {createProduct} from "../../../entities/productsProvider.js";
import {useNavigate} from "react-router-dom";


function NewProductPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        file: null
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('file', formData.file);
        formDataToSend.append('categoryId', '1');

        try {
            const response = await createProduct(formDataToSend);
            if (response.data) {
                navigate('/admin/products')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>New Product</h1>
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
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>File:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewProductPage;