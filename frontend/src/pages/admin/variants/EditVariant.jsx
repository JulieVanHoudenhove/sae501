import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVariant,
  updateVariant,
} from "../../../entities/variantsProvider.js";

function EditProductPage() {
  let { id, productId, variantId } = useParams();
  const [variant, setVariant] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    materialFile: null,
    textureFile: null,
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
    formDataToSend.append("name", formData.name);
    if (formData.materialFile) {
      formDataToSend.append("materialFile", formData.materialFile);
    }

    if (formData.textureFile) {
      formDataToSend.append("textureFile", formData.textureFile);
    }

    try {
      const response = await updateVariant(variantId, formDataToSend);
      if (response.data) {
        navigate(`/admin/categories/${id}/products/${productId}/variants`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getVariant(variantId).then((response) => {
      setVariant(response.data);
    });
  }, []);

  useEffect(() => {
    if (variant) {
      setFormData({ ...formData, name: variant.name });
    }
  }, [variant]);

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
        <h2>Edit Variant</h2>
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
        <div className="admin-container-input">
          <label>Material File:</label>
          <input
            type="file"
            name="materialFile"
            onChange={handleMaterialFileChange}
          />
          {variant && variant.material ? (
            <div className="sub-input">{variant.material}</div>
          ) : (
            <div>No file linked</div>
          )}
        </div>
        <div className="admin-container-input">
          <label>Texture File:</label>
          <input
            type="file"
            name="textureFile"
            onChange={handleTextureFileChange}
          />
          {variant && variant.textureImage ? (
            <div className="sub-input">{variant.textureImage}</div>
          ) : (
            <div>No file linked</div>
          )}
        </div>
        <button type="submit" className="admin-main-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
