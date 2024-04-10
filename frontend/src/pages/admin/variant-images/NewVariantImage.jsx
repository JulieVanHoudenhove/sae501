import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVariantImage } from "../../../entities/variantImagesProvider.js";

function EditProductPage() {
  let { id, productId, variantId, variantImageId } = useParams();

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
      formDataToSend.append("file", formData.file);
    }
    formDataToSend.append("variantId", variantId);

    try {
      const response = await createVariantImage(formDataToSend);
      if (response.data) {
        navigate(
          `/admin/categories/${id}/products/${productId}/variant/${variantId}/images`
        );
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
        <h2>New Variant Image</h2>
        <div className="admin-container-input">
          <label>File:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="admin-main-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
