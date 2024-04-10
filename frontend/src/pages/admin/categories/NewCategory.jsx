import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../entities/categoriesProvider.js";

function NewCategoryPage() {
  const [formData, setFormData] = useState({
    name: "",
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
        navigate("/admin/categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <a onClick={() => navigate(-1)} className="admin-back">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
        </svg>
        Back
      </a>
      <form onSubmit={handleSubmit} className="admin-container-form">
        <h2>New Category</h2>
        <div className="admin-container-input">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="admin-main-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewCategoryPage;
