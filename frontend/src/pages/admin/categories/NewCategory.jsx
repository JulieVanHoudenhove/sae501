import React, {useEffect, useState} from "react";
import {createCategory, getCategory, updateCategory} from "../../../entities/categoriesProvider.js";
import {useNavigate, useParams} from "react-router-dom";


function NewCategoryPage() {
    const [formData, setFormData] = useState({
        name: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createCategory(formData);
            if (response.data) {
                navigate('/admin/categories')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>New Category</h2>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewCategoryPage;