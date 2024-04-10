import React, {useEffect, useState} from "react";
import {deleteCategory, getCategories} from "../../../entities/categoriesProvider.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data);
        })
    }, []);



    return (
        <div>
            <div className="admin-header">
            <h2>Categories</h2>
            <Link to={`/admin/categories/new`} >New</Link>
            </div>
            <div className="admin-element-container">
                {
                    categories.length > 0 ? (
                        categories.map((category) =>
                            <div key={category.id} className="admin-element">
                                <p>
                                    {category.name}
                                </p>
                                <div className="flex">
                                    <Link to={`/admin/categories/${category.id}/products`} className="admin-secondary-button">Products</Link>
                                    <Link to={`/admin/categories/${category.id}/edit`} className="admin-main-button">Edit</Link>
                                </div>
                                {/*<button onClick={deleteCategorycategorie.id)}>DELETE</button>*/}
                            </div>)
                    ) : (
                        <div>No category found</div>
                    )
                }
            </div>
        </div>
    );
}

export default CategoryPage;