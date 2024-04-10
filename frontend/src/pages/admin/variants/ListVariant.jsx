import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVariantsByProduct } from "../../../entities/variantsProvider.js";

function VariantsPage() {
  const [variants, setVariants] = useState([]);
  const navigate = useNavigate();
  let { id, productId } = useParams();

  useEffect(() => {
    getVariantsByProduct(productId).then((response) => {
      setVariants(response.data);
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
        <h2>Variants</h2>
        <Link to={`/admin/categories/${id}/products/${productId}/variants/new`}>
          New
        </Link>
      </div>
      <div className="admin-element-container">
        {variants.length > 0 ? (
          variants.map((variant) => (
            <div key={variant.id} className="admin-element">
              <p>{variant.name}</p>
              <div className="flex">
                <Link
                  to={`/admin/categories/${id}/products/${productId}/variants/${variant.id}/images`}
                  className="admin-secondary-button"
                >
                  Gallery
                </Link>
                <Link
                  to={`/admin/categories/${id}/products/${productId}/variants/${variant.id}/edit`}
                  className="admin-main-button"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No variant found</div>
        )}
      </div>
    </div>
  );
}

export default VariantsPage;
