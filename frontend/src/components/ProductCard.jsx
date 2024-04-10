import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCardComponent({ product }) {
	const navigate = useNavigate();

	const goToProduct = (id) => {
		navigate("/product/" + id, { state: { product } });
	};

	useEffect(() => {
		if (!product) return;
	}, [product]);

	return (
		<article onClick={() => goToProduct(product.id)}>
			<div className="image-container">
				<img src={"http://mmi21h04.mmi-troyes.fr:3000" + product.image} alt={product.name} />

				<div className="overlay"></div>
				<button>Configurer</button>
			</div>

			<h3>{product.name}</h3>
			<p>{product.category.name}</p>
		</article>
	);
}

export default ProductCardComponent;
