import React, {useEffect, useState} from "react";
import {deleteVariant, getVariants, getVariantsByProduct} from "../../../entities/variantsProvider.js";
import {Link, useParams} from "react-router-dom";

function VariantsPage() {
    const [variants, setVariants] = useState([]);
    let { id, productId } = useParams();

    useEffect(() => {
        getVariantsByProduct(productId).then(response => {
            setVariants(response.data);
        })
    }, []);



    return (
        <div>
            <Link to={`/admin/categories/${id}/products/`}>Back</Link>
            <Link to={`/admin/categories/${id}/products/${productId}/variants/new`}>NEW</Link>
            <ul>
                {
                    variants.length > 0 ? (
                        variants.map((variant) =>
                            <li key={variant.id}>
                                {variant.id} - {variant.name}
                                <Link to={`/admin/categories/${id}/products/${productId}/variants/${variant.id}/edit`}>EDIT</Link>
                                <Link to={`/admin/categories/${id}/products/${productId}/variants/${variant.id}/images`}>GALLERY</Link>

                            </li>)
                    ) : (
                        <div>No variant found</div>
                    )
                }
            </ul>
        </div>
    );
}

export default VariantsPage;