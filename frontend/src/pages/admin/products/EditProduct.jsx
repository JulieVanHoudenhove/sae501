import React, {useEffect, useState} from "react";
import {createProduct, getProduct, updateProduct} from "../../../entities/productsProvider.js";
import {useNavigate, useParams} from "react-router-dom";


function EditProductPage() {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);

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
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }

        try {
            const response = await updateProduct(productId, formDataToSend);
            if (response.data) {
                navigate('/admin/products')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getProduct(productId).then(response => {
            setProduct(response.data);
        })
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({ ...formData, name: product.name, description: product.description })
        }
    }, [product]);

    return (
        <div>
            <h1>Edit Product</h1>
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
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {product && product.image ? <span>{product.image}</span> : 'test'}
        </div>
    );
}

export default EditProductPage;