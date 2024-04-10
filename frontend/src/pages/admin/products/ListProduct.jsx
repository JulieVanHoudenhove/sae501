import React, {useEffect, useState} from "react";
import {deleteProduct, getProducts} from "../../../entities/productsProvider.js";
import {Link, useParams} from "react-router-dom";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        getProducts().then(response => {
            setProducts(response.data);
        })
    }

    const handleDeleteProduct = (id) => {
        deleteProduct(id).then(response => {
            if (response.data) {
                retrieveProducts();

                return response.data
            }
        });

        return null;
    }

    return (
        <div>
            <Link to={`/admin/categories/`}>Back</Link>
            <Link to={`/admin/categories/${id}/products/new`}>NEW</Link>
            <ul>
                {
                    products.length > 0 ? (
                        products.map((product) =>
                            <li key={product.id}>{product.id} - {product.name}
                                <Link to={`/admin/categories/${id}/products/${product.id}/edit`}>EDIT</Link>
                                <Link to={`/admin/categories/${id}/products/${product.id}/variants`}>VARIANTS</Link>
                                {/*<button onClick={handleDeleteProduct(product.id)}>DELETE</button>*/}
                            </li>)
                    ) : (
                        <div>No product found</div>
                    )
                }
            </ul>
        </div>
    );
}

export default ProductsPage;