import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVariantImagesByVariant } from "../../../entities/variantImagesProvider.js";

function VariantsPage() {
  const navigate = useNavigate();
  const [variantImages, setVariantImages] = useState([]);
  let { id, productId, variantId } = useParams();

  useEffect(() => {
    getVariantImagesByVariant(variantId).then((response) => {
      setVariantImages(response.data);
    });
  }, []);

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
      <div className="admin-header">
        <h2>Images</h2>
        <Link
          to={`/admin/categories/${id}/products/${productId}/variants/${variantId}/images/new`}
        >
          New
        </Link>
      </div>
      <div className="admin-element-container">
        {variantImages.length > 0 ? (
          variantImages.map((image) => (
            <div key={image.id} className="admin-element">
              <p>
                {image.image}
              </p>
              <Link
                to={`/admin/categories/${id}/products/${productId}/variants/${variantId}/images/${image.id}/edit`}
                className="admin-main-button"
              >
                EDIT
              </Link>
            </div>
          ))
        ) : (
          <div>No variant images found</div>
        )}
      </div>
    </div>
  );
}

export default VariantsPage;
