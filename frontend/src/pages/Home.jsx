import React, { useState, useEffect } from "react";
import ProductCardComponent from "../components/ProductCard";
import { BlinkBlur } from "react-loading-indicators";

function HomePage() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getAllProducts = async () => {
		try {
			const response = await fetch(`http://mmi21h04.mmi-troyes.fr:3000/products`);

			if (!response.ok) {
				throw new Error(`HTTP error: Status ${response.status}`);
			}

			let data = await response.json();
			setData(data);
			setError(null);
		} catch (err) {
			setError(err.message);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<main id="home-page">
			<span className="breadcrumb">Collection</span>
			<h1>Tous nos modèles</h1>

			<section className="products-container">
				{loading && (
					<div className="loading">
						<BlinkBlur color="#1B1D1F" size="medium" text="" textColor="" />
					</div>
				)}

				{error && (
					<div className="error">
						<p>Une erreur est survenue lors du chargement des produits. Veuillez contacter le support.</p>
						<p>{error}</p>
					</div>
				)}

				{data && data.map((product) => <ProductCardComponent key={product.id} product={product} />)}
			</section>
		</main>
	);
}

export default HomePage;
