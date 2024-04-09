import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCardComponent({ product }) {
	const navigate = useNavigate();

	const goToProduct = (id) => {
		navigate("/product/" + id, { state: { product } });
	};

	useEffect(() => {
		if (!product) return;
		console.log(product);
	}, [product]);

	return (
		<article onClick={() => goToProduct(product.id)}>
			<div className="image-container">
				<img src={product.img} alt={product.name} />

				<div className="overlay"></div>
				<button>Configurer</button>
			</div>

			<h3>Anne</h3>
			<p>Acétate</p>
		</article>
	);
}

export default ProductCardComponent;
