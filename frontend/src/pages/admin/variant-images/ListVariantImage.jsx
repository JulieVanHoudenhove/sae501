import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getVariantImagesByVariant} from "../../../entities/variantImagesProvider.js";

function VariantsPage() {
    const [variantImages, setVariantImages] = useState([]);
    let { id, productId, variantId } = useParams();

    useEffect(() => {
        getVariantImagesByVariant(variantId).then(response => {
            setVariantImages(response.data);
        })
    }, []);



    return (
        <div>
            <Link to={`/admin/categories/${id}/products/${productId}/variants`}>Back</Link>
            <Link to={`/admin/categories/${id}/products/${productId}/variants/${variantId}/images/new`}>NEW</Link>
            <ul>
                {
                    variantImages.length > 0 ? (
                        variantImages.map((image) =>
                            <li key={image.id}>
                                {image.id} - {image.file}
                                <Link to={`/admin/categories/${id}/products/${productId}/variants/${variantId}/images/${image.id}/edit`}>EDIT</Link>

                            </li>)
                    ) : (
                        <div>No variant images found</div>
                    )
                }
            </ul>
        </div>
    );
}

export default VariantsPage;