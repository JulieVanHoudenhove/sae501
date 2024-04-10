import React, {useEffect, useState} from "react";
import {deleteCategory, getCategories} from "../../../entities/categoriesProvider.js";
import {Link} from "react-router-dom";

function CategoryPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data);
        })
    }, []);



    return (
        <div>
            <h2>Categories</h2>
            <Link to={`/admin/categories/new`}>NEW</Link>
            <ul>
                {
                    categories.length > 0 ? (
                        categories.map((category) =>
                            <li key={category.id}>
                                <div>
                                    {category.id} - {category.name}
                                </div>
                                <div>
                                    <Link to={`/admin/categories/${category.id}/edit`}>EDIT</Link>
                                    <Link to={`/admin/categories/${category.id}/products`}>PRODUCTS</Link>
                                </div>
                                {/*<button onClick={deleteCategorycategorie.id)}>DELETE</button>*/}
                            </li>)
                    ) : (
                        <div>No category found</div>
                    )
                }
            </ul>
        </div>
    );
}

export default CategoryPage;