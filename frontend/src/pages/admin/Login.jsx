import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {updateVariant} from "../../entities/variantsProvider.js";
import {login} from "../../entities/usersProvider.js";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formData);
            if (response.data) {
                localStorage.setItem('access_token', response.data.accessToken)
                location.reload()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="admin-container-form">
                <h2>Login</h2>
                <div className="admin-container-input">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="admin-container-input">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="admin-main-button">Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;