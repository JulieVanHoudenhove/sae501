import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
} from "../../../entities/productsProvider.js";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    getProducts().then((response) => {
      setProducts(response.data);
    });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then((response) => {
      if (response.data) {
        retrieveProducts();

        return response.data;
      }
    });

    return null;
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
      <div className="admin-header">
        <h2>Products</h2>
        <Link to={`/admin/categories/${id}/products/new`}>NEW</Link>
      </div>
      <div className="admin-element-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="admin-element">
              <p>{product.name}</p>
              <div className="flex">
                <Link
                  to={`/admin/categories/${id}/products/${product.id}/variants`}
                  className="admin-secondary-button"
                >
                  Variants
                </Link>
                <Link
                  to={`/admin/categories/${id}/products/${product.id}/edit`}
                  className="admin-main-button"
                >
                  Edit
                </Link>
              </div>
              {/*<button onClick={handleDeleteProduct(product.id)}>DELETE</button>*/}
            </div>
          ))
        ) : (
          <div>No product found</div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
